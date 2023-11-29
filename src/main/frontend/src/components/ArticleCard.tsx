import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";

interface Article {
    title: string;
    description: string;
    url: string;
}

interface Props {
    article: Article;
}

export default function ArticleCard({article}: Props) {
    return (
        <Card className={"flex flex-col justify-end h-80"}>
            <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant={"link"} className={"text-blue-700"}> <a href={article.url}> Article
                    Content</a></Button>
            </CardContent>
            <CardFooter>
                <Button variant={"secondary"}>Edit Article</Button>
            </CardFooter>
        </Card>
    );
}
