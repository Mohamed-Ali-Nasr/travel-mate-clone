import { useEffect, useState } from "react";
import Form from "./Form";
import Input from "helpers/Input";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { register } from "store/auth/authActions";
import Button from "./Button";
import { selectAuth } from "store/auth/authSlice";

interface Props {
  onLogIn: () => void;
  onSuccess: () => void;
}

const RegisterForm = ({ onLogIn, onSuccess }: Props) => {
  const { loading, errorMessage, message } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const validName = name.trim().length > 0;

  const validEmail = email.includes("@");

  const validPassword = password.trim().length >= 6;

  const validConfirmPassword = confirmPassword === password;

  const formValid =
    validEmail &&
    validPassword &&
    validConfirmPassword &&
    validName &&
    !loading;

  const onSubmitHandler = () => {
    if (!formValid) return;
    dispatch(register(email, password, name, "123456789", "1990-01-01"));
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        onSuccess();
      }, 1000);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <Form onSubmit={onSubmitHandler}>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600">
        Create Your Account
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
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={setName}
        isValid={validName}
        title="Name"
        name="name"
        errorMessage="Please enter your name."
      />
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
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isValid={validConfirmPassword}
        title="Confirm Password"
        name="confirm-password"
        errorMessage="Passwords must match."
      />
      <Button
        text={"Sign up"}
        disabled={!formValid || !!message}
        loading={loading || !!message}
      />
      <p className="text-sm font-light text-gray-500">
        Already have an account?{" "}
        <a
          className="text-primary-600 hover:underline font-medium cursor-pointer"
          onClick={onLogIn}
        >
          Sign in
        </a>
      </p>
    </Form>
  );
};

export default RegisterForm;
