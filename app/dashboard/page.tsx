"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";

// 定义仪表盘数据接口
interface DashboardData {
  message: string;
  userId: number;
  userName: string;
}

// 定义文章数据接口，匹配你提供的 API 响应结构
interface Article {
  id: number;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  published_at: string | null;
}

const dashboardFetcher = (url:string) => fetch("http://localhost:4000/dashboard", {
          credentials: 'include'
        }).then((res) => res.json());
      

function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]); // 新增：文章列表状态

  // Corrected: Destructure 'data' and rename it to 'dashboardData'
  const { data: dashboardData, error, isLoading } = useSWR<DashboardData>(
    "http://localhost:4000/dashboard",
    dashboardFetcher,

  );
   
  console.log(dashboardData); // This will now correctly log your data once fetched
  console.log("获取仪表盘数据成功");


  if (isLoading) return <div className="text-center text-xl">Loading dashboard...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Failed to load dashboard: {error.message}</div>;
  if (!dashboardData) return null; // Data not yet loaded, return null to prevent rendering with undefined data
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* 仪表盘部分 */}
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md mb-8">
        <div className="text-center text-2xl font-bold text-gray-800 mb-6">
          Dashboard
        </div>
          <div className="space-y-3 text-gray-700">
            <p className="text-lg">Welcome back, <span className="font-semibold">{dashboardData.userName}</span>!</p>
            <p><strong>User ID:</strong> {dashboardData.userId}</p>
            <p><strong>Server Message:</strong> {dashboardData.message}</p>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;