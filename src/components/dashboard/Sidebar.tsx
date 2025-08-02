import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hook";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: Props) => {
  const sideNavItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User Management", path: "/users" },
    { name: "Roles & Permissions", path: "/roles" },
    { name: "Reports", path: "/reports" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
    { name: "Notifications", path: "/notifications" },
    { name: "Audit Logs", path: "/audit-logs" },
    { name: "Help", path: "/help" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:block`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b lg:justify-center">
        <span className="font-bold text-lg">Tech Element It</span>
        <button
          onClick={onClose}
          className="text-xl lg:hidden"
          aria-label="Close sidebar"
        >
          <IoCloseOutline />
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {sideNavItems.map((item) => (
          <button
            key={item.name}
            className="block w-full text-left px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {item.name}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};
