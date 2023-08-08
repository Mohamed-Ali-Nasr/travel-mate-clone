import { useAppSelector } from "hooks/redux-hooks";
import { RiMapPin2Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Img from "helpers/Img";
import { selectPlaces } from "store/places/placesSlice";
import HoursOverview from "./HoursOverview";

const Overview = () => {
  const { focused: place } = useAppSelector(selectPlaces);

  const address = place?.address;

  const images = place?.images && place.images.length > 0 ? place.images : null;

  const phone = place?.contactInfo.phone;

  const email = place?.contactInfo.email;

  const tags = place?.tags;

  const hours = place?.openingHours;

  return (
    <div className="py-2">
      {images && (
        <div className="flex gap-2 py-2">
          {images.map((image) => {
            return (
              <Img
                key={image}
                src={`/${image}`}
                className="rounded-xl hover:scale-105 object-cover w-24 h-40 cursor-pointer"
              />
            );
          })}
        </div>
      )}

      {address && (
        <div className="flex items-center py-2 cursor-pointer">
          <RiMapPin2Line className="inline-block mr-4 text-xl text-blue-500" />
          <a
            className="font-semibold text-gray-500"
            href={`http://maps.google.com/?q=${address}`}
            target="_blank"
          >
            {address}
          </a>
        </div>
      )}

      {hours && <HoursOverview openingHours={hours} />}

      {phone && (
        <div className="flex items-center py-2 cursor-pointer">
          <FiPhone className="inline-block mr-4 text-xl text-blue-500" />
          <a className="font-semibold text-gray-500" href={`tel:${phone}`}>
            {phone}
          </a>
        </div>
      )}

      {email && (
        <div className="flex items-center py-2 cursor-pointer">
          <AiOutlineMail className="inline-block mr-4 text-xl text-blue-500" />
          <span className="font-semibold text-gray-500">{email}</span>
        </div>
      )}

      {tags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="text-sm font-semibold text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
