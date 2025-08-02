import { cn } from "@/lib/utils";

const NavItem = ({
  icon,
  label,
  isLogout = false,
  className = "",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isLogout?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={cn(
        `flex cursor-pointer items-center w-full px-3 py-2 text-sm rounded-md hover:bg-muted ${
          isLogout ? "text-red-600 hover:bg-red-50" : "text-foreground"
        } transition`,
        className
      )}
      onClick={() => {
        onClick?.();
      }}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};
export default NavItem;
