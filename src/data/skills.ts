import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiPython,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiGit,
  SiGithub,
  SiVercel,
  SiLinux,
  SiPostman,
  SiGoogledrive,
  SiGooglesheets,
  SiGoogledocs,
} from "react-icons/si";
import { FaWindows, FaNetworkWired, FaTools, FaFileExcel, FaFileWord, FaFilePowerpoint, FaDatabase, FaChartBar } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import type { Lang } from "./profile";

export interface Skill {
  name: string;
  icon: IconType;
  /** Warna brand untuk ikon (hex) */
  color: string;
}

export interface SkillCategory {
  id: string;
  title: Record<Lang, string>;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: { en: "Frontend", id: "Frontend" },
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    id: "backend",
    title: { en: "Backend & Database", id: "Backend & Database" },
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "REST API", icon: FaNetworkWired, color: "#6366F1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "SQL", icon: FaDatabase, color: "#F29111" },
    ],
  },
  {
    id: "data",
    title: { en: "Data Analysis & Science", id: "Analisis & Sains Data" },
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
      { name: "NumPy", icon: SiNumpy, color: "#013243" },
      { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
      { name: "Data Visualization", icon: FaChartBar, color: "#10B981" },
      { name: "Excel", icon: FaFileExcel, color: "#217346" },
      { name: "Google Sheets", icon: SiGooglesheets, color: "#34A853" },
    ],
  },
  {
    id: "it-support",
    title: { en: "IT Support & Tools", id: "IT Support & Tools" },
    skills: [
      { name: "Windows", icon: FaWindows, color: "#0078D4" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Networking", icon: FaNetworkWired, color: "#0EA5E9" },
      { name: "Hardware & Troubleshooting", icon: FaTools, color: "#64748B" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#181717" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
    ],
  },
  {
    id: "admin",
    title: { en: "Office & Administration", id: "Perkantoran & Administrasi" },
    skills: [
      { name: "Microsoft Word", icon: FaFileWord, color: "#2B579A" },
      { name: "Microsoft Excel", icon: FaFileExcel, color: "#217346" },
      { name: "PowerPoint", icon: FaFilePowerpoint, color: "#D24726" },
      { name: "Google Docs", icon: SiGoogledocs, color: "#4285F4" },
      { name: "Google Drive", icon: SiGoogledrive, color: "#4285F4" },
    ],
  },
];
