const today = new Date();

export default function isToday(date: string): boolean {
  const day = new Date(date);
  return (
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear()
  );
}
