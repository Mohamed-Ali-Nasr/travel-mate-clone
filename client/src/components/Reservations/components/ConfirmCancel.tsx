import Modal from "helpers/Modal";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { cancelReservation } from "store/reservations/reservationsActions";
import {
  reservationsActions,
  selectReservation,
} from "store/reservations/reservationsSlice";

const ConfirmCancel = () => {
  const dispatch = useAppDispatch();

  const {
    selected: selectedReservation,
    cancelModalOpen: confirmCancelModalOpen,
  } = useAppSelector(selectReservation);

  if (!selectedReservation) return null;

  if (!confirmCancelModalOpen) return null;

  const closeModal = () => {
    dispatch(reservationsActions.closeCancelModal());
  };

  const onConfirmHandler = () => {
    dispatch(cancelReservation(selectedReservation.id));
  };

  return (
    <Modal
      onBackdropClick={closeModal}
      className="flex h-40 flex-col justify-between rounded-xl border bg-white p-4 shadow-xl sm:w-[550px] sm:border"
    >
      <h1 className="text-lg font-semibold">
        Do you want to cancel reservation?
      </h1>
      <div className="flex flex-row justify-end">
        <button
          className="px-2 py-1 mb-1 text-sm font-semibold text-white bg-green-500 border rounded"
          onClick={closeModal}
        >
          Go Back
        </button>
        <button
          className="px-2 py-1 mb-1 ml-2 text-sm font-semibold text-white bg-red-500 border rounded"
          onClick={onConfirmHandler}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmCancel;
