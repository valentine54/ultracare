import React from "react";
import { Menu } from "lucide-react";
import NotificationMenu from "./NotificationsMenu";
import ProfileMenu from "./ProfileMenu";

const TopBar = ({
  onMenuClick,
  userName = "Sara Cynthia",
  userEmail = "SaraCynthia5@gmail.com",
}) => {
  return (
    <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center space-x-4">
        <NotificationMenu />
        <div className="h-8 w-px bg-gray-200"></div>
        <ProfileMenu userName={userName} userEmail={userEmail} />
      </div>
    </div>
  );
};

export default TopBar;
