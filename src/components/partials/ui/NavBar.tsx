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
    <div className="w-full h-16 bg-white flex items-center justify-between px-6 py-6">
      <div className="font-bold">Home</div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <CircleHelp width={24} height={24} />
          <p className="font-semibold">Help</p>
        </div>
        <Bell width={20} height={20} />
        <div className="flex items-center gap-1">
          <Avatar className="w-10 h-10">
            <AvatarImage src="#" alt="Profile Picture" />
            <AvatarFallback>
              {data?.user.first_name[0]}
              {data?.user.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <ChevronDown width={20} height={20}>
            {" "}
          </ChevronDown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
