import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Row from "./Row";
import { getDateString, getDay, getDayName } from "utils/dateTime";
import { bookActions, selectBook } from "store/book/bookSlice";
import isToday from "utils/isToday";
import Day from "./Day";

const DaySelector = () => {
  const { freeSlots, selectedDate } = useAppSelector(selectBook);

  const dispatch = useAppDispatch();

  const distinctDates: string[] = freeSlots.reduce((acc: string[], curr) => {
    const date = getDateString(curr);

    if (!acc.find((item) => item === date)) acc.push(date);
    return acc;
  }, []);

  const getOnDateClickHandler = (date: string) => () =>
    dispatch(bookActions.setDate(date));

  return (
    <Row>
      {distinctDates.map((date) => {
        const day = getDay(`${date}T00:00:00.000Z`);

        const dayName = getDayName(`${date}T00:00:00.000Z`);

        return (
          <Day
            key={`${date}`}
            day={day}
            dayName={dayName}
            isNow={isToday(date)}
            isSelected={selectedDate === date}
            isDisabled={false}
            onClick={getOnDateClickHandler(date)}
          />
        );
      })}
    </Row>
  );
};

export default DaySelector;
