import Img from "helpers/Img";
import { getMonthName, getTime } from "utils/dateTime";
import { Link } from "react-router-dom";

interface ItemProps {
  id: string;
  title: string;
  address?: string;
  name: string;
  image?: string;
  date?: string;
  selected: boolean;
  onClick: () => void;
  onCancel: () => void;
  bookAgain?: boolean;
}

const Item = ({
  id,
  title,
  address,
  name,
  image,
  date,
  onClick,
  onCancel,
  bookAgain = false,
}: ItemProps) => {
  const dateObj = date ? new Date(date) : undefined;

  const isDone = dateObj ? dateObj.getTime() < Date.now() : false;

  const onCancelClickHandler = () => onCancel();

  return (
    <div
      className="box-border flex m-2 border rounded-lg shadow"
      onClick={onClick}
    >
      <div className="flex-1 px-4 py-2">
        {isDone && (
          <div className="rounded-3xl inline-block px-2 text-sm font-semibold text-gray-600 bg-gray-200">
            Ended
          </div>
        )}

        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

        {address && (
          <h6 className="text-sm font-semibold text-gray-400">{address}</h6>
        )}

        <div className="flex flex-row items-center mt-2">
          {image && (
            <Img
              src={"/" + image}
              alt={name}
              className="w-5 h-5 mr-2 rounded-full"
            />
          )}

          <h3 className="font-semibold text-gray-600">{name}</h3>
        </div>

        <div className="flex mt-2 mb-1">
          {!isDone && (
            <button
              className="rounded bg-red-500 px-2 py-0.5 text-sm font-semibold text-white"
              onClick={onCancelClickHandler}
            >
              Cancel
            </button>
          )}

          {isDone && bookAgain && (
            <Link
              className="rounded bg-blue-500 px-2 py-0.5 text-sm font-semibold text-white"
              to={`/place/${id}?details=services`}
            >
              Book again
            </Link>
          )}
        </div>
      </div>

      {dateObj && (
        <>
          <div className="flex-grow-0 flex-shrink-0 my-4 border-l"></div>
          <div className="flex flex-col items-center justify-center flex-none w-20">
            <div className="text-sm text-gray-600">
              {getMonthName(dateObj.getMonth() + 1)}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {dateObj.getDate()}
            </div>
            <div className="text-sm text-gray-600">{getTime(date!)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
