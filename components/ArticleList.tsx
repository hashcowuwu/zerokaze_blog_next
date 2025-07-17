// components/ArticleList.tsx (假设你将组件放在这里)
"use client"; // 确保这是客户端组件

import React from "react";
import useSWR from "swr";
// 假设 HeroUI 的 Card 相关组件从这里导入
import { Card, CardHeader, CardBody } from "@heroui/card";
// 如果需要按钮，例如“阅读更多”，也一并导入
import { Button } from "@heroui/button"; 
import Link from "next/link"; // Next.js 的 Link 组件用于导航

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string; // 将 Date 类型改为 string，因为 JSON 响应通常是字符串
}

// Fetcher 函数保持不变，因为你已经用它成功获取数据
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ArticleList = () => {
  const { data: articleList, error, isLoading } = useSWR<Article[]>(
    "http://localhost:4000/blog/articles",
    fetcher
  );

  // 更好的加载和错误状态处理
  if (isLoading) {
    return (
      <div className="w-2/3 mx-auto text-center text-xl py-8">
        加载文章中... 🚀
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-2/3 mx-auto text-center text-xl text-red-500 py-8">
        未能加载文章。请稍后再试。😢
      </div>
    );
  }
  if (!articleList || articleList.length === 0) {
    return (
      <div className="w-2/3 mx-auto text-center text-xl text-gray-600 py-8">
        目前还没有文章。😔
      </div>
    );
  }

  // 打印文章标题以供调试，在生产环境中可以移除
  for (const article of articleList) {
    console.log(article.title);
  }

  return (
    <div className="w-2/3 min-h-screen mx-auto py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">最新文章</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {articleList.map((article) => (
          <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col ">
            <CardHeader className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                {article.title}
              </h2>
            </CardHeader>
            <CardBody className="p-4 flex-grow">
              {/* 显示部分内容，并添加省略号 */}
              <p className="text-gray-700 mb-4 line-clamp-3">
                {article.content}
              </p>
              {/* 你可以根据需要格式化日期 */}
              <p className="text-sm text-gray-500">
                发布于: {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </CardBody>
            {/* 使用 CardFooter 如果你希望底部有固定区域，例如按钮 */}
            {/* 假设 HeroUI 的 Card 组件没有直接的 CardFooter，你可以直接放在 Card 内部 */}
            <div className="p-4 border-t border-gray-200 flex justify-end mt-auto"> {/* mt-auto 确保按钮在底部 */}
              <Link href={`/blog/${article.id}`} passHref>
                <Button color="primary" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  阅读更多
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};