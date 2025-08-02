import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Header";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Add missing inactiveUserCount state (for demo, set to 50)
  const inactiveUserCount = 50;

  const [showBanner, setShowBanner] = useState(inactiveUserCount > 0);
  const isWarning = inactiveUserCount > 5;

  useEffect(() => {
    setShowBanner(inactiveUserCount > 0);
  }, [inactiveUserCount]);

  // Optional: auto-hide after 5s
  //   useEffect(() => {
  //     if (showBanner) {
  //       const timer = setTimeout(() => setShowBanner(false), 5000);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [showBanner]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Swipe left to close
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
      {/* Toast Notification Banner - moved to top */}
      {showBanner && (
        <div
          className={`w-full px-4 py-2 text-sm flex items-center justify-center transition-all duration-300 z-[100] ${
            isWarning
              ? "bg-yellow-100 text-yellow-800 border-b border-yellow-300"
              : "bg-blue-100 text-blue-800 border-b border-blue-300"
          }`}
        >
          <span>
            {isWarning
              ? `Too many inactive users (${inactiveUserCount})`
              : `Inactive users: ${inactiveUserCount}`}
          </span>
          <button
            className="ml-4 px-2 py-1 text-xs rounded bg-transparent hover:bg-gray-200"
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

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={closeSidebar}
            className="lg:hidden fixed inset-0 bg-black/40 z-30"
          />
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
