interface Props {
  children: React.ReactNode;
  className?: string;
}

const Carousel = ({ children, className }: Props) => {
  return (
    <div
      className={`flex h-full max-h-full w-full flex-shrink-0 flex-grow-0 justify-end bg-transparent ${
        className ? className : " "
      }`}
    >
      {children}
    </div>
  );
};

export default Carousel;
