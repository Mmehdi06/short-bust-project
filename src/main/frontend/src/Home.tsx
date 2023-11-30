import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import axios from 'axios';
import ArticleCard from "@/components/ArticleCard.tsx";
import {useCookies} from "react-cookie";

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
}

function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [cookies, setCookie] = useCookies(["articles"]);

    const callArticle = () => {
        if (cookies.articles) {
            console.log("Cookie", cookies.articles);
            console.log("Parsed Cookie", JSON.parse(cookies.articles));
            setArticles(JSON.parse(cookies.articles) as Article[]);
        } else {
            axios.get('http://localhost:8080/api/article')
                .then(response => {
                    const newArticles = response.data;
                    setArticles(newArticles);
                    setCookie("articles", JSON.stringify(newArticles));
                })
                .catch(error => {
                    console.error('Error fetching Articles:', error);
                });
        }
    }

    return (
        <div className={"space-y-8"}>
            <h1 className={"text-4xl font-bold text-center"}>Article Generator (with AI...again)</h1>
            <Button onClick={callArticle}>Generate</Button>
            <div className={"grid grid-cols-3 gap-4"}>
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
