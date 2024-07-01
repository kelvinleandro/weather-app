export function getWeekday(dateString: string): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return daysOfWeek[date.getUTCDay()];
}

export function isToday(dateString: string): boolean {
  const inputDate = new Date(dateString);
  const today = new Date();

  return (
    inputDate.getUTCFullYear() === today.getUTCFullYear() &&
    inputDate.getUTCMonth() === today.getUTCMonth() &&
    inputDate.getUTCDate() === today.getUTCDate()
  );
}
