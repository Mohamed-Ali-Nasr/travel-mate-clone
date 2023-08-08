import Option from "./Option";

interface HourProps {
  hour: string;
  isNow: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const Hour = ({ hour, isNow, isSelected, isDisabled, onClick }: HourProps) => {
  const textColor = isNow && !isSelected ? "!text-blue-600" : "";

  return (
    <Option
      onClick={onClick}
      isSelected={isSelected}
      isDisabled={isDisabled}
      className="w-16 h-8"
    >
      <span className={`${textColor} text-sm`}>{hour}</span>
    </Option>
  );
};

export default Hour;
