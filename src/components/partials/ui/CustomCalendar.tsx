"use client";
import { DaySchedule } from "@/adapters/types/ServiceProviderTypes";
import { getFormattedDate } from "@/utils";
import { useCalendar } from "@h6s/calendar";
import {
  format,
  addMonths,
  endOfMonth,
  differenceInDays,
  isSameMonth,
} from "date-fns";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

interface CalendarSectionProps {
  title: string;
  body: {
    value: {
      key: string;
      value: ({
        value: Date;
      } & {
        date: number;
        isCurrentMonth: boolean;
        isCurrentDate: boolean;
        isWeekend: boolean;
      } & {
        key: string;
      })[];
    }[];
  };
  currentDate: Date;
  isCurrentMonth: boolean;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

interface CalendarDay {
  key: string;
  value: Date;
}

interface CalendarWeek {
  key: string;
  value: CalendarDay[];
}

interface CalendarBody {
  value: CalendarWeek[];
}

// Add this interface for working hours
interface WorkingHours {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

interface CustomCalendarProps {
  selectDate?: Dispatch<SetStateAction<Date | undefined>>;
  workingHours: WorkingHours;
  onDateSelect: (date: Date) => void;
}

// Helper function to process calendar data
const processCalendarData = (body: CalendarBody) => {
  return {
    weeks: body.value.map((week) => ({
      key: week.key,
      days: week.value,
    })),
    allDays: body.value.flatMap((week) => week.value),
  };
};

// Helper function to check if a day is available
const isDayAvailable = (
  date: Date,
  workingHours: WorkingHours | null
): boolean => {
  if (!workingHours) return false;

  const dayName = format(date, "EEEE").toLowerCase() as keyof WorkingHours;
  const daySchedule = workingHours[dayName];

  return daySchedule?.isAvailable ?? false;
};

function CalendarSection({
  title,
  body,
  currentDate,
  isCurrentMonth,
  selectedDate,
  setSelectedDate,
  workingHours,
}: CalendarSectionProps & { workingHours: WorkingHours | null }) {
  const { weeks } = processCalendarData(body);

  return (
    <div className="mb-8">
      <h3 className="text-[16px] text-[#1D2939] font-[500] mb-4">{title}</h3>
      <div className={`w-full  ${!isCurrentMonth && "space-y-3"}`}>
        {weeks.map((week) => (
          <div key={week.key} className="grid grid-cols-7 gap-3 w-full">
            {week.days.map(({ key, value: date }) => {
              const formattedDayOfWeek = format(date, "EEE");
              const formattedDayOfMonth = format(date, "dd");
              const currentDateWithoutTime = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              );
              const targetDateWithoutTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );

              const hasDatePassed =
                currentDateWithoutTime > targetDateWithoutTime;
              const isInCurrentMonth = isSameMonth(date, currentDate);
              const isInNextMonth = isSameMonth(
                date,
                addMonths(currentDate, 1)
              );

              const isAvailable = isDayAvailable(date, workingHours);
              const isDisabled = hasDatePassed || !isAvailable;

              if (
                (isCurrentMonth && (!isInCurrentMonth || hasDatePassed)) ||
                (!isCurrentMonth && !isInNextMonth)
              ) {
                return null;
              }

              return (
                <div
                  key={key}
                  onClick={() => !isDisabled && setSelectedDate(date)}
                  className={`border h-[72px] text-center flex flex-col justify-center rounded-md 
                    ${
                      isDisabled
                        ? "bg-gray-100 cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                    ${
                      format(selectedDate, "yyyy-MM-dd") ===
                      format(date, "yyyy-MM-dd")
                        ? "text-[#1570EF] border-[#1570EF]"
                        : "text-[#18181B]"
                    }`}
                >
                  {format(currentDate, "yyyy-MM-dd") ===
                  format(date, "yyyy-MM-dd") ? (
                    <p className="text-[16px] font-[500] text-[#1570EF]">
                      Today
                    </p>
                  ) : (
                    <div>
                      <p className="text-[12px] font-[400]">
                        {formattedDayOfWeek}
                      </p>
                      <p className="text-[20px] font-[700]">
                        {formattedDayOfMonth}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CustomCalendar({
  selectDate,
  workingHours,
  //eslint-disable-next-line
  onDateSelect,
}: CustomCalendarProps) {
  const currentDate = new Date();
  const isCloseToMonthEnd =
    differenceInDays(endOfMonth(currentDate), currentDate) < 7;

  // Create calendar instances for current and next month
  const currentMonthCalendar = useCalendar({ defaultDate: currentDate });
  const nextMonthCalendar = useCalendar({
    defaultDate: addMonths(currentDate, 1),
  });

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const initialSetupDone = useRef(false);

  // Move state update to useEffect
  useEffect(() => {
    if (selectDate) {
      selectDate(selectedDate);
    }
  }, [selectedDate, selectDate]);

  useEffect(() => {
    if (!initialSetupDone.current) {
      currentMonthCalendar.view.showMonthView();
      nextMonthCalendar.view.showMonthView();
      initialSetupDone.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[18px] font-[600] text-[#1D2939]">
          Choose Day{" "}
          <span className="text-[14px] ml-2 text-gray-500">
            ({getFormattedDate(selectedDate)})
          </span>
        </h2>
        {/* {isCloseToMonthEnd && (
          <button
            className="font-[500] text-[14px] text-[#1570EF] flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              setShowFullMonth(!showFullMonth);
              // if (currentMonthCalendar.view.isMonthView) {
              //   currentMonthCalendar.view.showWeekView();
              // } else if (currentMonthCalendar.view.isWeekView) {
              //   currentMonthCalendar.view.showMonthView();
              // }
            }}
          >
            {currentMonthCalendar.view.isWeekView
              ? "Show full month"
              : "Show current week"}
            {currentMonthCalendar.view.isWeekView ? (
              <ChevronDown />
            ) : (
              <ChevronUp />
            )}
          </button>
        )} */}
      </div>

      {isCloseToMonthEnd ? (
        <>
          <CalendarSection
            title={format(currentDate, "MMMM")}
            body={currentMonthCalendar.body}
            currentDate={currentDate}
            isCurrentMonth={true}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            workingHours={workingHours}
          />
          <CalendarSection
            title={format(addMonths(currentDate, 1), "MMMM")}
            body={nextMonthCalendar.body}
            currentDate={currentDate}
            isCurrentMonth={false}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            workingHours={workingHours}
          />
        </>
      ) : (
        <CalendarSection
          title={format(currentDate, "MMMM, yyyy")}
          body={currentMonthCalendar.body}
          currentDate={currentDate}
          isCurrentMonth={true}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          workingHours={workingHours}
        />
      )}
    </div>
  );
}
