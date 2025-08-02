import { IoMenuOutline } from "react-icons/io5";

type Props = {
  onToggleSidebar: () => void;
};

export const Navbar = ({ onToggleSidebar }: Props) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white border-b shadow-sm sticky top-0 z-20">
      <button
        className="lg:hidden text-2xl"
        onClick={onToggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <IoMenuOutline />
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
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-400" />
          <div className="w-4 h-4 rounded-full bg-gray-400" />
          <div className="w-4 h-4 rounded-full bg-gray-400" />
        </div>
      </div>
    </header>
  );
};
