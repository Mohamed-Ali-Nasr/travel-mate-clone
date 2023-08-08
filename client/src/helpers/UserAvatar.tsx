import { apiURL } from "utils/fetchApi";

interface Props {
  name: string;
  image?: string;
  url?: string;
  className?: string;
}

const UserAvatar = ({ name, image, url, className }: Props) => {
  const defaultClassName = "h-10 w-10 bg-pink-400";

  const defaultUrl = image ? `${apiURL}/image/${image}` : url || undefined;

  return (
    <div
      className={`${
        className ? className : defaultClassName
      } flex items-center justify-center overflow-hidden rounded-full text-center text-lg font-bold text-white`}
    >
      {!defaultUrl && name.charAt(0).toUpperCase()}

      {defaultUrl && (
        <img
          src={defaultUrl}
          alt={name}
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};

export default UserAvatar;
