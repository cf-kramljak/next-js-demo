export interface IPost {
  id: number;
  title: string;
  author: {
    username: string;
  };
}
