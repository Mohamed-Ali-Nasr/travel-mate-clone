import Option from "./Option";

interface DayProps {
  day: number;
  dayName: string;
  isNow: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const Day = ({
  day,
  dayName,
  isNow,
  isSelected,
  isDisabled,
  onClick,
}: DayProps) => {
  const textColor = isNow && !isSelected ? "!text-blue-600" : "";

  return (
    <Option
      onClick={onClick}
      isSelected={isSelected}
      isDisabled={isDisabled}
      className="w-16 h-20"
    >
      <span className={`${textColor} text-sm`}>{dayName}</span>
      <span className={`${textColor} mt-0.5`}>{day}</span>
    </Option>
  );
};

export default Day;
