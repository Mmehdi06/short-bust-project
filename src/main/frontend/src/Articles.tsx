import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
}


function Articles() {
    const {id} = useParams();
    const [articleBody, setArticleBody] = useState();

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
                            "Article-url": param.url
                        }
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

    return (
        <div className={"container px-32"}>
            {articleBody}
        </div>
    );
}

export default Articles;