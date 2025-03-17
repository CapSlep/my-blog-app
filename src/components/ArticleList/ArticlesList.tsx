import { Container, Placeholder } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./ArticlesList.scss";

interface article {
  name: string;
  title: string;
  content: string[];
}

interface articleListProps {
  articles: any[] | null;
  isLoading: boolean;
}

function ArticlesList({ articles, isLoading }: articleListProps) {
  return (
    <Container className="article__list-container">
      {isLoading ? (
        <>
          {[...Array(3)].map((_, index) => (
            <Card className="article__card w-100" key={index}>
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={2} size="sm" />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={12} size="sm" />
                  <Placeholder xs={6} size="sm" />
                </Placeholder>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <>
          {articles?.map((a: article) => {
            return (
              <Card
                className="w-100"
                key={a.name}
                as={Link}
                to={"/articles/" + a.name}
              >
                <Card.Body>
                  <Card.Title>{a.title}</Card.Title>
                  <Card.Text>
                    {a.content[0].substring(0, 150).trimEnd()}...
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
}

export default ArticlesList;
