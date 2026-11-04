import { cacheLife, cacheTag } from "next/cache";
import { profile } from "@/data/profile";
import { hiddenRepos, projectOverrides, type LocalizedText, type ProjectOverride } from "@/data/projects";
import type { Project } from "./project";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  size: number;
  archived: boolean;
  pushed_at: string;
}

function humanizeRepoName(name: string): string {
  return name
    .replace(/^\d{6,}-/, "") // strip NIM prefix e.g. "105841104622-"
    .replace(/[-_]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toProject(repo: GitHubRepo): Project {
  const orderIndex = projectOverrides.findIndex((o) => o.repo === repo.name);
  const override = orderIndex === -1 ? undefined : projectOverrides[orderIndex];
  const description: LocalizedText | null =
    override?.description ??
    (repo.description ? { en: repo.description, id: repo.description } : null);

  return {
    id: repo.id,
    repo: repo.name,
    title: override?.title ?? humanizeRepoName(repo.name),
    description,
    url: repo.html_url,
    liveUrl: override?.liveUrl === undefined ? repo.homepage || null : override.liveUrl,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics ?? [],
    tech: override?.tech ?? (repo.language ? [repo.language] : []),
    image: override?.image ?? null,
    featured: override?.featured ?? false,
    order: orderIndex === -1 ? Infinity : orderIndex,
    pushedAt: repo.pushed_at,
  };
}

function isVisible(repo: GitHubRepo): boolean {
  return (
    repo.size > 0 &&
    !repo.fork &&
    !repo.archived &&
    !hiddenRepos.includes(repo.name) &&
    repo.name.toLowerCase() !== profile.githubUsername.toLowerCase()
  );
}

/** Fallback bila GitHub API gagal (rate limit / offline): hanya repo yang dikurasi manual. */
function fallbackProjects(): Project[] {
  return projectOverrides.map(overrideToProject);
}

function overrideToProject(o: ProjectOverride, i: number): Project {
  return {
    id: -(i + 1),
    repo: o.repo,
    title: o.title ?? humanizeRepoName(o.repo),
    description: o.description ?? null,
    url: o.private ? null : `https://github.com/${profile.githubUsername}/${o.repo}`,
    liveUrl: o.liveUrl ?? null,
    language: o.tech?.[0] ?? null,
    stars: 0,
    forks: 0,
    topics: [],
    tech: o.tech ?? [],
    image: o.image ?? null,
    featured: o.featured ?? false,
    order: i,
    pushedAt: "",
  };
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("github-projects");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=pushed`,
      { headers },
    );
    if (!res.ok) {
      console.error(`GitHub API error ${res.status}`);
      return fallbackProjects();
    }
    const repos = (await res.json()) as GitHubRepo[];
    // Repo private tidak dikembalikan API publik, jadi disisipkan dari kurasi manual
    const privateProjects = projectOverrides
      .map((o, i) => (o.private ? overrideToProject(o, i) : null))
      .filter((p): p is Project => p !== null);
    return [...repos.filter(isVisible).map(toProject), ...privateProjects]
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.order !== b.order) return a.order - b.order;
        return b.pushedAt.localeCompare(a.pushedAt);
      });
  } catch (err) {
    console.error("GitHub fetch failed", err);
    return fallbackProjects();
  }
}
