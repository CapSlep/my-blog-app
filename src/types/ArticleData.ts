export interface ArticleData {
  name: string;
  upvotes: number;
  comments: { postedBy: string; text: string }[];
  upvoteIds: string[];
  content: string[];
  title: string;
}
