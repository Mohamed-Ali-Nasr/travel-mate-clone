import React, { useEffect, useState } from "react";
import { fetchPlaces } from "store/places/placesActions";
import { useAppDispatch } from "hooks/redux-hooks";

interface Props {
  onSubmit: () => void;
}

const Filters = ({ onSubmit }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  const [priceFilterFrom, setPriceFilterFrom] = useState<string>("");

  const [priceFilterTo, setPriceFilterTo] = useState<string>("");

  const [firstLoad, setFirstLoad] = useState(true);

  const dispatch = useAppDispatch();

  const wrongPriceFilter =
    priceFilterFrom &&
    priceFilterTo &&
    parseInt(priceFilterFrom) > parseInt(priceFilterTo)
      ? "border-red-500"
      : "";

  const fetch = (firstLoad = false) => {
    const priceFrom =
      priceFilterFrom.trim().length > 0 ? priceFilterFrom : undefined;

    const priceTo = priceFilterTo.trim().length > 0 ? priceFilterTo : undefined;

    const type = typeFilter.trim().length > 0 ? typeFilter : undefined;

    dispatch(fetchPlaces(searchQuery, priceFrom, priceTo, type, firstLoad));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch();
    onSubmit();
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      fetch(true);
      return;
    }
    const timeout = setTimeout(() => {
      fetch();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, firstLoad]);

  return (
    <form
      className="flex flex-col w-full h-full gap-2 px-4 py-5 bg-gray-100"
      onSubmit={onSubmitHandler}
    >
      <h2 className="text-2xl font-bold text-gray-600">Search</h2>
      <input
        type="text"
        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm"
        name="destination"
        placeholder="Anything.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h3 className="text-lg font-semibold text-gray-600">Filters</h3>
      <label className="block mb-1 text-sm font-medium text-gray-900">
        Type
      </label>
      <select
        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm"
        name="type"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">Any</option>
        <option value="hotel">Hotel</option>
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
      </select>
      <label className="block mb-1 text-sm font-medium text-gray-900">
        Price
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          className={`${wrongPriceFilter} block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm`}
          name="priceFrom"
          placeholder="From"
          value={priceFilterFrom}
          onChange={(e) => setPriceFilterFrom(e.target.value)}
        />
        <div>-</div>
        <input
          type="number"
          className={`${wrongPriceFilter} block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm`}
          name="priceTo"
          placeholder="To"
          value={priceFilterTo}
          onChange={(e) => setPriceFilterTo(e.target.value)}
        />
      </div>

      <button
        className="justify-self-end hover:bg-blue-900 self-end w-full p-2 mt-4 text-center text-white transition-colors bg-blue-700"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};
export default Filters;
