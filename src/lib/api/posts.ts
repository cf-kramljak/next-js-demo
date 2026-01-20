import { IPost } from "@/interfaces";
import { request } from "./request";

interface IGetPostsResponse {
  posts: IPost[];
  total: number;
}

const getPosts = async (page: number, limit: number) => {
  return request<IGetPostsResponse>(`/posts?page=${page}&limit=${limit}`);
};

const getSinglePost = async (postId: string) => {
  return request<IPost>(`/posts/${postId}`);
};

const createPost = async (title: string) => {
  return request<IPost>("/posts", {
    method: "POST",
    body: { title },
  });
};

const updatePost = async (postId: number, title: string) => {
  return request<IPost>(`/posts/${postId}`, {
    method: "PATCH",
    body: { title },
  });
};

const deletePost = async (postId: string) => {
  return request<void>(`/posts/${postId}`, {
    method: "DELETE",
  });
};

export default { getPosts, getSinglePost, createPost, updatePost, deletePost };
