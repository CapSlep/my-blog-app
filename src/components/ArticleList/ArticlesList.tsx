import { Container } from "react-bootstrap";
import "./ArticlesList.scss";
import { ArticleCard } from "../../components";
import { ArticleData } from "../../types";

interface articleListProps {
  articles: ArticleData[] | null;
  isLoading: boolean;
}

function ArticlesList({ articles, isLoading }: articleListProps) {
  return (
    <Container className="article__list-container">
      {isLoading ? (
        <>
          {[...Array(3)].map((_, index) => (
            <ArticleCard key={index}></ArticleCard>
          ))}
        </>
      ) : (
        <>
          {articles?.map((a: ArticleData) => {
            return (
              <ArticleCard
                key={a.name}
                cardData={a}
                isLoading={isLoading}
              ></ArticleCard>
            );
          })}
        </>
      )}
    </Container>
  );
}

export default ArticlesList;
