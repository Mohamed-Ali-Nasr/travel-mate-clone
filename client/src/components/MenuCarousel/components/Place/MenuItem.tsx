import Img from "helpers/Img";

interface MenuItemProps {
  name: string;
  price?: number;
  description?: string;
  image?: string;
  edit: boolean;
  onDelete: () => void;
}

const MenuItem = ({
  name,
  price,
  description,
  image,
  edit,
  onDelete,
}: MenuItemProps) => {
  return (
    <div className=" flex p-1">
      <div className="flex-1">
        <div className="text font-semibold text-gray-700">{name}</div>

        {!!price && <div className="text-sm text-gray-500">{price} $</div>}

        {description && (
          <div className="text-sm text-gray-400">{description}</div>
        )}

        {edit && (
          <div
            className="flex text-sm font-semibold text-blue-600 cursor-pointer"
            onClick={onDelete}
          >
            Delete menu item
          </div>
        )}
      </div>

      {image && (
        <div className=" w-24 h-20">
          <Img
            src={`/${image}`}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default MenuItem;
