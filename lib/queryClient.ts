// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance'; // 导入你的Axios实例

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 默认的查询函数，通常用于GET请求
      queryFn: async ({ queryKey }) => {
        const { data } = await axiosInstance.get(queryKey[0] as string);
        return data;
      },
      staleTime: 5 * 60 * 1000, // 数据在此时间内被认为是“新鲜的”
      gcTime: 10 * 60 * 1000, // 缓存数据在不活跃多久后被垃圾回收
      refetchOnWindowFocus: true, // 窗口重新聚焦时重新获取数据
    },
    mutations: {
      // 可以在这里设置mutation的默认行为，比如统一的错误处理
      onError: (error) => {
        // console.error('Mutation发生错误:', error);
        // 通常在组件内部处理具体mutation的错误
      },
    },
  },
});