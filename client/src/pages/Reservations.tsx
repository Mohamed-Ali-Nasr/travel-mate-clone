import Header from "components/Header";
import { useAppSelector } from "hooks/redux-hooks";
import { useAppNavigate } from "hooks/use-navigate";
import { useEffect } from "react";
import { List } from "components/Reservations";
import { ReservationsMap } from "components/Map";
import { selectAuth } from "store/auth/authSlice";

const Reservations = () => {
  const { isLogged: isLoggedIn } = useAppSelector(selectAuth);

  const navigate = useAppNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col">
      <Header />
      <div className="xs:flex-row relative flex flex-col-reverse flex-1">
        <ReservationsMap />
        <List />
      </div>
    </div>
  );
};

export default Reservations;
