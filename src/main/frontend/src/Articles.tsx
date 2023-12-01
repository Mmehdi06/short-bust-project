import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Notes from "@/components/ui/Notes.tsx";
import {BeatLoader} from "react-spinners";

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
}

function Articles() {
    const {id} = useParams();
    const [articleAI, setArticleAI] = useState<string | null>(null);
    const [articleBody, setArticleBody] = useState<string | null>(null);

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
                    const articleResponse = await axios.get(
                        `http://localhost:8080/api/article/body`,
                        {
                            headers: {
                                "Article-url": param.url,
                            },
                        }
                    );

                    setArticleBody(articleResponse.data);
                    console.log("ArticleBodyyy: ", articleResponse.data);
                } else {
                    console.error("Invalid article ID or articles array is empty.");
                }
            } catch (error) {
                console.error("Error fetching Articles Body:", error);
            }
        };

        fetchArticle();
    }, [id]);

    useEffect(() => {
        const fetchArticleAI = async () => {
            try {
                const result = await axios.post(
                    `http://localhost:8080/api/article/modify`,
                    {articleBody}
                );
                setArticleAI(result.data);
                console.log("ArticleAI: ", result.data);
            } catch (error) {
                console.error("Error fetching Articles with AI:", error);
            }
        };

        fetchArticleAI();
    }, [articleBody]);

    return (
        <div className="flex flex-col container px-32">
            {articleAI !== null ? (
                <div>
                    <h2 className="text-2xl font-bold text-center">AI Modified Article</h2>
                    <Notes note={{id: "1", defaultContent: articleAI}} key="1"/>
                </div>
            ) : (
                <div className={"container"}>
                    <h2 className="text-2xl font-bold text-center">AI Modified Article</h2>
                    <BeatLoader color="#36d7b7"/>
                </div>
            )}
            {articleBody !== null ? (
                <div className={"my-12"}>
                    <h2 className="text-2xl font-bold text-center">Original Article</h2>
                    <Notes note={{id: "0", defaultContent: articleBody}} key="0"/>
                </div>
            ) : (
                <div className={"container -my-36"}>
                    <h2 className="text-2xl font-bold text-center">Original Article</h2>
                    <BeatLoader color="#36d7b7"/>
                </div>
            )}
        </div>
    );
}

export default Articles;
