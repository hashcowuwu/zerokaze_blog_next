"use client"
import type { NextPage } from 'next';

//用于预览页面无实际用途
// 导入你想要预览的组件
// import NavMenu from '../components/NavMenu';
// import Navbar from '../components/Navbar';
import { ArticleList } from "@/components/ArticleList";

import TopNavbar from '@/components/Narbar';
const PreviewPage: NextPage = () => {
  return (
    // min-h-screen: 最小高度占满全屏
    // bg-slate-100: 一个浅灰色背景，让白色组件更突出
    // p-8: 在四周加上 2rem (32px) 的内边距
    <main className="min-h-screen bg-slate-100 p-8">
      
      {/* 使用 space-y-4 可以自动为直接子元素之间添加垂直间距 */}
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-slate-800">组件预览区</h1>
        <p className="text-slate-500">在这里隔离测试你的 TSX 组件。</p>
      </div>

      {/* my-8: 上下外边距 2rem (32px) */}
      <hr className="my-8" />

      {/* 预览 NavMenu 组件 */}
      <section className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-slate-700">预览:  组件</h2>
        <div className="rounded-md border border-slate-200 p-4">
          {/* <TopNavbar /> */}
          <ArticleList />
        </div>
      </section>

      {/* 你也可以在这里预览完整的 Navbar 
        <section className="mt-8 space-y-4 rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-slate-700">预览: `Navbar` 组件</h2>
          <div className="rounded-md border border-slate-200">
            <Navbar />
          </div>
        </section>
      */}

    </main>
  );
};

export default PreviewPage;