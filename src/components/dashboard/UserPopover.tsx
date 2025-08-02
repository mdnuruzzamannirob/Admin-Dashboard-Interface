import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NavItem from "./NavItem";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

export const UserPopover = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleModalConfirm = () => {
    setShowLogoutModal(false);
    toast.success("Logged out successfully");
    handleLogout();
  };

  const handleModalCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-4 shadow-xl rounded-xl space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium capitalize truncate">
                {user?.email.split("@")[0]}
              </p>
              <p
                title={user?.email}
                className="text-xs text-muted-foreground truncate"
              >
                {user?.email}
              </p>
            </div>
          </div>

          <div className="border-t border-muted pt-3 space-y-2">
            {/* Links */}
            <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" />
            <NavItem icon={<User size={16} />} label="Profile" />
            <NavItem icon={<Settings size={16} />} label="Settings" />
            <NavItem
              icon={<LogOut size={16} />}
              label="Logout"
              isLogout
              onClick={handleLogoutClick}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Logout Confirmation Modal using shadcn Dialog */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to logout?</p>
          <DialogFooter>
            <button
              className="px-3 py-2 cursor-pointer text-sm rounded-md bg-muted text-foreground"
              onClick={handleModalCancel}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 rounded-md cursor-pointer text-sm bg-red-500 text-white"
              onClick={handleModalConfirm}
            >
              Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
