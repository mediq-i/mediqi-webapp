"use client";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight, Info } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ProfileNameForm() {
  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });
  return (
    <div className="w-[800px]">
      <div>
        <div className="h-[70px] bg-[#ECFDF3] border-l-[3px] my-5 border-[#12B76A] flex items-center p-3 gap-3 text-[14px] font-[400]">
          <Info className="text-[#12B76A]" />
          <p>
            To change your email address, kindly reach out to support team on
            help@mediq.com
          </p>
        </div>
        <div className="flex items-center gap-10 my-3">
          <Avatar className="w-[80px] h-[80px]">
            <AvatarImage src="#" alt="Profile Picture" />
            <AvatarFallback>
              {data?.user.first_name[0]}
              {data?.user.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>
              {data?.user.first_name} {data?.user.last_name}
            </p>
            <p className="text-[#2E90FA] flex items-center gap-3">
              Change Picture <ChevronRight className="text-black" />
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-3">
            <div className="w-[50%]">
              <label>First Name</label>
              <Input 
              placeholder={data?.user.first_name}
              />
            </div>
            <div className="w-[50%]">
              <label>Last Name</label>
              <Input 
              placeholder={data?.user.last_name}
              />
            </div>
          </div>
          <div className="my-3">
            <label>Email</label>
            <Input
              type="email"
              className="bg-[#F9F9F9]"
              placeholder={data?.user.email}
            />
          </div>
        </div>
        <Button className="bg-[#1570EF] rounded-full p-6 my-3">Save Changes</Button>
      </div>
    </div>
  );
}

export default ProfileNameForm;
