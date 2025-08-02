import {
  MdDashboard,
  MdPeople,
  MdSecurity,
  MdAssessment,
  MdBarChart,
  MdListAlt,
  MdHelpOutline,
} from "react-icons/md";

export const sideNavItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard className="mr-2 text-lg" />,
  },
  {
    name: "User Management",
    path: "/dashboard/users",
    icon: <MdPeople className="mr-2 text-lg" />,
  },
  {
    name: "Roles & Permissions",
    path: "/dashboard/roles",
    icon: <MdSecurity className="mr-2 text-lg" />,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: <MdAssessment className="mr-2 text-lg" />,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: <MdBarChart className="mr-2 text-lg" />,
  },
  {
    name: "Audit Logs",
    path: "/dashboard/audit-logs",
    icon: <MdListAlt className="mr-2 text-lg" />,
  },
  {
    name: "Help",
    path: "/dashboard/help",
    icon: <MdHelpOutline className="mr-2 text-lg" />,
  },
];
