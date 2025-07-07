"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  //   addMonths,
  //   subMonths,
  getDay,
  getDate,
} from "date-fns";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthlyAvailability } from "@/adapters/types/ServiceProviderTypes";

interface MonthlyAvailabilityCalendarProps {
  selectDate?: Dispatch<SetStateAction<Date | undefined>>;
  monthlyAvailability: MonthlyAvailability | null;
  onDateSelect: (date: Date) => void;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthlyAvailabilityCalendar({
  selectDate,
  monthlyAvailability,
  onDateSelect,
}: MonthlyAvailabilityCalendarProps) {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Update parent component when selected date changes
  useEffect(() => {
    if (selectDate) {
      selectDate(selectedDate);
    }
    if (selectedDate) {
      onDateSelect(selectedDate);
    }
  }, [selectedDate, selectDate, onDateSelect]);

  // Check if a specific date is available based on monthly availability
  const isDateAvailable = (date: Date): boolean => {
    if (!monthlyAvailability) return false;

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
    const day = date.getDate();

    // Check if the date is in the current monthly availability data
    if (
      year === monthlyAvailability.year &&
      month === monthlyAvailability.month
    ) {
      const dayAvailability = monthlyAvailability.days[day];
      return dayAvailability?.isAvailable ?? false;
    }

    return false;
  };

  //   // Navigate to previous month
  //   const goToPreviousMonth = () => {
  //     setCurrentMonth(subMonths(currentMonth, 1));
  //   };

  //   // Navigate to next month
  //   const goToNextMonth = () => {
  //     setCurrentMonth(addMonths(currentMonth, 1));
  //   };

  // Generate calendar days for the current month
  const generateCalendarDays = (): (Date | null)[] => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = getDay(start);

    // Create array with empty slots for days before the first day of the month
    const calendarDays: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Add all days of the month
    days.forEach((day) => {
      calendarDays.push(day);
    });

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[18px] font-[600] text-[#1D2939]">
          Choose Day
          {selectedDate && (
            <span className="text-[14px] ml-2 text-gray-500">
              ({format(selectedDate, "MMM dd, yyyy")})
            </span>
          )}
        </h2>

        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button> */}

          <h3 className="text-[16px] font-[500] text-[#1D2939] min-w-[120px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h3>

          {/* <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button> */}
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-[12px] font-[500] text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {calendarDays.map((day, index) => {
          if (!day) {
            return (
              <div
                key={`empty-${index}`}
                className="h-[72px] border border-transparent"
              />
            );
          }

          const isToday = isSameDay(day, today);
          const isSelected = selectedDate
            ? isSameDay(day, selectedDate)
            : false;
          const isAvailable = isDateAvailable(day);
          const isPast =
            day <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isDisabled = isPast || !isAvailable;

          return (
            <div
              key={day.toISOString()}
              onClick={() => !isDisabled && setSelectedDate(day)}
              className={`
                h-[72px] border rounded-md text-center flex flex-col justify-center cursor-pointer transition-all
                ${
                  isDisabled
                    ? "bg-gray-100 cursor-not-allowed opacity-50"
                    : "hover:border-[#2E90FA] hover:bg-blue-50"
                }
                ${
                  isSelected
                    ? "border-[#2E90FA] bg-blue-50 text-[#2E90FA]"
                    : "border-gray-200"
                }
                ${
                  isToday && !isSelected
                    ? "border-[#1570EF] text-[#1570EF]"
                    : ""
                }
              `}
            >
              {isToday ? (
                <div>
                  <p className="text-[12px] font-[400] text-[#1570EF]">Today</p>
                  <p className="text-[20px] font-[700] text-[#1570EF]">
                    {getDate(day)}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[12px] font-[400] text-gray-500">
                    {format(day, "EEE")}
                  </p>
                  <p
                    className={`text-[20px] font-[700] ${
                      isSelected ? "text-[#2E90FA]" : "text-[#18181B]"
                    }`}
                  >
                    {getDate(day)}
                  </p>
                </div>
              )}

              {/* Availability indicator */}
              {isAvailable && !isPast && (
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}
