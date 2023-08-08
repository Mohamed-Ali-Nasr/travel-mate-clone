interface ButtonProps {
  text: string;
  onClick: () => void;
  active?: boolean;
}
const CarouselButton = ({ text, onClick, active }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`box-border px-4 py-3 font-semibold ${
        active
          ? "border-b-2 border-blue-500 text-blue-500 hover:bg-blue-100"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {text}
    </button>
  );
};

export default CarouselButton;
