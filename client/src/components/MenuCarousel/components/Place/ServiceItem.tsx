import Img from "helpers/Img";
import { useAppDispatch } from "hooks/redux-hooks";
import { showBookingModal } from "store/book/bookActions";

interface ServiceProps {
  placeId: string;
  serviceId: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  edit: boolean;
  onDelete: () => void;
}
const ServiceItem = ({
  placeId,
  serviceId,
  name,
  price,
  description,
  image,
  edit,
  onDelete,
}: ServiceProps) => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(showBookingModal(placeId, serviceId));
  };

  return (
    <div className=" p-1">
      <div className="flex">
        <div className="flex-1">
          <div className="text font-semibold text-gray-700">{name}</div>
          <div className="flex items-center">
            {!!price && (
              <div className="w-10 mr-2 text-sm text-gray-500">{price} $</div>
            )}

            <button
              className="px-2 bg-blue-600 text-white rounded font-semibold my-0.5 text-sm"
              onClick={onClickHandler}
            >
              Book
            </button>
          </div>

          {description && (
            <div className="text-sm text-gray-400">{description}</div>
          )}

          {edit && (
            <div
              className="flex text-sm font-semibold text-blue-600 cursor-pointer"
              onClick={onDelete}
            >
              Delete service
            </div>
          )}
        </div>

        {image && (
          <div className=" w-24 h-20">
            <Img
              src={`/${image}`}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceItem;
