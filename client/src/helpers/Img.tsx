import { apiURL } from "utils/fetchApi";

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

const Img = ({ src, alt, className }: Props) => {
  return (
    <img
      src={`${apiURL}/image${src}`}
      className={`${className ? className : ""}`}
      alt={alt}
    />
  );
};

export default Img;
