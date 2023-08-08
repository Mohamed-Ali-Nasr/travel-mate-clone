import { useAppSelector } from "hooks/redux-hooks";
import MyReview from "./MyReview";
import ReviewItem from "./ReviewItem";
import { selectPlaces } from "store/places/placesSlice";
import { selectAuth } from "store/auth/authSlice";

const Reviews = () => {
  const { user } = useAppSelector(selectAuth);

  const { focused } = useAppSelector(selectPlaces);

  const reviews = focused?.reviews;

  const userId = user?.id;

  const otherReviews = reviews?.filter((review) => review.user.id !== userId);

  return (
    <div>
      {userId && <MyReview />}

      {!userId && (
        <div className="text-sm font-bold text-gray-400 cursor-pointer">
          Log in to leave a review
        </div>
      )}

      {otherReviews?.map((review) => (
        <ReviewItem
          image={review.user.profileImage}
          key={review.user.id}
          name={review.user.name}
          rating={review.rating}
          comment={review.comment}
        />
      ))}

      {!otherReviews && (
        <div className="w-full text-center text-gray-400">No reviews yet!</div>
      )}
    </div>
  );
};

export default Reviews;
