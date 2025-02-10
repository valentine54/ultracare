import React from "react";
import { Menu, Search } from "lucide-react";
import NotificationMenu from "./NotificationsMenu";
import ProfileMenu from "./ProfileMenu";

const TopBar = ({
  onMenuClick,
  userName = "Sara Cynthia",
  userEmail = "SaraCynthia5@gmail.com",
}) => {
  return (
    <div className="bg-white px-6 py-3 flex items-center justify-between shadow-sm border-b border-gray-100">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
          CIC Insurance
        </h1>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here.."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <NotificationMenu />
        <div className="h-8 w-px bg-gray-200"></div>
        <ProfileMenu userName={userName} userEmail={userEmail} />
      </div>

      {/* Mobile Search */}
      <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here.."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
