import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { bookActions, selectBook } from "store/book/bookSlice";
import Calendar from "./components/Calendar";
import ServiceOverview from "./components/ServiceOverview";
import { sendBookingRequest } from "store/book/bookActions";
import Modal from "helpers/Modal";

const BookingModal = () => {
  const dispatch = useAppDispatch();

  const {
    modalOpen: isOpen,
    selectedDate,
    selectedTime,
    loading,
    message,
    errorMessage,
  } = useAppSelector(selectBook);

  if (!isOpen) return null;

  const formValid = !!selectedDate && !!selectedTime && !loading;

  const onBackdropClickHandler = () => {
    dispatch(bookActions.hideModal());
  };

  const onBookClickHandler = () => {
    if (!formValid) return;
    dispatch(sendBookingRequest());
  };

  const ErrorMessage = () => (
    <div className="mx-6 mt-4 font-semibold text-red-500">{errorMessage}</div>
  );

  const Message = () => (
    <div className="mx-6 mt-4 font-semibold text-green-500">{message}</div>
  );

  return (
    <Modal
      onBackdropClick={onBackdropClickHandler}
      className="w-full border bg-white shadow-xl sm:w-[550px] sm:rounded-xl md:w-[700px]"
    >
      <Calendar />

      <ServiceOverview />

      <div className="w-full mt-4 border-b"></div>

      {errorMessage && <ErrorMessage />}

      {message && <Message />}

      <div
        className={`${
          formValid
            ? "cursor-pointer bg-blue-600"
            : "cursor-not-allowed bg-blue-300"
        } mx-4 mt-4 box-border  rounded-lg py-2 text-center text-white `}
        onClick={onBookClickHandler}
      >
        {!loading ? "Book" : "Booking..."}
      </div>
      <div className="mt-4"></div>
    </Modal>
  );
};

export default BookingModal;
