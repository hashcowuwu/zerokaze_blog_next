"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Navbar } from "../components/navbar";
import { ArticleList } from "@/components/ArticleList";
interface DashboardData {
  message: string;
  userId: number;
  userName: string;
};

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

export default function Home() {
  return (
   <ArticleList/ > 
  );
}