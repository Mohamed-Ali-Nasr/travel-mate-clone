import IOpeningHours from "types/IOpeningHours";
import { days, isTimeGreater } from "utils/dateTime";
import Selector from "./Selector";

interface Props {
  value: IOpeningHours;
  onChange: (value: IOpeningHours) => void;
}

const TimeSelector = ({ value, onChange }: Props) => {
  const { dayOfWeek, from, to } = value;

  const valid = (from == "--:--" && to === "--:--") || isTimeGreater(to, from);

  const day = days[value.dayOfWeek];

  const setFrom = (value: string) => {
    if (value === "--:--") {
      onChange({ dayOfWeek, to: value, from: value });
    } else
      onChange({ dayOfWeek, to: to !== "--:--" ? to : "17:00", from: value });
  };

  const setTo = (value: string) => {
    if (value === "--:--") {
      onChange({ dayOfWeek, to: value, from: value });
    } else
      onChange({
        dayOfWeek,
        from: from !== "--:--" ? from : "09:00",
        to: value,
      });
  };

  return (
    <div className={`flex items-center ${dayOfWeek === 0 && "order-last"}`}>
      <span className="w-1/4">{day}</span>

      <div className="flex w-3/4">
        <Selector value={from} onChange={setFrom} valid={valid} />
        <span className="mx-2">to</span>
        <Selector value={to} onChange={setTo} valid={valid} />
      </div>
    </div>
  );
};

export default TimeSelector;
