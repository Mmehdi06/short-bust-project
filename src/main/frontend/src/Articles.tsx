import {useParams} from "react-router-dom";

function Articles() {
    const {id} = useParams();

    return (
        <div>
            <h1>Article {id}</h1>
        </div>
    );
}

export default Articles;
