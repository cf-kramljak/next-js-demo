import { IPost } from "@/interfaces";
import { request } from "./request";

const getPosts = async (sessionCookie?: string) => {
  return request<IPost[]>("/posts", {
    headers: sessionCookie ? { Cookie: `session=${sessionCookie}` } : undefined,
  });
};

const createPost = async (title: string) => {
  return request<IPost>("/posts", {
    method: "POST",
    body: { title },
  });
};

export default { getPosts, createPost };
