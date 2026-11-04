import { cacheLife } from "next/cache";

/** Dibungkus "use cache" agar `new Date()` tidak memicu error prerender di Cache Components. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
