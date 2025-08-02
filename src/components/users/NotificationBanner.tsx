import type { FC } from "react";

interface NotificationBannerProps {
  inactiveUserCount: number;
  setShowBanner: (value: boolean) => void;
}

const NotificationBanner: FC<NotificationBannerProps> = ({
  inactiveUserCount,
  setShowBanner,
}) => {
  return (
    <div
      className={`w-full px-4 py-2 text-sm flex items-center justify-center transition-all duration-300 z-[100] ${
        inactiveUserCount > 5
          ? "bg-yellow-100 text-yellow-800 border-b border-yellow-300"
          : "bg-blue-100 text-blue-800 border-b border-blue-300"
      }`}
    >
      <span>Too many inactive users</span>
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
  );
};

export default NotificationBanner;
