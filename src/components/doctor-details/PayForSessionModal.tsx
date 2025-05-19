import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChevronRight, CreditCard, Wallet } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PayForSessionModal({createPaymentIntent}:{createPaymentIntent:(e: any) => Promise<void>}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-3 w-[113px] bg-[#1570EF] rounded-3xl text-white"
          type="button"
        >
          Pay now
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>How would you like to pay?</DialogTitle>
        </DialogHeader>
        <div>
          <div className="text-center">
            <p className="text-[14px] font-[500] text-[#667085]">Amount</p>
            <p className="text-[28px] font-[600] text-[#1D2939]">40,000</p>
          </div>
          <div className="mt-3">
            <p className="text-[18px] font-[500] text-[#667085]">
              Select a payment option
            </p>
            <div className="flex items-center justify-between my-3 cursor-pointer hover:bg-[#fbfbfb]" onClick={createPaymentIntent}>
              <div className="flex gap-3 items-center my-3">
                <div className="bg-[#7A5AF8] w-[50px] h-[50px] rounded-full flex justify-center items-center">
                  <CreditCard color="white"/>
                </div>
                <div>
                  <p className="text-[20px] font-[600] text-[#1D2939]">
                    Pay with card
                  </p>
                  <p className="text-[14px] font-[500] text-[#667085]">
                    Powered by Paystack
                  </p>
                </div>
              </div>

              <ChevronRight/>
            </div>
            <div className="flex items-center justify-between my-3 cursor-pointer hover:bg-[#fbfbfb]" >
              <div className="flex gap-3 items-center my-3">
                <div className="bg-[#EE46BC] w-[50px] h-[50px] rounded-full flex justify-center items-center">
                  <Wallet color="white"/>
                </div>
                <div>
                  <p className="text-[20px] font-[600] text-[#1D2939]">
                    Pay with Wallet
                  </p>
                  <p className="text-[14px] font-[500] text-[#667085]">
                    Powered by Mediq
                  </p>
                </div>
                <div className="bg-[#FEDF89] p-3 rounded-lg">
                    <p>Wallet Balance: NGN 2,300</p>
                </div>
              </div>

              <ChevronRight/>
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PayForSessionModal;
