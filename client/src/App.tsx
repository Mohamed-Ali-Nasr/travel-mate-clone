import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Reservations from "pages/Reservations";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { authenticate } from "store/auth/authActions";
import { selectAuth } from "store/auth/authSlice";
import { fetchReservations } from "store/reservations/reservationsActions";
import { getToken } from "utils/auth";

const App = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(authenticate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) dispatch(fetchReservations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    } else {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} id="home" />

        <Route path="/search" element={<Home />} id="search" />

        <Route path="/place/:placeId" element={<Home />} id="place" />

        <Route path="/login" element={<Login />} id="login" />

        <Route path="/register" element={<Register />} id="register" />

        <Route
          path="/reservations"
          element={<Reservations />}
          id="reservations"
        />
      </Routes>
    </>
  );
};

export default App;
