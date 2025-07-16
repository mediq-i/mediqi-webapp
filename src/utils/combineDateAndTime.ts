const combineDateAndTime = (date: string, time: string): string => {
  if (!date || !time) return "";

  // Parse the date (MM/DD/YYYY format)
  const [month, day, year] = date.split("/").map(Number);

  // Parse the time (H:MM AM/PM format)
  const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!timeMatch) {
    throw new Error("Invalid time format. Expected format: H:MM AM/PM");
  }

  const [, hours, minutes, period] = timeMatch;
  let hoursInt = parseInt(hours);
  const minutesInt = parseInt(minutes);

  // Convert to 24-hour format
  if (period.toLowerCase() === "pm" && hoursInt !== 12) {
    hoursInt += 12;
  } else if (period.toLowerCase() === "am" && hoursInt === 12) {
    hoursInt = 0;
  }

  // Create ISO string manually to avoid timezone conversion
  const isoString = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}T${String(hoursInt).padStart(2, "0")}:${String(
    minutesInt
  ).padStart(2, "0")}:00.000Z`;

  return isoString;
};

export default combineDateAndTime;
