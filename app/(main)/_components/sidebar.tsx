// sidebar.tsx
import { NavbarRoutes } from "@/components/navbar-routes";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";


export const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
            <div className="mt-auto p-6">
                <NavbarRoutes />
            </div>
        </div>
    );
};
