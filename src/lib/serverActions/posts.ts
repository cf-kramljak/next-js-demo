"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePosts(page?: number) {
  revalidatePath(`/${page ? `?page=${page}` : ""}`);
}
