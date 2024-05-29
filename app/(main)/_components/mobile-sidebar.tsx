// mobile-sidebar.tsx
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
    return (
        <div className="fixed top-0 left-0 p-4 md:hidden z-50">
            <Sheet>
                <SheetTrigger className="bg-white rounded-full p-2 shadow-md hover:opacity-75 transition">
                    <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-white">
                    <div className="bg-gray-100 h-full">
                        <Sidebar />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
