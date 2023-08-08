interface Props {
  children: React.ReactNode;
  className?: string;
}

const CarouselItem = ({ children, className }: Props) => {
  return (
    <div
      className={`relative flex-shrink-0 flex-grow-0 snap-x ${
        className ? className : " "
      }`}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-auto bg-transparent border-l">
        {children}
      </div>
    </div>
  );
};

export default CarouselItem;
