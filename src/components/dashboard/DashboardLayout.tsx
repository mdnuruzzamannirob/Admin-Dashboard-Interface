import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Header";
import { useSelector } from "react-redux";
import { selectUsers } from "@/features/users/userSlice";

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
        <div
          className={`w-full px-4 py-2 text-sm flex items-center justify-center transition-all duration-300 z-[100] ${
            inactiveUserCount > 5
              ? "bg-yellow-100 text-yellow-800 border-b border-yellow-300"
              : "bg-blue-100 text-blue-800 border-b border-blue-300"
          }`}
        >
          <span>Inactive users: {inactiveUserCount}</span>
          <button
            className={`ml-4 px-2 py-1 text-xs rounded border transition ${
              inactiveUserCount > 10
                ? "hover:bg-yellow-200 border-yellow-300 text-yellow-800"
                : "hover:bg-blue-200 border-blue-300 text-blue-800"
            }`}
            onClick={() => setShowBanner(false)}
          >
            ✕
          </button>
        </div>
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
