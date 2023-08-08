import { useState } from "react";
import IOpeningHours from "types/IOpeningHours";
import { FaRegClock } from "react-icons/fa";
import { days } from "utils/dateTime";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const HoursOverview = ({ openingHours }: { openingHours: IOpeningHours[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const date = new Date();

  const dayOfWeek = date.getDay();

  const time = `${date.getHours()}:${date.getMinutes()}`;

  const isOpenNow = openingHours.some(
    (hour) =>
      hour.dayOfWeek === dayOfWeek &&
      hour.from !== "--:--" &&
      hour.to !== "--:--" &&
      hour.from <= time &&
      hour.to >= time
  );

  const todayTime = openingHours.find(
    (hour) => hour.dayOfWeek === dayOfWeek && hour.from !== "--:--"
  );

  let nextDayOpen;

  if (todayTime && todayTime?.from > time) {
    nextDayOpen = todayTime;
  } else {
    for (let i = 1; i < 7; i++) {
      const nextDay = (dayOfWeek + i) % 7;

      const nextDayTime = openingHours.find(
        (hour) => hour.dayOfWeek === nextDay && hour.from !== "--:--"
      );

      if (nextDayTime) {
        nextDayOpen = nextDayTime;
        break;
      }
    }
  }

  return (
    <div
      className="flex flex-col gap-2 py-2 cursor-pointer"
      onClick={onClickHandler}
    >
      <div className="flex items-center text-gray-500">
        <FaRegClock className="inline-block mr-4 text-xl text-blue-500" />

        {isOpenNow && (
          <span className="mr-2 font-semibold">
            <span className="mr-1 text-green-500">Open</span>
            {todayTime && <span>⋅ Closing: {todayTime.to}</span>}
          </span>
        )}

        {!isOpenNow && (
          <span className="mr-2 font-semibold">
            <span className="mr-1 text-red-500">Closed</span>
            {nextDayOpen && (
              <span>
                ⋅ Opening {days[nextDayOpen.dayOfWeek]} {nextDayOpen.from}
              </span>
            )}
          </span>
        )}

        {isOpen ? (
          <MdExpandLess className="inline-block text-xl" />
        ) : (
          <MdExpandMore className="inline-block text-xl" />
        )}
      </div>

      <div
        className={`${
          isOpen ? "" : "hidden"
        } flex flex-col gap-2 overflow-hidden text-sm
        font-semibold text-gray-500 transition-all`}
      >
        {openingHours.map((hour) => {
          return (
            <div
              className="flex items-center cursor-pointer"
              key={hour.dayOfWeek}
            >
              <FaRegClock className="inline-block mr-4 text-xl opacity-0" />

              <span className="w-1/4">{days[hour.dayOfWeek]}</span>

              {hour.from !== "--:--" && (
                <span className="ml-4">
                  {hour.from} - {hour.to}
                </span>
              )}

              {hour.from === "--:--" && <span className="ml-4">Closed</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoursOverview;
