import { useRef } from "react";
import Arrow from "./Arrow";

interface RowProps {
  children: React.ReactNode;
}

const Row = ({ children }: RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const clickHandler = (direction: "left" | "right") => {
    if (!rowRef.current) return;

    const { scrollLeft, clientWidth } = rowRef.current;

    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className="flex items-center mt-4">
      <Arrow
        direction="left"
        onClick={() => clickHandler("left")}
        className="flex-grow-0 flex-shrink-0"
      />

      <div className="flex flex-1 gap-4 overflow-hidden" ref={rowRef}>
        {children}
      </div>

      <Arrow
        direction="right"
        onClick={() => clickHandler("right")}
        className="flex-grow-0 flex-shrink-0"
      />
    </div>
  );
};

export default Row;
