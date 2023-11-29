import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

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
        <Card>
            <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <a className={"text-blue-700"} href={article.url}>Article Content</a>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
}
