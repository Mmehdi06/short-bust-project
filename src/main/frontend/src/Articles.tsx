import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Notes from "@/components/ui/Notes.tsx";
import {TNote} from "@/types/Tnode.ts";

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
}

function Articles() {
    const {id} = useParams();
    const [articleBody, setArticleBody] = useState<string | null>(null); // Change initial state to null

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/article`);
                const articlesArray: Article[] = response.data;
                console.log("articleArray: ", articlesArray);

                const idAsNumber = Number(id);
                if (!isNaN(idAsNumber) && articlesArray.length > idAsNumber) {
                    const param: Article = articlesArray[idAsNumber];
                    console.log("paramURL: ", param.url);
                    const articleResponse = await axios.get(`http://localhost:8080/api/article/body`, {
                        headers: {
                            "Article-url": param.url,
                        },
                    });

                    setArticleBody(articleResponse.data);
                    console.log("ArticleBodyyy: ", articleResponse.data);
                } else {
                    console.error("Invalid article ID or articles array is empty.");
                }
            } catch (error) {
                console.error('Error fetching Articles:', error);
            }
        };

        fetchArticle();
    }, [id]);

    const note: TNote = {
        id: "0",
        defaultContent: articleBody || "Loading...", // Use loading text if articleBody is null
    };

    return (
        <div className={"container px-32"}>
            {articleBody !== null ? ( // Conditional rendering to display Notes when articleBody is not null
                <Notes note={note}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Articles;
