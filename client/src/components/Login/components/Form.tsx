import Logo from "helpers/Logo";
import { Link } from "react-router-dom";

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex h-full w-full flex-col space-y-4 bg-white p-6 text-gray-600 shadow-2xl xs:h-fit xs:w-fit xs:min-w-[320px] xs:rounded-xl"
    >
      <div className="flex space-y-2">
        <Link to="/">
          <Logo className="w-10 h-10" fill="#4b5563" />
        </Link>
      </div>
      {children}
    </form>
  );
};

export default Form;
