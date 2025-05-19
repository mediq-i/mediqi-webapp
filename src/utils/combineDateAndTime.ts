// Add this function to your component or utils fil
const combineDateAndTime = (date: Date | undefined, time: string): string => {
  if (!date || !time) return "";

  // Get the date parts
  const [month, day, year] = date.toLocaleDateString().split("/");

  // Convert time to 24-hour format
  //eslint-disable-next-line
  let [hours, minutes] = time.split(":");
  const period = time.slice(-2); // Get AM/PM

  // Convert to 24-hour format if PM
  if (period.toLowerCase() === "pm" && hours !== "12") {
    hours = String(parseInt(hours) + 12);
  }
  // Handle 12 AM case
  if (period.toLowerCase() === "am" && hours === "12") {
    hours = "00";
  }

  // Create new Date object with combined date and time
  const combinedDate = new Date(
    parseInt(year),
    parseInt(month) - 1, // months are 0-based
    parseInt(day),
    parseInt(hours),
    parseInt(minutes.replace(/[^\d]/g, "")) // remove any non-digit characters
  );

  return combinedDate.toISOString();
};

export default combineDateAndTime;
