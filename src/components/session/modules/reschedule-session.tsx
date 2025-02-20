"use client";

import SelectDateAndTime from "@/components/partials/SelectDateAndTime";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import AppointmentUpdateModal from "../ui/appointment-update-modal";

export default function RescheduleSession() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-[247px] p-3 bg-[#1570EF] rounded-3xl text-white">
          Reschedule session
        </DialogTrigger>
        <DialogContent className="max-h-[600px] overflow-y-auto">
          <DialogHeader className="border-b pb-5">
            <DialogTitle>Select reschedule date</DialogTitle>
          </DialogHeader>

          <SelectDateAndTime />
          <button
            className=" p-3 bg-[#1570EF] rounded-3xl text-white"
            onClick={() => setIsOpen(true)}
          >
            Reschedule session
          </button>
        </DialogContent>
      </Dialog>
      <AppointmentUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
