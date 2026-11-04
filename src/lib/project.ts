import type { LocalizedText } from "@/data/projects";

export interface Project {
  id: number;
  repo: string;
  title: string;
  description: LocalizedText | null;
  /** null untuk repo private */
  url: string | null;
  liveUrl: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  tech: string[];
  image: string | null;
  featured: boolean;
  /** Index di projectOverrides; Infinity untuk repo yang tidak dikurasi */
  order: number;
  pushedAt: string;
}

/** Warna bahasa mengikuti GitHub linguist. */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Python: "#3572A5",
  PHP: "#4F5D95",
  Java: "#B07219",
  Go: "#00ADD8",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Shell: "#89E051",
  Vue: "#41B883",
  "Jupyter Notebook": "#DA5B0B",
};
