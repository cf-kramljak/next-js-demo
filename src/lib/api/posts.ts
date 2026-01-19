import { IPost } from "@/interfaces";
import { request } from "./request";

interface IGetPostsResponse {
  posts: IPost[];
  total: number;
}

const getPosts = async (
  page: number,
  limit: number,
  sessionCookie?: string,
) => {
  return request<IGetPostsResponse>(
    `/posts?page=${page}&limit=${limit}`,
    sessionCookie
      ? { headers: { Authorization: `Bearer ${sessionCookie}` } }
      : {},
  );
};

const createPost = async (title: string) => {
  return request<IPost>("/posts", {
    method: "POST",
    body: { title },
  });
};

export default { getPosts, createPost };
