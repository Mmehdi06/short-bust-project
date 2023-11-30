import {useEffect, useState} from 'react';
import axios from 'axios';
import ArticleCard from '@/components/ArticleCard.tsx';
import {Button} from '@/components/ui/button.tsx';

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
}

function Home() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        // Check if articles exist in sessionStorage when the component mounts
        const storedArticles = JSON.parse(sessionStorage.getItem('articles') || '[]') as Article[];

        if (storedArticles.length > 0) {
            setArticles(storedArticles);
        } else {
            fetchArticles(); // Fetch articles if they don't exist in sessionStorage
        }
    }, []); // Empty dependency array to run this effect only once when the component mounts

    const fetchArticles = () => {
        axios.get('http://localhost:8080/api/article')
            .then(response => {
                const newArticles: Article[] = response.data;
                setArticles(newArticles);
                sessionStorage.setItem('articles', JSON.stringify(newArticles));
            })
            .catch(error => {
                console.error('Error fetching Articles:', error);
            });
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Article Generator </h1>
            <h2 className="text-center">Click the button below to generate articles</h2>
            <Button className={`${articles}? : hidden`} onClick={fetchArticles}>Generate</Button>
            <Button variant={"outline"} className={`${articles}?hidden : `} onClick={fetchArticles}>ReGenerate</Button>

            <div className="grid grid-cols-3 gap-4">
                {articles.length > 0 ? (
                    articles.map((article: Article, index: number) => (
                        <div key={index}>
                            <ArticleCard article={article}/>
                        </div>
                    ))
                ) : (
                    <div>No articles found</div>
                )}
            </div>
        </div>
    );
}

export default Home;
