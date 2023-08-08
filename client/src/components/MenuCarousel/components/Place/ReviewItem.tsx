import UserAvatar from "helpers/UserAvatar";
import Rating from "../Rating";

interface ReviewProps {
  image?: string;
  name: string;
  rating: number;
  comment?: string;
}

const ReviewItem = ({ image, name, rating, comment }: ReviewProps) => {
  return (
    <div className="py-2 border-b">
      <div className="flex w-full">
        <UserAvatar name={name} image={image} />
        <div className="pl-2 font-semibold text-gray-600">
          <div>{name}</div>
          <Rating rating={rating} />
        </div>
      </div>

      {comment && (
        <div className="w-full px-1 pt-2 text-sm font-semibold text-gray-600">
          {comment}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
