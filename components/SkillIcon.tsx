import type { IconType } from "react-icons";
import {
  FaBrain,
  FaChartLine,
  FaComments,
  FaDatabase,
  FaFlask,
  FaPuzzlePiece,
  FaSitemap,
  FaUsers,
} from "react-icons/fa6";
import {
  SiCss,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiSwagger,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

/** name (as written in data/portfolio.ts) → [icon, brand colour]. Unknown names render no icon. */
const MAP: Record<string, [IconType, string]> = {
  "Machine Learning": [FaBrain, "#ec4899"],
  TypeScript: [SiTypescript, "#3178c6"],
  HTML: [SiHtml5, "#e34f26"],
  CSS: [SiCss, "#663399"],
  JavaScript: [SiJavascript, "#eab308"],
  Python: [SiPython, "#3776ab"],
  SQL: [FaDatabase, "#0ea5e9"],
  PostgreSQL: [SiPostgresql, "#4169e1"],
  TensorFlow: [SiTensorflow, "#ff6f00"],
  NumPy: [SiNumpy, "#4dabcf"],
  Pandas: [SiPandas, "#7c3aed"],
  Matplotlib: [FaChartLine, "#11557c"],
  "Next.js": [SiNextdotjs, "currentColor"],
  "Tailwind CSS": [SiTailwindcss, "#06b6d4"],
  "Prisma ORM": [SiPrisma, "currentColor"],
  React: [SiReact, "#38bdf8"],
  "Node.js": [SiNodedotjs, "#5fa04e"],
  "Express JS": [SiExpress, "currentColor"],
  MySQL: [SiMysql, "#4479a1"],
  MongoDB: [SiMongodb, "#47a248"],
  "Data Structure": [FaSitemap, "#0d9488"],
  Research: [FaFlask, "#8b5cf6"],
  Teamwork: [FaUsers, "#f97316"],
  "Communication skills": [FaComments, "#0ea5e9"],
  "Git and GitHub": [SiGit, "#f05032"],
  Firebase: [SiFirebase, "#f59e0b"],
  "UI/UX": [SiFigma, "#f24e1e"],
  "Problem-solving": [FaPuzzlePiece, "#14b8a6"],
  "OpenAI API": [SiOpenai, "currentColor"],
  Swagger: [SiSwagger, "#85ea2d"],
  Supabase: [SiSupabase, "#3ecf8e"],
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const entry = MAP[name];
  if (!entry) return null;
  const [Icon, color] = entry;
  return <Icon aria-hidden className={className} style={{ color }} />;
}
