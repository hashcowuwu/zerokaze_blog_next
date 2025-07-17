"use client"
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useApi } from "@/app/utils/useApi";
import {  useState } from "react";




interface UserResponse {
 id: number,
 username: string,
 email: string,
 created_at:Date ,
 updated_at: Date,
}


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { data, loading, error, execute } = useApi<UserResponse>();
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认的刷新页面行为
    console.log('提交表单');
    // 调用 Hook 返回的 execute 函数来发送请求
    execute('http://localhost:4000/auth/register', { // 第一个参数是 URL
      method: 'POST',     // 第二个参数是 fetch 的配置
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email ,password}),
    });
  };

  // 如果 data 有值了，说明登录成功
  if (data) {
    // 在这里可以处理登录成功的逻辑，比如跳转到首页
    // console.log('登录成功，Token:', data.token);
    return <div>登录成功！正在跳转...</div>;
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        <div className="text-center text-2xl font-semibold text-gray-800 mb-6">
          注册
        </div>
        <div className="mb-4">
          <Input onChange={(e) => setUsername(e.target.value) } isRequired label="用户名" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <Input  onChange={(e) => setEmail(e.target.value)} isRequired label="邮箱" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <Input  onChange={(e) => setPassword(e.target.value)} isRequired label="密码" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <Input isRequired label="确认密码" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={handleSubmit} color="primary" type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            注册
          </Button>
        </div>
        <hr className="my-6 border-t" />
        <div className="text-center">
          <a href="/auth/login" className="inline-block align-baseline font-semibold text-sm text-gray-600 hover:text-gray-800">
            已有账号？去登录
          </a>
        </div>
      </div>
    </div>
  );
}