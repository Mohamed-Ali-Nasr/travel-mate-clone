import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { businessActions } from "store/business/businessSlice";
import { useState, ReactNode } from "react";
import NavBar from "./components/NavBar";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import DropdownButton from "./components/DropdownButton";
import Profile from "./components/Profile";
import { selectAuth } from "store/auth/authSlice";
import { selectReservation } from "store/reservations/reservationsSlice";
import { createPortal } from "react-dom";
import { removeToken } from "utils/auth";
import { logout } from "store/auth/authActions";

const ProfileModal = ({ children }: { children: ReactNode }) => {
  return createPortal(
    <>{children}</>,
    document.getElementById("business-root")!
  );
};

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const { reservations } = useAppSelector(selectReservation);

  const noOfReservations = reservations.length;

  const noOfNotifications = noOfReservations;

  const navigate = useNavigate();

  const { user } = useAppSelector(selectAuth);

  const onSignOutHandler = () => {
    removeToken();
    dispatch(logout());
    navigate("/login");
  };

  const onReservationsHandler = () => {
    navigate("/reservations");
  };

  const onOpenBusinessModalHandler = () => {
    navigate("/");
    dispatch(businessActions.showModal());
  };

  return (
    <NavBar notifications={noOfNotifications}>
      {user && (
        <>
          <Button
            text="Reservations"
            onClick={onReservationsHandler}
            notifications={noOfReservations}
          />
          <Dropdown>
            <div className=" px-4 py-3 text-sm text-gray-900">
              <div className="font-semibold">{user.name}</div>
              <div className="truncate">{user.email}</div>
            </div>
            <ul className=" py-2">
              <DropdownButton
                text="Reservations"
                onClick={onReservationsHandler}
              />
              <DropdownButton
                text="Profile"
                onClick={() => setShowModal(true)}
              />
              <DropdownButton
                text="Create business"
                onClick={onOpenBusinessModalHandler}
              />
            </ul>
            <ul className=" py-2">
              <DropdownButton text="Sign out" onClick={onSignOutHandler} />
            </ul>
          </Dropdown>
        </>
      )}

      {user && showModal && (
        <ProfileModal>
          <Profile
            onClose={() => setShowModal(false)}
            signOutHandler={onSignOutHandler}
          />
        </ProfileModal>
      )}
    </NavBar>
  );
};

export default Header;
