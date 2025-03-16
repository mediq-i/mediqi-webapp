"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import CustomCalendar from "../partials/ui/CustomCalendar";
import Image from "next/image";
import { Check } from "lucide-react";

const times = [
  {
    period: "Morning",
    times: ["9:00 AM", "10:00 AM", "11:00 AM"],
    img: "/morning.svg",
  },
  {
    period: "Afternoon",
    times: ["1:00 PM", "10:00 PM", "11:00 PM"],
    img: "/afternoon.svg",
  },
  {
    period: "Night",
    times: ["7:00 PM", "8:00 PM", "9:00 PM"],
    img: "/morning.svg",
  },
];
function SelectDateAndTime({selectDate}:{selectDate?: Dispatch<SetStateAction<Date | undefined>>}) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  if (selectDate) {
    selectDate(selectedDate)
  }
  
  return (
    <div className="my-8 pb-5">
      <CustomCalendar selectDate={setSelectedDate}/>
      <div className="">
        {times.map((time, index) => {
          return (
            <div className="mb-5" key={index}>
              <div className="flex items-center gap-3">
                <Image src={time.img} alt="" height={24} width={24} />
                <p className="font-[500] text-[16px]">{time.period}</p>
              </div>
              <div className="mt-5 flex gap-3">
                {time.times.map((time, index) => {
                  return (
                    <div
                      className={`flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center cursor-pointer ${
                        selectedTime === time &&
                        "border-[#2E90FA] text-[#2E90FA]"
                      }`}
                      key={index}
                      onClick={() => {
                        console.log("hmmmm", time)
                        setSelectedTime(time);
                      }}
                    >
                      <label
                        htmlFor="9"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {time}
                      </label>
                      
                      <Check className={`w-4 h-4 text-[#2E90FA] ${selectedTime === time ? "block":"hidden"}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectDateAndTime;
