import Img from "helpers/Img";
import Rating from "./Rating";

interface Props {
  onClick: () => void;
  name: string;
  description?: string;
  thumbnail: string;
  rating?: number;
  numberOfReviews: number;
}

const Result = ({
  onClick,
  name,
  description,
  thumbnail,
  rating,
  numberOfReviews,
}: Props) => {
  return (
    <div
      className="hover:bg-gray-50 flex justify-between px-4 py-3 text-gray-600 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div>
        <div className="text-lg font-semibold text-gray-800">{name}</div>
        {!!rating && numberOfReviews > 0 && (
          <Rating rating={rating} numberOfReviews={numberOfReviews} />
        )}

        {numberOfReviews === 0 && (
          <div className="text-gray-400">No reviews yet!</div>
        )}

        {description && (
          <div className="text-gray-400 font-semibold text-sm mt-0.5">
            {description}
          </div>
        )}
      </div>
      <Img
        src={`/${thumbnail}`}
        alt=""
        className="rounded-xl object-cover w-24 h-24"
      />
    </div>
  );
};

export default Result;
