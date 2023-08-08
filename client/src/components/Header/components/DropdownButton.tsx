type Props = {
  onClick?: () => void;
  text: string;
};

const DropdownButton = ({ text, onClick }: Props) => {
  const onClickHandler = () => onClick && onClick();

  return (
    <li
      onClick={onClickHandler}
      className="text-sm font-semibold text-gray-700"
    >
      <a href="#" className="hover:bg-gray-100 block px-4 py-2">
        {text}
      </a>
    </li>
  );
};

export default DropdownButton;
