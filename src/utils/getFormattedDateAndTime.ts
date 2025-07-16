export default function getFormattedDateAndTime(
  date: Date | string | undefined
) {
  if (!date) return "";

  const formattedDate = Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    minute: "numeric",
    hour: "numeric",
    hour12: true,
  }).format(new Date(date));

  return formattedDate;
}
