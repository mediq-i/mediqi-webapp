"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";
import AddMoneyAction from "./AddMoneyAction";
import SendMoneyAction from "./SendMoneyAction";


function PaymentActions() {
  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });
  return (
    <div className="h-[284px] bg-radial-gradient rounded-lg p-5 text-white">
      <div className="flex items-center gap-3">
        <p>Good afternoon, {data?.user.first_name}</p>
        <Avatar className="w-10 h-10">
          <AvatarImage src="#" alt="Profile Picture" />
          <AvatarFallback className="bg-black">
            {data?.user.first_name[0]}
            {data?.user.last_name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center my-5">
        <p className="text-[14px] text-[#FCFCFD]">Current Balance</p>
        <p className="text-[32px] text-[#FCFCFD] font-[700]">NGN 20,000.00</p>
        <div className="m-auto my-6 w-fit flex gap-3">
            <AddMoneyAction/>
            <SendMoneyAction/>
          
        </div>
      </div>
    </div>
  );
}

export default PaymentActions;
