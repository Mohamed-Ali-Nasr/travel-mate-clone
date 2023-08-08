import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import NewServiceModal from "./NewServiceModal";
import { deleteService, fetchPlace } from "store/places/placesActions";
import ServiceItem from "./ServiceItem";
import { selectPlaces } from "store/places/placesSlice";
import { selectAuth } from "store/auth/authSlice";

const Services = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);

  const { focused } = useAppSelector(selectPlaces);

  const services = focused?.services;

  const placeId = focused?.id;

  const ownerId = focused?.createdBy.id;

  const isOwner = user?.id === ownerId;

  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);

  const deleteServiceHandler = async (id: string) => {
    if (!placeId || !isOwner) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirm) {
      dispatch(deleteService(placeId, id));
    }
  };

  const onCloseModalHandler = () => {
    dispatch(fetchPlace(placeId!));
    setNewServiceModalOpen(false);
  };

  return (
    <div className="py-4">
      {services?.length === 0 && (
        <div className="pl-1 font-semibold text-gray-400">
          No services available!
        </div>
      )}

      {isOwner && (
        <button
          className="hover:text-gray-400 pl-1 text-sm font-semibold text-white rounded bg-blue-600 py-1.5 px-3 mt-1.5 ml-1"
          onClick={() => setNewServiceModalOpen(true)}
        >
          Click to add new service
        </button>
      )}

      {services?.map((service) => (
        <ServiceItem
          key={service.name}
          placeId={placeId!}
          serviceId={service.id}
          name={service.name}
          price={service.price}
          description={service.description}
          image={service.image}
          edit={isOwner}
          onDelete={() => deleteServiceHandler(service.id)}
        />
      ))}

      {newServiceModalOpen && (
        <NewServiceModal placeId={placeId!} onClose={onCloseModalHandler} />
      )}
    </div>
  );
};

export default Services;
