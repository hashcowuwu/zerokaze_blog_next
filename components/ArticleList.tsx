import useSWR from "swr";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ArticleList = () => { 
    const { data:articleList, error } = useSWR<Article[]>("http://localhost:4000/blog/articles", fetcher);
    if (error) return <div>Failed to load articles.</div>;
    if (!articleList) return <div>Loading articles...</div>; // Data is undefined initially
    for (const article of articleList) {
        console.log(article.title);
    }
    return (
            <div className="w-2/3 min-h- mx-auto">
            {articleList.map((article) => (
                // It's good practice to use a unique key when mapping lists in React
                <div key={article.id}> 
                    <p>{article.title}</p>
                    {/* Render other article details as needed */}
                </div>
            ))}
        </div>
    )
};

