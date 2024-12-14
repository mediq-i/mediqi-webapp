export default function getFormattedDate(date: Date | string | undefined) {
  const formattedDate = Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date!));

  return formattedDate;
}
