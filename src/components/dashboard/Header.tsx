import { RiMenuLine } from "react-icons/ri";
import { GrNotification } from "react-icons/gr";
import { UserPopover } from "./UserPopover";

type Props = {
  onToggleSidebar: () => void;
};

export const Navbar = ({ onToggleSidebar }: Props) => {
  return (
    <>
      <header className="h-16 flex items-center justify-between px-5 bg-white border-b shadow-sm sticky top-0 z-20">
        <button
          className="lg:hidden cursor-pointer text-2xl"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <RiMenuLine />
        </button>

        {/* Centered Logo on Mobile */}
        <div className="">
          <input
            type="text"
            placeholder="Search..."
            className="hidden lg:block px-3 py-1 border rounded"
          />
        </div>

        {/* Searchbar & Circles */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="size-9 bg-gray-100 relative flex items-center justify-center rounded-full hover:bg-gray-100">
            <GrNotification className="cursor-pointer size-4" />
            <span className="absolute top-[2px] right-[2px] bg-red-500 text-white text-xs rounded-full size-2" />
          </button>

          <UserPopover />
        </div>
      </header>
    </>
  );
};
