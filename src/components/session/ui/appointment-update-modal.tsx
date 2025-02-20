import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AppointmentUpdateModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          <div className="text-center">
            <Image
              src={"/success.svg"}
              alt="success"
              height={83}
              width={83}
              className="m-auto"
            />
            <p className="text-[#0C1523] font-[500] texxt-[18px]">
              Your appointment has been updated
            </p>
          </div>
        </DialogTitle>
        <div className="border rounded-sm p-3 mt-3">
          <div className="flex p-3 justify-between">
            <p className="flex gap-1">
              <Image src={"/doc.png"} alt="" width={20} height={20} /> Dr Lisa
              Haruna
            </p>
            <p className="text-[#1570EF]">#ME88010</p>
          </div>
          <div className="p-2 bg-[#F2F4F7] rounded-sm flex justify-center ">
            <div className="flex border-l border-[#2E90FA] justify-center  pl-2 items-center">
              <div>
                <p className="text-[14px] text-[#667085] font-[500] line-through">
                  Wed,12 July
                </p>
                <p className="text-[14px] text-[#98A2B3] font-[500] flex gap-1 line-through">
                  <Clock /> 10:00am - 11:00am
                </p>
              </div>
              <p className="flex">
                <ChevronRight className="text-[#00000033]" />
                <ChevronRight className="text-[#00000066]" />
                <ChevronRight className="text-[#00000099]" />
                <ChevronRight className="text-[#000000CC]" />
              </p>
              <div>
                <p className="text-[14px] text-[#667085] font-[500] ">
                  Wed,12 July
                </p>
                <p className="text-[14px] text-[#98A2B3] font-[500] flex gap-1">
                  <Clock /> 10:00am - 11:00am
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="p-3 border font-[600] text-[#1570EF] text-[16px] rounded-3xl mt-5"
          onClick={() => setIsOpen(false)}
        >
          Done
        </button>
      </DialogContent>
    </Dialog>
  );
}
