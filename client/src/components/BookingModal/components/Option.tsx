interface OptionProps {
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Option = ({
  isSelected,
  isDisabled,
  onClick,
  children,
  className,
}: OptionProps) => {
  const textColor = isSelected ? "text-white" : "text-gray-500";

  const bgColor = isSelected ? "bg-blue-500" : "bg-white";

  const onClickHandler = () => {
    if (isDisabled) return;
    onClick();
  };

  return (
    <div
      className={`${className} ${bgColor} relative rounded-xl border text flex justify-center items-center w-16 h-20 cursor-pointer flex-shrink-0 flex-grow-0`}
      onClick={onClickHandler}
    >
      <div
        className={`${textColor} flex flex-col justify-center items-center font-semibold z-0`}
      >
        {children}
      </div>

      {isDisabled && (
        <div className="absolute w-full h-full bg-[#0000000a] rounded-xl !cursor-not-allowed z-10"></div>
      )}
    </div>
  );
};

export default Option;
