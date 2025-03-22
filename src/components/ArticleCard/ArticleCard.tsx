import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleData } from "../../types";
import { formatDate } from "../../utils";

interface PropType {
  cardData?: ArticleData | null;
  isLoading?: boolean;
}

function ArticleCard({ cardData = null, isLoading = true }: PropType) {
  return (
    <Card
      className="w-100"
      key={cardData?.name}
      as={Link}
      to={"/articles/" + cardData?.name}
    >
      <Card.Body>
        {isLoading ? (
          <>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={2} size="sm" />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={12} size="sm" />
              <Placeholder xs={6} size="sm" />
            </Placeholder>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <Card.Title>{cardData?.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {formatDate(cardData?.creationDate || "")}
              </Card.Subtitle>
            </div>
            <Card.Text className="mb-2">
              {cardData?.content[0].substring(0, 180).trimEnd()}
              ...
            </Card.Text>
            <Card.Body className="d-flex justify-content-between align-items-center p-0">
              <Card.Text>Upvotes: {cardData?.upvotes}</Card.Text>
              <Card.Text>Comments: {cardData?.comments.length}</Card.Text>
            </Card.Body>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
