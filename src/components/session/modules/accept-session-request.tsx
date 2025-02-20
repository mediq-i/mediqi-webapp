"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AppointmentUpdateModal from "../ui/appointment-update-modal";
import React, { useState } from "react";

export default function AcceptSessionRequest() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog>
        <DialogTrigger
          onClick={() => setIsOpen(true)}
          className="w-[247px] p-3 bg-[#1570EF] rounded-3xl text-white"
        >
          Accept Request
        </DialogTrigger>
      </Dialog>
      <AppointmentUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
