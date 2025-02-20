"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function AddReview() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = [
    "Arrived early",
    "Clear and concise",
    "Helpful",
    "Nice and Collected",
    "Difficult",
    "Comfortable",
  ];
  const handleOptionChange = (option: string) => {
    if (option === "Other" && selectedOptions.includes("Other")) {
      setSelectedOptions(selectedOptions.filter((o) => o !== "Other"));
    } else if (option === "Other") {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="w-[247px] p-3 bg-[#1570EF] rounded-3xl text-white">
        Add Review
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            <div className=" gap-5 p-2 text-center">
              <div>
                <Image
                  src={"/doctor-detail-pic.png"}
                  alt=""
                  height={48}
                  width={48}
                  className="m-auto"
                />
              </div>
              <div>
                <p className="text-[#090909] font-[700] text-[16px] my-2">
                  Dr. Emily Harper, MD
                </p>
                <p className="text-[#667085] font-[400] text-[14px] my-2">
                  Cardiologist
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-3 justify-center">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <div className="flex flex-wrap gap-2 justify-center my-5">
            {options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-3xl cursor-pointer transition duration-200 hover:bg-[#1D2939] hover:text-white ${
                  selectedOptions.includes(option)
                    ? "bg-[#1D2939] text-white"
                    : "bg-[#E4E7EC]"
                }`}
                onClick={() => handleOptionChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div>
            <Input placeholder="Add feedback" className="p-3 h-[51px]" />
            <div className="flex gap-3 my-3 justify-center">
              <button className="w-[210px] p-3 bg-[#F2F4F7] rounded-3xl text-black">
                Cancel
              </button>
              <button className="w-[210px] p-3 bg-[#1570EF] rounded-3xl text-white">
                Submit
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
