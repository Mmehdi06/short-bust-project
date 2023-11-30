import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";


interface Article {
    id: number;
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
            </CardHeader>
            <CardContent>
                <CardDescription>{article.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button variant={"secondary"}><a href={`/articles/${article.id}`}>Edit Article</a> </Button>
            </CardFooter>
        </Card>
    );
}
