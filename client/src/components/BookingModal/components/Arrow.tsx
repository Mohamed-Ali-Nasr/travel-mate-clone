import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

const Arrow = ({ direction, onClick, className }: Props) => {
  const Icon = direction === "left" ? FaChevronLeft : FaChevronRight;

  return (
    <div
      className={`flex justify-center items-center w-16 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon className="text-gray-500" />
    </div>
  );
};

export default Arrow;
