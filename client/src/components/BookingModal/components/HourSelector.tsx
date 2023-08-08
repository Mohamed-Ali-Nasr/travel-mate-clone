import { bookActions, selectBook } from "store/book/bookSlice";
import Row from "./Row";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getDateString, getTime } from "utils/dateTime";
import Hour from "./Hour";

const HourSelector = () => {
  const { freeSlots, selectedDate, selectedTime } = useAppSelector(selectBook);

  const dispatch = useAppDispatch();

  const availableHours = freeSlots.reduce((acc: string[], curr) => {
    const date = getDateString(curr);

    if (date !== selectedDate) return acc;

    const hour = getTime(curr);

    acc.push(hour);
    return acc;
  }, []);

  const getOnHourClickHandler = (hour: string) => () =>
    dispatch(bookActions.setTime(hour));

  return (
    <>
      {availableHours?.length > 0 && (
        <Row>
          {availableHours.map((hour) => (
            <Hour
              key={`${hour}`}
              hour={hour}
              isNow={false}
              isSelected={selectedTime === hour}
              isDisabled={false}
              onClick={getOnHourClickHandler(hour)}
            />
          ))}
        </Row>
      )}

      {availableHours?.length === 0 && (
        <div className="mx-8 my-4 font-semibold text-gray-400">
          Please select a date to continue
        </div>
      )}
    </>
  );
};

export default HourSelector;
