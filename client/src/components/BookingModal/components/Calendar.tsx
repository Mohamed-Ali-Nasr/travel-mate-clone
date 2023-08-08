import { useAppSelector } from "hooks/redux-hooks";
import { getMonth, getMonthName } from "utils/dateTime";
import DaySelector from "./DaySelector";
import HourSelector from "./HourSelector";
import { selectBook } from "store/book/bookSlice";

const Calendar = () => {
  const { freeSlots } = useAppSelector(selectBook);

  const distinctMonths: string[] = freeSlots
    .reduce((acc: number[], curr) => {
      const month = getMonth(curr);

      if (!acc.find((item) => item === month)) acc.push(month);
      return acc;
    }, [])
    .map((month) => getMonthName(month));

  const monthsString = distinctMonths.join(" - ");

  return (
    <div className="mt-4">
      <h1 className=" flex justify-center w-full text-2xl font-bold text-gray-800">
        {monthsString} 2023
      </h1>

      <DaySelector />

      <div className="w-full mt-4 border-b"></div>

      <HourSelector />

      <div className="w-full mt-4 border-b"></div>
    </div>
  );
};

export default Calendar;
