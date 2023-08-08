import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import NewMenuItemModal from "./NewMenuItemModal";
import { deleteMenuItem, fetchPlace } from "store/places/placesActions";
import MenuItem from "./MenuItem";
import { selectPlaces } from "store/places/placesSlice";
import { selectAuth } from "store/auth/authSlice";

const Menu = () => {
  const dispatch = useAppDispatch();

  const { focused } = useAppSelector(selectPlaces);

  const { user } = useAppSelector(selectAuth);

  const placeId = focused?.id;

  const ownerId = focused?.createdBy.id;

  const menu = focused?.menu;

  const isOwner = user?.id === ownerId;

  const [modalOpen, setModalOpen] = useState(false);

  const deleteMenuItemHandler = async (id: string) => {
    if (!placeId || !isOwner) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this menu item?"
    );
    if (confirm) {
      dispatch(deleteMenuItem(placeId, id));
    }
  };

  const onCloseModalHandler = () => {
    dispatch(fetchPlace(placeId!));
    setModalOpen(false);
  };

  return (
    <div className="py-4">
      {menu?.length === 0 && (
        <div className="pl-1 font-semibold text-gray-400">
          No services available!
        </div>
      )}

      {isOwner && (
        <button
          className="hover:text-gray-400 pl-1 text-sm font-semibold text-white rounded bg-blue-600 py-1.5 px-3 mt-1.5 ml-1"
          onClick={() => setModalOpen(true)}
        >
          Click to add new menu item
        </button>
      )}

      <div>
        {menu?.map((menuItem) => (
          <MenuItem
            key={menuItem.name}
            name={menuItem.name}
            price={menuItem.price}
            description={menuItem.description}
            image={menuItem.image}
            edit={isOwner}
            onDelete={() => deleteMenuItemHandler(menuItem.id)}
          />
        ))}
      </div>

      {modalOpen && (
        <NewMenuItemModal placeId={placeId!} onClose={onCloseModalHandler} />
      )}
    </div>
  );
};

export default Menu;
