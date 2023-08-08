import { IPlace } from "types/IPlace";
import Rating from "../Rating";
import { useSearchParams } from "react-router-dom";
import Services from "./Services";
import Reviews from "./Reviews";
import Overview from "./Overview";
import { useMemo } from "react";
import Menu from "./Menu";
import Img from "helpers/Img";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { deletePlace } from "store/places/placesActions";
import CarouselButton from "./CarouselButton";
import { selectAuth } from "store/auth/authSlice";
import { selectPlaces } from "store/places/placesSlice";
import { businessActions } from "store/business/businessSlice";

interface Props {
  place: IPlace;
}

const Place = ({ place }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);

  const { focused } = useAppSelector(selectPlaces);

  const ownerId = focused?.createdBy.id;

  const isOwner = user?.id === ownerId;

  const [searchParams, setSearchParams] = useSearchParams();

  const isMenuAvailable =
    place.menu?.length > 0 || place.createdBy.id === user?.id;

  const areServicesAvailable =
    place.services?.length > 0 || place.createdBy.id === user?.id;

  const activePage = useMemo(() => {
    const page = searchParams.get("details");

    if (!page) return "overview";

    if (page === "menu" && isMenuAvailable) return "menu";

    if (page === "services" && areServicesAvailable) return "services";

    if (page === "reviews") return "reviews";

    return "overview";
  }, [searchParams, isMenuAvailable, areServicesAvailable]);

  const getOnClickPageHandler = (pageName: string) => () => {
    setSearchParams((params) => {
      const clickedPage = Object.fromEntries(params.entries());
      return { ...clickedPage, details: pageName };
    });
  };

  const isActive = (pageName: string) => {
    return pageName === activePage;
  };

  const onDeletePlaceHandler = () => {
    if (!place.id || !isOwner) return;

    const confirmed = window.confirm("Are you sure you want to delete place?");

    if (!confirmed) return;

    dispatch(deletePlace(place.id));
  };

  const onEditHandler = () => {
    if (!place.id || !isOwner) return;

    dispatch(businessActions.setEditing(place));
  };

  return (
    <div>
      <Img
        src={`/${place.thumbnail}`}
        className="h-[200px] w-full object-cover"
      />

      <div className=" px-5 py-3">
        <h1 className="pb-1 text-2xl font-semibold text-gray-600">
          {place.name}
        </h1>

        {isOwner && (
          <div className="flex items-center justify-between my-2">
            <button
              className="text-base font-semibold bg-blue-600 text-white py-1.5 px-3 rounded-md w-fit cursor-pointer"
              onClick={onEditHandler}
            >
              Edit service
            </button>

            <button
              className="px-3 py-1.5 rounded-md text-base w-fit font-semibold text-white bg-red-600 cursor-pointer"
              onClick={onDeletePlaceHandler}
            >
              Delete service
            </button>
          </div>
        )}

        {!!place.rating && place.reviews.length > 0 && (
          <Rating
            rating={place.rating}
            numberOfReviews={place.reviews.length}
          />
        )}

        {!place.rating && <div className="text-gray-400">No reviews yet!</div>}

        <p className="mb-2 font-semibold text-gray-500">{place.description}</p>

        <div className="justify-evenly flex w-full border-b">
          <CarouselButton
            text={"Overview"}
            onClick={getOnClickPageHandler("overview")}
            active={isActive("overview")}
          />
          {isMenuAvailable && (
            <CarouselButton
              text={"Menu"}
              onClick={getOnClickPageHandler("menu")}
              active={isActive("menu")}
            />
          )}
          {areServicesAvailable && (
            <CarouselButton
              text={"Services"}
              onClick={getOnClickPageHandler("services")}
              active={isActive("services")}
            />
          )}
          <CarouselButton
            text={"Reviews"}
            onClick={getOnClickPageHandler("reviews")}
            active={isActive("reviews")}
          />
        </div>

        {activePage === "menu" && <Menu />}
        {activePage === "services" && <Services />}
        {activePage === "reviews" && <Reviews />}
        {activePage === "overview" && <Overview />}
      </div>
    </div>
  );
};

export default Place;
