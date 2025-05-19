import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ArrowUpRight } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";

function SendMoneyAction() {
  const [currentStage, setCurrentStage] = useState(1);
  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 bg-white p-3 text-black rounded-lg">
        Send Money <ArrowUpRight />
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {currentStage !== 3 ? "Send Money" : "Transfer Confirmation"}
          </DialogTitle>
          <DialogDescription>
            {currentStage === 1
              ? "Enter bank details of reciever"
              : currentStage === 2
              ? "Enter amount to send"
              : ""}
          </DialogDescription>
        </DialogHeader>
        {currentStage === 1 && (
          <div>
            <div className="my-3">
              <label htmlFor="bank">Bank Name</label>
              <Select name="bank">
                <SelectTrigger className="">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="est">Opay</SelectItem>
                    <SelectItem value="cst">UBA</SelectItem>
                    <SelectItem value="mst">Access Bank</SelectItem>
                    <SelectItem value="pst">GTB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="my-3">
              <label htmlFor="bank">Account Number</label>
              <Input placeholder="Enter account number" className="my-3" />
            </div>
            <div className="my-3">
              <label htmlFor="bank">Account Name</label>
              <Input
                placeholder="NAME OF RECIPIENT"
                className="my-3 bg-[#F2F4F7] border-dashed"
              />
            </div>
            <Button
              className="bg-[#1570EF] w-full rounded-3xl p-3 mt-5"
              onClick={() => setCurrentStage(currentStage + 1)}
            >
              Continue
            </Button>
          </div>
        )}
        {currentStage === 2 && (
          <div>
            <div className="my-3">
              <label htmlFor="bank">Amount to send</label>
              <Input placeholder="N" className="my-3" />
            </div>

            <Button
              className="bg-[#1570EF] w-full rounded-3xl p-3 mt-5"
              onClick={() => setCurrentStage(currentStage + 1)}
            >
              Continue
            </Button>
          </div>
        )}
        {currentStage === 3 && (
          <div>
            <div className="my-3">
              <div className="flex items-center gap-3 my-5 bg-[#F9FAFB] rounded-lg p-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="#" alt="Profile Picture" />
                  <AvatarFallback className="bg-black text-white">
                    {data?.user.first_name[0]}
                    {data?.user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="">
                  {data?.user.first_name} {data?.user.last_name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5 p-3">
                <p className="col-span-1 text-[14px] font-[500] text-[#667085]">
                  Transfer amount
                </p>
                <p className="col-span-1 text-[14px] font-[500] text-[#111827]">
                  NGN 10,000
                </p>
                <p className="col-span-1 text-[14px] font-[500] text-[#667085]">
                  Transfer fee
                </p>
                <p className="col-span-1 text-[14px] font-[500] text-[#111827]">
                  NGN 32.000
                </p>
              </div>
            </div>

            <Button className="bg-[#1570EF] w-full rounded-3xl p-3 mt-5">
              Send
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SendMoneyAction;
