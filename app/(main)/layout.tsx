// dashboardLayout.tsx
import { Sidebar } from "./_components/sidebar";
import { MobileSidebar } from "./_components/mobile-sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <MobileSidebar />
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 bg-gray-100">
                <Sidebar />
            </div>
            <main className="md:pl-56 h-full">
                {children}
            </main>
        </div>
    );
};
export default DashboardLayout;
