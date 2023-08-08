import { useEffect, useState } from "react";
import Form from "./Form";
import Input from "helpers/Input";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { login } from "store/auth/authActions";
import { selectAuth } from "store/auth/authSlice";

interface Props {
  onSignUp: () => void;
  onSuccess: () => void;
}

const LoginForm = ({ onSignUp, onSuccess }: Props) => {
  const { user, errorMessage, message, loading } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validEmail = email.includes("@");

  const validPassword = password.trim().length >= 6;

  const formValid = validEmail && validPassword && !loading;

  const onSubmitHandler = () => {
    if (!formValid) return;
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (user) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Form onSubmit={onSubmitHandler}>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600">
        Sign in to your account
      </h1>

      {errorMessage && (
        <h2 className="text-base font-bold leading-tight tracking-tight text-red-400">
          {errorMessage}
        </h2>
      )}

      {message && (
        <h2 className="text-base font-bold leading-tight tracking-tight text-green-400">
          {message}
        </h2>
      )}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
        isValid={validEmail}
        title="Email"
        name="email"
        errorMessage="Please enter a valid email address."
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        isValid={validPassword}
        title="Password"
        name="password"
        errorMessage="Password must be at least 6 characters long."
      />

      <Button text={"Sign in"} disabled={!formValid} loading={loading} />

      <p className=" text-sm font-light text-gray-500">
        Don’t have an account yet?{" "}
        <a
          className="text-primary-600 hover:underline font-medium cursor-pointer"
          onClick={onSignUp}
        >
          Sign up
        </a>
      </p>
    </Form>
  );
};

export default LoginForm;
