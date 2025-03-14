import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./ArticlesList.scss";

interface article {
  name: string;
  title: string;
  content: string[];
}

interface articleListProps {
  articles: article[];
}

function ArticlesList({ articles }: articleListProps) {
  return (
    <Container className="article__list-container">
      {articles.map((a: article) => {
        return (
          <Card
            key={a.name}
            as={Link}
            to={"/articles/" + a.name}
            className="article__card"
          >
            <Card.Body>
              <Card.Title>{a.title}</Card.Title>
              <Card.Text>{a.content[0].substring(0, 150)}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}

export default ArticlesList;
