import { useAppSelector } from "hooks/redux-hooks";
import { selectBook } from "store/book/bookSlice";
import { selectPlaces } from "store/places/placesSlice";
import { getTime } from "utils/dateTime";

const getEndTime = (time: string, duration: number) => {
  const endDateTime = new Date(`1970-01-01T${time}:00Z`);

  endDateTime.setMinutes(endDateTime.getMinutes() + duration);

  const dateString = endDateTime.toISOString();

  return getTime(dateString);
};

const ServiceOverview = () => {
  const { focused: selected } = useAppSelector(selectPlaces);

  const { serviceId: selectedServiceId, selectedTime } =
    useAppSelector(selectBook);

  const selectedService = selected?.services.find(
    (service) => service.id === selectedServiceId
  );

  const duration = selectedService?.duration;

  const endTime =
    selectedTime && duration ? getEndTime(selectedTime, duration) : undefined;

  return (
    <div className="p-4 m-6 bg-gray-100 rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-gray-600">
          {selectedService?.name}
        </h1>

        <div className="font-semibold text-gray-500">
          {selectedService?.price} $
        </div>
      </div>

      <div className="flex justify-end h-10 text-sm font-semibold text-gray-400">
        {selectedTime && `${selectedTime}`}
        {endTime && ` - ${endTime}`}
      </div>
    </div>
  );
};

export default ServiceOverview;
