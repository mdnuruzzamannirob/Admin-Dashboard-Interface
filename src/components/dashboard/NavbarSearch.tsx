import { useState } from "react";
import { Search, X } from "lucide-react";

export const NavbarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSearch = () => setIsOpen(false);

  return (
    <>
      {/* 🔍 Desktop Search */}
      <div className="relative hidden lg:block w-full max-w-xs">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-3 h-9 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
        />
      </div>

      {/* 🔍 Mobile Icon */}
      <button
        className="lg:hidden p-2 cursor-pointer "
        onClick={() => setIsOpen(true)}
        aria-label="Open Search"
      >
        <Search size={20} />
      </button>

      {/* 🔍 Fullscreen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Dark overlay background */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeSearch}
            aria-hidden="true"
          />

          {/* Search box & results container */}
          <div className="relative z-50 flex justify-center px-4 pt-4">
            <div className="bg-white w-full max-w-md rounded-md shadow-lg p-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search..."
                  className="w-full pl-10 pr-10 h-10 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                <button
                  className="absolute right-3 px-1 bg-white cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={closeSearch}
                  aria-label="Close Search"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Example results section */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Recent Searches</p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm hover:bg-gray-100 p-2 rounded-sm cursor-pointer">
                    Dashboard
                  </li>
                  <li className="text-sm hover:bg-gray-100 p-2 rounded-sm cursor-pointer">
                    Profile
                  </li>
                  <li className="text-sm hover:bg-gray-100 p-2 rounded-sm cursor-pointer">
                    Settings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
