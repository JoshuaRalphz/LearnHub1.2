// navbar-routes.tsx is now mixed it sidebar 
"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isMentor } from "@/lib/mentor";

export const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isInstructorPage = pathname?.startsWith("/instructor");
    const isCoursePage = pathname?.includes("/courses");
    // const isSearchPage = pathname === "/search";

    return (
        <>
            {/* {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )} */}
            <div className="flex gap-x-2 ml-auto">
                <UserButton afterSignOutUrl="/" />
                {isInstructorPage || isCoursePage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ) : isMentor(userId) ? (
                    <Link href="/instructor/courses">
                        <Button size="sm" variant="ghost">
                            Upload Course
                        </Button>
                    </Link>
                ) : null}
            </div>
        </>
    );
}
