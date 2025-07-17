// app/login/page.tsx (或者你原来的pages/index.tsx，如果是pages路由)
'use client'; // 👈 标记为客户端组件

import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // 导入useMutation和useQueryClient
import axiosInstance from '@/utils/axiosInstance'; // 导入Axios实例
import { useRouter } from 'next/navigation'; // Next.js 13+ App Router 的 useRouter

// 定义登陆响应接口 (对于Cookie认证，通常不需要前端处理token字段)
interface LoginResponse {
  message?: string; // 比如 "Login successful"
  // user: { id: number; username: string; email: string; }; // 后端可能返回用户信息
}

// 定义登陆错误接口
interface LoginErrorData {
  message?: string;
}

export default function LoginPage() { // 最好把组件名改成LoginPage
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // 用来显示错误信息

  const router = useRouter(); // 获取router实例
  const queryClient = useQueryClient(); // 获取queryClient实例

  // 定义登录mutation
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      // 使用Axios实例发送POST请求
      const response = await axiosInstance.post<LoginResponse>('/auth/login', { username, password });
      return response.data; // 返回响应数据
    },
    onSuccess: (data) => {
      console.log('登录成功', data);
      setErrorMessage(''); // 清除之前的错误信息

      // 假设登录成功后后端会设置HttpOnly Cookie
      // 你不需要手动存储token或user到localStorage

      // 可以选择性地失效或重新获取与用户状态相关的Query
      // 例如，如果你有一个查询是获取当前用户信息（'/api/me'），现在可以使其失效或重新获取
      queryClient.invalidateQueries({ queryKey: ['currentUser'] }); // 假设你有一个key叫'currentUser'

      // 重定向到仪表盘页面
      router.push('/dashboard');
    },
    onError: (error: any) => { // 错误类型通常是AxiosError
      console.error('登录失败', error);
      let message = '登录失败，请重试';
      if (axios.isAxiosError(error) && error.response) {
        const errorData: LoginErrorData = error.response.data;
        message = errorData.message || message;
      } else if (error instanceof Error) {
        message = error.message; // 捕获其他类型的错误
      }
      setErrorMessage(message); // 设置错误信息
    },
  });

  const handleLoginSubmit = () => {
    // 触发mutation
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        <div className="text-center text-2xl font-semibold text-gray-800 mb-6">
          登陆
        </div>
        <div className="mb-4">
          <Input
            isRequired
            value={username}
            onValueChange={setUsername}
            label="用户名"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>
        <div className="mb-6">
          <Input
            isRequired
            value={password}
            onValueChange={setPassword}
            label="密码"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            isLoading={loginMutation.isPending} // 使用TanStack Query的isPending状态
            onPress={handleLoginSubmit} // 调用触发mutation的函数
            color="primary"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            登录
          </Button>
          <a href="/auth/register" className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800">
            忘记密码?
          </a>
        </div>
         {errorMessage && ( // 如果有错误信息则显示
          <div className="text-red-500 text-sm mt-2">
            {errorMessage}
          </div>
         )}
        <hr className="my-6 border-t" />
        <div className="text-center">
          <a href="/auth/register" className="inline-block align-baseline font-semibold text-sm text-gray-600 hover:text-gray-800">
            注册新账号
          </a>
        </div>
      </div>
    </div>
  );
}