'use client';
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());


interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { data, error } = useSWR(`http://localhost:4000/blog/articles/${params.slug}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  )
}