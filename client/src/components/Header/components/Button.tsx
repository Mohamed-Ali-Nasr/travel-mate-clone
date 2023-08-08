interface Props {
  onClick: () => void;
  text: string;
  notifications?: number;
}

const Button = ({ onClick, text, notifications }: Props) => {
  const number = notifications ? notifications : 0;

  return (
    <li className="relative cursor-pointer" onClick={onClick}>
      {number > 0 && (
        <span className="-right-1 absolute top-0 flex items-center justify-center w-4 h-4 text-sm font-semibold text-white bg-green-600 rounded-full">
          {number}
        </span>
      )}
      <div className="px-2 py-1 font-semibold text-white">{text}</div>
    </li>
  );
};

export default Button;
