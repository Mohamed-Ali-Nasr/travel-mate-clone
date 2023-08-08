import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import ConfirmCancel from "./ConfirmCancel";
import {
  reservationsActions,
  selectReservation,
} from "store/reservations/reservationsSlice";
import { Link } from "react-router-dom";
import { IReservation } from "types/IReservation";
import Item from "./Item";
import { selectAuth } from "store/auth/authSlice";

const List = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);

  const { reservations, selected: selectedReservation } =
    useAppSelector(selectReservation);

  const setSelectedReservation = (id: string) => {
    dispatch(reservationsActions.setSelected(id));
  };

  const cancelReservationHandler = (reservation: IReservation) => {
    dispatch(reservationsActions.openCancelModal(reservation));
  };

  const sortedReservations = [...reservations].sort(
    (a: IReservation, b: IReservation) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    }
  );

  const businesses = sortedReservations.reduce(
    (acc, curr) => {
      const business = acc.find((b) => b.id === curr.place.id);

      if (!business && curr.user) {
        acc.push({
          id: curr.place.id,
          name: curr.place.name,
          address: curr.place.address,
        });
      }
      return acc;
    },
    [] as { id: string; name: string; address?: string }[]
  );

  return (
    <>
      <div className="relative h-full max-h-full w-full flex-shrink-0 flex-grow-0 sm:w-[400px]">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-auto bg-[#fcfcfc]">
          {reservations.length === 0 && (
            <h1 className="m-4 text-lg font-semibold text-gray-600">
              No reservations yet{" "}
              <Link to="/" className="text-blue-600">
                Book something now {":)"}
              </Link>
            </h1>
          )}

          {reservations.length > 0 && (
            <h1 className="m-4 font-bold text-gray-800">Your reservations:</h1>
          )}

          {sortedReservations
            .filter(
              (reservation) =>
                !reservation.user || reservation.user.id === user?.id
            )
            .map((reservation) => (
              <Item
                id={reservation.place.id}
                key={reservation.id}
                title={reservation.service.name}
                address={reservation.place.address}
                name={reservation.place.name}
                selected={reservation.id === selectedReservation?.id}
                image={reservation.place.image}
                date={reservation.date}
                onClick={() => setSelectedReservation(reservation.id)}
                onCancel={() => cancelReservationHandler(reservation)}
                bookAgain={true}
              />
            ))}

          {businesses && businesses.length > 0 && (
            <>
              <h1 className="m-4 font-bold text-gray-800">
                Reservations in your businesses:
              </h1>
              {businesses.map((business) => {
                return (
                  <div key={business.id}>
                    <div className=" flex items-baseline mx-4 mb-4">
                      <h1 className="mr-2 text-lg font-semibold text-gray-600">
                        {business.name}
                      </h1>
                      <div className=" text-sm text-gray-400">
                        {business.address}
                      </div>
                    </div>
                    {sortedReservations
                      .filter(
                        (reservation) =>
                          reservation.user &&
                          reservation.place.id === business.id
                      )
                      .map((reservation) => (
                        <Item
                          id={reservation.id}
                          key={reservation.id}
                          title={reservation.service.name}
                          name={reservation.user!.name}
                          selected={reservation.id === selectedReservation?.id}
                          image={reservation.user!.profileImage}
                          date={reservation.date}
                          onClick={() => setSelectedReservation(reservation.id)}
                          onCancel={() => cancelReservationHandler(reservation)}
                        />
                      ))}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <ConfirmCancel />
    </>
  );
};

export default List;
