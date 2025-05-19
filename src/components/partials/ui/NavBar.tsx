import { Bell, ChevronDown, CircleHelp } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";

const Navbar: React.FC = () => {
  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
      <div className="font-bold hidden md:block">Home</div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-2">
          <CircleHelp width={24} height={24} />
          <p className="font-semibold">Help</p>
        </div>
        <Bell width={20} height={20} />
        <div className="flex items-center gap-1">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src="#" alt="Profile Picture" />
            <AvatarFallback>
              {data?.user.first_name[0]}
              {data?.user.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <ChevronDown width={20} height={20} className="hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
