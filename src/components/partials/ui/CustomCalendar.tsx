"use client"
import { useCalendar } from "@h6s/calendar";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomCalendar() {
  const {body, view } = useCalendar();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM, yyyy");
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    view.showWeekView()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  return (
    <div>
      <p className="text-[16px] text-[#1D2939] font-[500]">
        Choose Day, {formattedDate}
      </p>
      <div className="mt-5">
        {/* {firstWeek.value.map((key, value)=>{
            const formattedDayOfWeek = format(value, "EEE");
            const formattedDayOfMonth = format(value, "dd");
            const currentDateWithoutTime = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            );
            const targetDateWithoutTime = new Date(
              value.getFullYear(),
              value.getMonth(),
              value.getDate()
            );

            const hasDatePassed =
              currentDateWithoutTime > targetDateWithoutTime;
            return (

            )
        })} */}

        {body.value.map(({ key, value: days }) => (
          <div key={key} className=" gap-3  w-full flex flex-wrap">
            {days.map(({ key, value }) => {
              const formattedDayOfWeek = format(value, "EEE");
              const formattedDayOfMonth = format(value, "dd");
              const currentDateWithoutTime = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              );
              const targetDateWithoutTime = new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate()
              );

              const hasDatePassed =
                currentDateWithoutTime > targetDateWithoutTime;

              return (
                <div
                  key={key}
                  onClick={()=> setSelectedDate(value)}
                  className={
                    hasDatePassed
                      ? "hidden"
                      : `border w-[77px] h-[72px] text-center flex  flex-col justify-center mb-3 rounded-md cursor-pointer ${format(selectedDate, "MMMM do, yyyy") === format(value, "MMMM do, yyyy") ? "text-[#1570EF] border border-[#1570EF]":"text-[#18181B]"}`
                  }
                >
                  {format(currentDate, "MMMM do, yyyy") ===
                  format(value, "MMMM do, yyyy") ? (
                    <p className={`text-[16px] font-[500] ${format(selectedDate, "MMMM do, yyyy") === format(value, "MMMM do, yyyy") ? "text-[#1570EF] ":"text-[#18181B]"}`}>
                      {" "}
                      Today
                    </p>
                  ) : (
                    <div>
                      <p className={`text-[12px] font-[400] ${format(selectedDate, "MMMM do, yyyy") === format(value, "MMMM do, yyyy") ? "text-[#1570EF] ":"text-[#18181B]"}`}>
                        {" "}
                        {formattedDayOfWeek}
                      </p>
                      <p className={`text-[20px] font-[700] ${format(selectedDate, "MMMM do, yyyy") === format(value, "MMMM do, yyyy") ? "text-[#1570EF] ":"text-[#18181B]"}`}>
                        {" "}
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
      <div className="flex justify-end">
      <button
      className="font-[500] text-[14px] text-[#1570EF] flex items-center gap-1"
        type="button"
        onClick={(e) => {
          e.preventDefault()
          if (view.isMonthView) {
            view.showWeekView();
          } else if (view.isWeekView) {
            view.showMonthView();
          }

          console.log("rannnnnn");
        }}
      >
        {view.isWeekView ? "Show full month": "Show current week"}
        {view.isWeekView ? (<ChevronDown/>): (<ChevronUp/>)}
      </button>
      </div>
      
    </div>
  );
}
