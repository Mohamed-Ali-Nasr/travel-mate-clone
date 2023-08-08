interface Props {
  onClick: () => void;
}

const SignInButton = ({ onClick }: Props) => {
  return (
    <li className="cursor-pointer" onClick={onClick}>
      <div className="px-2 py-1 text-sm font-bold text-blue-700 bg-white border rounded-md">
        Sign In
      </div>
    </li>
  );
};

export default SignInButton;
