import { IPlace } from "types/IPlace";
import { placesActions, selectPlaces } from "store/places/placesSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Result from "./Result";

const ResultsList = () => {
  const { places: results } = useAppSelector(selectPlaces);
  const dispatch = useAppDispatch();

  const onClickHandle = (result: IPlace) => {
    dispatch(placesActions.setFocused(result));
  };

  return (
    <ul className="flex flex-col flex-grow flex-shrink w-full overflow-auto divide-y-2">
      {results.map((result) => {
        return (
          <li key={result.id}>
            <Result
              name={result.name}
              description={result.description}
              thumbnail={result.thumbnail}
              rating={result.rating}
              onClick={() => onClickHandle(result)}
              numberOfReviews={result.reviews.length}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ResultsList;
