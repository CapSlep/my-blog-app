import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./ArticlesList.scss";
import { ArticleCard } from "../../components";
import { ArticleData } from "../../types";

interface articleListProps {
  articles: ArticleData[] | undefined;
  isLoading: boolean;
}

enum SortMethods {
  upvotes = "upvotes",
  comments = "comments",
  time = "time",
  default = "default",
}

function ArticlesList({ articles, isLoading }: articleListProps) {
  const [articlesList, setArticlesList] = useState<ArticleData[] | undefined>(
    undefined
  );
  const [lastSortMethod, setLastSortMethod] = useState<SortMethods>(
    SortMethods.default
  );

  useEffect(() => {
    setArticlesList(articles);
  }, [articles]);

  function sortArticles(sortMethod: SortMethods) {
    switch (sortMethod) {
      case SortMethods.upvotes:
        if (lastSortMethod === SortMethods.upvotes) {
          setArticlesList(articlesList?.slice().reverse());
          break;
        }
        setArticlesList(
          articles?.slice().sort((a, b) => {
            return b.upvotes - a.upvotes;
          })
        );
        setLastSortMethod(SortMethods.upvotes);
        break;

      case SortMethods.comments:
        if (lastSortMethod === SortMethods.comments) {
          setArticlesList(articlesList?.slice().reverse());
          break;
        }
        setArticlesList(
          articles?.slice().sort((a, b) => {
            return b.comments.length - a.comments.length;
          })
        );
        setLastSortMethod(SortMethods.comments);
        break;

      case SortMethods.time:
        if (lastSortMethod === SortMethods.time) {
          setArticlesList(articlesList?.slice().reverse());
          break;
        }
        setArticlesList(
          articles?.slice().sort((a, b) => {
            return (
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
            );
          })
        );
        setLastSortMethod(SortMethods.time);
        break;

      case SortMethods.default:
        setArticlesList(articles);
        setLastSortMethod(SortMethods.default);
        break;

      default:
        console.error("Invalid sort method");
        setArticlesList(articles);
        setLastSortMethod(SortMethods.default);
        break;
    }
  }

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
          <div className="gap-2 d-flex flex-wrap justify-content-start">
            <Button
              onClick={() => {
                sortArticles(SortMethods.upvotes);
              }}
            >
              Sort by Upvotes
            </Button>
            <Button
              onClick={() => {
                sortArticles(SortMethods.comments);
              }}
            >
              Sort by Comments
            </Button>
            <Button
              onClick={() => {
                sortArticles(SortMethods.time);
              }}
            >
              Sort by Time
            </Button>
            <Button
              onClick={() => {
                sortArticles(SortMethods.default);
              }}
            >
              Reset
            </Button>
          </div>
          {articlesList?.map((a: ArticleData) => {
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
