import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Header";
import { useSelector } from "react-redux";
import { selectUsers } from "@/features/users/userSlice";
import NotificationBanner from "../users/NotificationBanner";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const users = useSelector(selectUsers);
  const [inactiveUserCount, setInactiveUserCount] = useState(0);
  const [showBanner, setShowBanner] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Recalculate inactive users
  useEffect(() => {
    const count = users.filter((user) => !user.active).length;
    setInactiveUserCount(count);
    setShowBanner(count > 5);
  }, [users]);

  // Handle sidebar swipe-close
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const currentX = e.touches[0].clientX;
      const diffX = touchStartX.current - currentX;
      if (diffX > 50) {
        closeSidebar();
        touchStartX.current = null;
      }
    };

    const sidebar = sidebarRef.current;
    if (sidebar && sidebarOpen) {
      sidebar.addEventListener("touchstart", handleTouchStart);
      sidebar.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener("touchstart", handleTouchStart);
        sidebar.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <NotificationBanner
          inactiveUserCount={inactiveUserCount}
          setShowBanner={setShowBanner}
        />
      )}

      <div className="min-h-dvh flex flex-col lg:flex-row bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <div ref={sidebarRef}>
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>

        {/* Overlay for sidebar */}
        {sidebarOpen && (
          <div
            onClick={closeSidebar}
            className="lg:hidden fixed inset-0 bg-black/40 z-30"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
