import { LoginForm } from "components/Login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSuccessHandler = () => {
    navigate("/");
  };

  const onSignUpHandler = () => {
    navigate("/register");
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <LoginForm onSignUp={onSignUpHandler} onSuccess={onSuccessHandler} />
    </div>
  );
};

export default Login;
