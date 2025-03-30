import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function AddMoneyAction() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 bg-white p-3 text-black rounded-lg">
        Add Money <Plus />
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Enter amount to add</DialogTitle>
          <DialogDescription>
            How much would you like to fund your balance?
          </DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="amount">Amount</label>
          <Input placeholder="" className="my-3" />
          <p className="font-[400] text-[#6938EF] text-[14px]">
            NGN 2,000 is the minimum amount you can add
          </p>
          <Button className="bg-[#1570EF] w-full rounded-3xl p-3 mt-5">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddMoneyAction;
