import { RegisterForm } from "components/Login";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onSuccessHandler = () => {
    navigate("/login");
  };

  const onLoginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <RegisterForm onLogIn={onLoginHandler} onSuccess={onSuccessHandler} />
    </div>
  );
};

export default Register;
