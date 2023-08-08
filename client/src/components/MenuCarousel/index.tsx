import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import ResultsList from "./components/ResultsList";
import Carousel from "./components/Carousel";
import CarouselItem from "./components/CarouselItem";
import NaviButtons from "./components/NaviButtons";
import Place from "./components/Place/Place";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { placesActions, selectPlaces } from "store/places/placesSlice";
import { IPlace } from "types/IPlace";
import { useParams, useLocation } from "react-router-dom";
import { fetchPlace } from "store/places/placesActions";
import { useAppNavigate } from "hooks/use-navigate";

const Menu = () => {
  const dispatch = useAppDispatch();

  const { focused } = useAppSelector(selectPlaces);

  const navigate = useAppNavigate();

  const { placeId } = useParams();

  const { pathname } = useLocation();

  const [active, setActive] = useState(
    pathname.startsWith("/search") || pathname.startsWith("/place")
  );

  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    const path = `/${
      !active ? "" : focused ? `place/${focused.id}` : "search"
    }`;

    navigate(path, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, focused]);

  useEffect(() => {
    if (placeId) {
      dispatch(fetchPlace(placeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  const setFocused = (place: IPlace | null) => {
    dispatch(placesActions.setFocused(place));
  };

  const onClosePreviewHandler = () => {
    setFocused(null);
  };

  const onCloseResultsHandler = () => {
    onClosePreviewHandler();
    setActive(false);
  };

  useEffect(() => {
    if (focused) {
      setIsMapVisible(false);
      setActive(true);
    }
  }, [focused]);

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  const onSubmitFiltersHandler = () => {
    setActive(true);
  };

  return (
    <Carousel
      className={`bg-white ${
        isMapVisible && active ? " !h-[40%] xs:!h-full" : " "
      } ${active ? " xs:w-[400px] lg:w-[656px]" : "xs:w-[256px]"} ${
        active && focused ? "lg:!w-[800px] xl:!w-[1056px]" : " "
      }`}
    >
      <CarouselItem className="h-full w-full sm:w-[256px]">
        <Filters onSubmit={onSubmitFiltersHandler} />
      </CarouselItem>

      {active && (
        <CarouselItem className="h-full w-full xs:w-[400px]">
          <NaviButtons
            text="Search"
            onBack={onCloseResultsHandler}
            isMapVisible={isMapVisible}
            toggleMapVisibility={toggleMapVisibility}
          />
          <ResultsList />
        </CarouselItem>
      )}

      {active && focused && (
        <CarouselItem className="h-full w-full xs:w-[400px]">
          <NaviButtons
            text="Results"
            onBack={onClosePreviewHandler}
            isMapVisible={isMapVisible}
            toggleMapVisibility={toggleMapVisibility}
          />
          <Place place={focused} />
        </CarouselItem>
      )}
    </Carousel>
  );
};

export { Menu };
