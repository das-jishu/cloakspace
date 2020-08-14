export class Post {
  key: string;
  title: string;
  body: string;
  tags: string[];
  dateCreated: Date;
  email?: any;
  likes?: number;
  dislikes?: number;
  reports: number;
  comments?;
  liked?: string;
  disliked?: string;
  blurred?: string;
  raw_data: string;
  totalComments: number;
}
