"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";
import { RiNextjsFill } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { SiCsharp,SiTypescript } from "react-icons/si";
import { FaPython, FaHtml5, FaCss3Alt, FaReact, FaPhp } from "react-icons/fa";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  // match this to seed.ts
  "JavaScript": IoLogoJavascript,
  "TypeScript": SiTypescript,
  "HTML/CSS": FaHtml5,FaCss3Alt,
  "Python": FaPython,
  "C++": BiLogoCPlusPlus,
  "C#": SiCsharp,
  "React": FaReact,
  "Java": FaJava,
  "NextJS": RiNextjsFill,
  "PHP": FaPhp,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <section className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </section>
  );
};