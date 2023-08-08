import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { authActions, selectAuth } from "store/auth/authSlice";
import Modal from "helpers/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const LoginModal = () => {
  const { modalOpen: isOpen } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const onToggle = () => setIsLogin((login) => !login);

  const onSuccessfulLogin = () => {
    dispatch(authActions.hideModal());
  };

  const onExit = () => {
    dispatch(authActions.hideModal());
  };

  return (
    <Modal onBackdropClick={onExit}>
      {isLogin ? (
        <LoginForm onSignUp={onToggle} onSuccess={onSuccessfulLogin} />
      ) : (
        <RegisterForm onLogIn={onToggle} onSuccess={() => setIsLogin(true)} />
      )}
    </Modal>
  );
};

export { LoginForm, RegisterForm, LoginModal };
