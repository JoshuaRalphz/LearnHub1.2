"use client";

import { BarChart, Compass, Home, Layout, List, MessageCircle } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Home,
    label: "Welcome",
    href: "/",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: MessageCircle,
    label: "Message",
    href: "/chat",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/analytics",
  },
]

export const SidebarRoutes = () => {

  const pathname = usePathname ();
  const isInstructorPage = pathname?.includes("/instructor");
  const routes = isInstructorPage ? instructorRoutes : guestRoutes;

  return (
  <div className="flex flex-col w-full">
    {routes.map((route)=>(
        <SidebarItem
        key={route.href}
        icon={route.icon}
        label={route.label}
        href={route.href}
        />
    ))}
  </div>
)
};
