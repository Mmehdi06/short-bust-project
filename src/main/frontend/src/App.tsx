import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import axios from 'axios';
import ArticleCard from "@/components/ArticleCard.tsx";

interface Article {
    title: string;
    description: string;
    url: string;
}

function App() {
    const [articles, setArticles] = useState<Article[]>([]);

    const callArticle = () => {
        axios.get('http://localhost:8080/api/article')
            .then(response => {
                setArticles(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching Articles:', error);
            });
    }

    return (
        <div className={"space-y-8"}>
            <h1 className={"text-4xl font-bold text-center"}>Article Generator (with AI...again)</h1>
            <Button onClick={callArticle}>Generate</Button>
            <div className={"grid grid-cols-3 gap-4"}>
                {articles.map((article: Article, index: number) => (
                    <div key={index}>
                        <ArticleCard article={article}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
