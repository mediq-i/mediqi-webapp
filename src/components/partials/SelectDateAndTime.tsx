"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import CustomCalendar from "../partials/ui/CustomCalendar";
import Image from "next/image";
import { Check } from "lucide-react";
import { format, parse } from "date-fns";
import {
  DaySchedule,
  ServiceProviderDetails,
} from "@/adapters/types/ServiceProviderTypes";
import { Skeleton } from "@/components/ui/skeleton";

interface WorkingHours {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

interface SelectDateAndTimeProps {
  selectDate?: Dispatch<SetStateAction<Date | undefined>>;
  selectTime?: Dispatch<SetStateAction<string | undefined>>;
  provider?: ServiceProviderDetails;
  isLoading?: boolean;
}

function SelectDateAndTime({
  selectDate,
  selectTime,
  provider,
  isLoading,
}: SelectDateAndTimeProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<{
    morning: string[];
    afternoon: string[];
    night: string[];
  }>({
    morning: [],
    afternoon: [],
    night: [],
  });

  // Move useEffect hooks to the top
  useEffect(() => {
    if (selectDate) {
      selectDate(selectedDate);
    }
  }, [selectedDate, selectDate]);

  useEffect(() => {
    if (selectTime) {
      selectTime(selectedTime);
    }
  }, [selectedTime, selectTime]);

  // Function to categorize time slots
  const categorizeTimeSlots = (slots: { start: string; end: string }[]) => {
    const categorized = {
      morning: [] as string[],
      afternoon: [] as string[],
      night: [] as string[],
    };

    slots.forEach(({ start }) => {
      const hour = parseInt(start.split(":")[0]);
      const formattedTime = format(parse(start, "HH:mm", new Date()), "h:mm a");

      if (hour >= 5 && hour < 12) {
        categorized.morning.push(formattedTime);
      } else if (hour >= 12 && hour < 17) {
        categorized.afternoon.push(formattedTime);
      } else {
        categorized.night.push(formattedTime);
      }
    });

    return categorized;
  };

  // Update available slots when date changes
  useEffect(() => {
    if (selectedDate && provider?.data.working_hours) {
      const dayName = format(
        selectedDate,
        "EEEE"
      ).toLowerCase() as keyof WorkingHours;
      const daySchedule = provider.data.working_hours[dayName];

      if (daySchedule?.isAvailable && daySchedule.slots) {
        setAvailableSlots(categorizeTimeSlots(daySchedule.slots));
      } else {
        setAvailableSlots({ morning: [], afternoon: [], night: [] });
      }
    }
  }, [selectedDate, provider]);

  if (isLoading) {
    return (
      <div className="my-4 md:my-8 pb-5 space-y-4 md:space-y-6">
        {/* Calendar Loading State */}
        <div className="space-y-4">
          <Skeleton className="h-6 md:h-8 w-32 md:w-48" />
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {[...Array(14)].map((_, i) => (
              <Skeleton key={i} className="h-[50px] md:h-[72px] w-full" />
            ))}
          </div>
        </div>

        {/* Time Slots Loading State */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded-full" />
              <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
            </div>
            <div className="flex gap-2 md:gap-3">
              {[1, 2, 3].map((slot) => (
                <Skeleton
                  key={slot}
                  className="h-10 md:h-12 w-[100px] md:w-[150px] rounded-2xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="my-4 md:my-8 pb-5 flex items-center justify-center text-gray-500 text-sm md:text-base">
        No schedule information available
      </div>
    );
  }

  return (
    <div className="my-4 md:my-8 pb-5">
      <div className="overflow-x-auto">
        <CustomCalendar
          selectDate={setSelectedDate}
          workingHours={provider.data.working_hours}
          onDateSelect={(date) => setSelectedDate(date)}
        />
      </div>

      <div className="space-y-4 md:space-y-6">
        {Object.entries({
          Morning: {
            slots: availableSlots.morning,
            icon: "/morning.svg",
            timeRange: "5:00 AM - 11:59 AM",
          },
          Afternoon: {
            slots: availableSlots.afternoon,
            icon: "/afternoon.svg",
            timeRange: "12:00 PM - 4:59 PM",
          },
          Night: {
            slots: availableSlots.night,
            icon: "/night.svg",
            timeRange: "5:00 PM - 11:59 PM",
          },
        }).map(
          ([title, { slots, icon, timeRange }]) =>
            slots.length > 0 && (
              <TimeSection
                key={title}
                title={title}
                subtitle={timeRange}
                icon={icon}
                slots={slots}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
            )
        )}

        {!availableSlots.morning.length &&
          !availableSlots.afternoon.length &&
          !availableSlots.night.length && (
            <div className="text-center text-gray-500 py-4 text-sm md:text-base">
              No available time slots for selected date
            </div>
          )}
      </div>
    </div>
  );
}

// Updated TimeSection component
function TimeSection({
  title,
  subtitle,
  icon,
  slots,
  selectedTime,
  onTimeSelect,
}: {
  title: string;
  subtitle: string;
  icon: string;
  slots: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}) {
  return (
    <div className="mb-4 md:mb-5">
      <div className="flex items-center gap-2 md:gap-3">
        <Image
          src={icon}
          alt=""
          height={20}
          width={20}
          className="md:h-6 md:w-6"
        />
        <div>
          <p className="font-[500] text-[14px] md:text-[16px]">{title}</p>
          <p className="text-xs md:text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="mt-3 md:mt-5 flex gap-2 md:gap-3 flex-wrap">
        {slots.map((time, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 w-[100px] md:w-[150px] border rounded-2xl p-2 md:p-3 justify-center cursor-pointer
              ${
                selectedTime === time ? "border-[#2E90FA] text-[#2E90FA]" : ""
              }`}
            onClick={() => onTimeSelect(time)}
          >
            <label className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {time}
            </label>
            <Check
              className={`w-3 h-3 md:w-4 md:h-4 text-[#2E90FA] ${
                selectedTime === time ? "block" : "hidden"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectDateAndTime;
