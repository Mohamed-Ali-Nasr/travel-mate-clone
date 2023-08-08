import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Input from "helpers/Input";
import TimeSelector from "./components/TimeSelector";
import IOpeningHours from "types/IOpeningHours";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import { businessActions, selectBusiness } from "store/business/businessSlice";
import { postBusiness, updateBusiness } from "store/business/businessActions";
import IBusiness from "types/IBusiness";
import TypeSelector from "./components/TypeSelector";
import Modal from "helpers/Modal";
import { isTimeGreater } from "utils/dateTime";
import { deletePlace } from "store/places/placesActions";
import Img from "helpers/Img";

const BusinessModal = () => {
  const dispatch = useAppDispatch();

  const {
    subject: editingBusiness,
    editing: isEditing,
    loading,
  } = useAppSelector(selectBusiness);

  const [coordinates, setCoordinates] = useState<
    [number, number] | undefined
  >();

  const [name, setName] = useState("");

  const [thumbnail, setThumbnails] = useState<File | undefined>(undefined);

  const [images, setImages] = useState<File[]>([]);

  const [description, setDescription] = useState("");

  const [type, setType] = useState("hotel");

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [tags, setTags] = useState("");

  const [openingHours, setOpeningHours] = useState<IOpeningHours[]>(
    [...Array(7)].map((_, i) => {
      return {
        dayOfWeek: i,
        from: "09:00",
        to: "17:00",
      };
    })
  );

  useEffect(() => {
    if (isEditing) {
      if (!editingBusiness) return;

      setName(editingBusiness.name);

      setDescription(editingBusiness.description || "");

      setType(editingBusiness.type);

      setAddress(editingBusiness.address || "");

      setPhone(editingBusiness.contactInfo.phone || "");

      setTags(editingBusiness.tags ? editingBusiness.tags.join(" ") : "");

      setOpeningHours(editingBusiness.openingHours);

      const coordinates = editingBusiness.location.coordinates;

      setCoordinates([coordinates[1], coordinates[0]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValidName = name.trim().length > 0;

  const isValidDescription = description.trim().length > 0;

  const isValidType = type.trim().length > 0;

  const isValidAddress = address.trim().length > 0;

  const isValidPhone = phone.trim().length >= 9;

  const isValidTags = tags.trim().length > 0;

  const isValidThumbnail = !!thumbnail || !!editingBusiness?.thumbnail;

  const isValidTime = openingHours.every(
    (item) =>
      (item.from == "--:--" && item.to === "--:--") ||
      isTimeGreater(item.to, item.from)
  );

  const isFormValid =
    isValidName &&
    isValidDescription &&
    isValidType &&
    isValidAddress &&
    isValidPhone &&
    isValidTags &&
    isValidTime &&
    isValidThumbnail &&
    !!coordinates &&
    !loading;

  const setHours = (value: IOpeningHours) => {
    const newHours = openingHours.map((current) => {
      if (current.dayOfWeek === value.dayOfWeek) {
        return value;
      }
      return current;
    });
    setOpeningHours(newHours);
  };

  const setTagsHandler = (value: string) => {
    setTags(value.replace(/[^a-zA-Z0-9 ]/g, ""));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setThumbnails(file);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) setImages([]);
    else setImages([...files]);
  };

  const onCancelHandler = () => {
    dispatch(businessActions.hideModal());
  };

  const onSubmitHandler = () => {
    if (!isFormValid) return;

    const hours = openingHours.reduce((acc, current) => {
      if (current.from !== "--:--" && current.to !== "--:--") {
        acc.push(current);
      }
      return acc;
    }, [] as IOpeningHours[]);

    const business: IBusiness = {
      name: name.trim(),
      description: description.trim(),
      type,
      address: address.trim(),
      phone: phone.trim(),
      tags: tags.split(" "),
      openingHours: hours,
      location: {
        type: "Point",
        coordinates: [coordinates[1], coordinates[0]],
      },
    };

    if (!isEditing && thumbnail) {
      dispatch(postBusiness(business, thumbnail, images));
    }

    if (isEditing) {
      dispatch(
        updateBusiness(
          { ...business, id: editingBusiness!.id },
          thumbnail,
          images
        )
      );
    }
  };

  const onDeletePlaceHandler = () => {
    if (!editingBusiness) return;

    const confirm = window.confirm(
      `Are you sure you want to delete ${editingBusiness.name}?`
    );

    if (!confirm) return;

    dispatch(deletePlace(editingBusiness.id));
  };

  return (
    <Modal
      className="box-border max-h-full w-full flex-col gap-4 overflow-y-auto border bg-white px-4 py-2 shadow-xl first:flex xs:w-[450px] xs:rounded md:w-[700px] md:flex-row"
      onBackdropClick={onCancelHandler}
    >
      <div className="md:w-1/2 w-full">
        <h1 className="text-xl font-semibold text-gray-600">
          Let's Get Started
        </h1>

        <Input
          type="text"
          placeholder="Business Name"
          value={name}
          errorMessage=""
          onChange={setName}
          isValid={isValidName}
          name="business-name"
          title="Business Name"
        />

        <TypeSelector value={type} onChange={setType} />

        <label
          htmlFor="description"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          className="h-20 w-full resize-none rounded border px-0.5 text-sm font-semibold text-gray-600"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Input
          type="text"
          placeholder="London, UK"
          value={address}
          errorMessage=""
          onChange={setAddress}
          isValid={isValidAddress}
          name="address"
          title="Address"
        />

        <Input
          type="number"
          placeholder="123456789"
          value={phone}
          errorMessage=""
          onChange={setPhone}
          isValid={isValidPhone}
          name="phone"
          title="Phone number"
        />

        <div className="mx-4 mt-2 mb-2 flex flex-col gap-0.5 text-sm">
          {openingHours.map((hours) => {
            return (
              <TimeSelector
                key={hours.dayOfWeek}
                value={hours}
                onChange={(value) => setHours(value)}
              />
            );
          })}
        </div>

        <Input
          type="text"
          placeholder="Separate tags with spaces e.g. hotel restaurant"
          value={tags}
          errorMessage=""
          onChange={setTagsHandler}
          isValid={isValidTags}
          name="tags"
          title="Tags"
        />
        <div className="mt-2" />
      </div>

      <div className=" md:w-1/2">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Choose a thumbnail
        </label>

        <div className="relative flex items-center justify-center h-40 overflow-hidden rounded">
          {!thumbnail && editingBusiness?.thumbnail && (
            <Img
              src={`/${editingBusiness.thumbnail}`}
              alt="business"
              className="object-cover w-full h-full"
            />
          )}

          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="business"
              className="object-cover w-full h-full"
            />
          )}

          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#0000006c] font-bold text-white">
            Click to select file.
          </div>

          <input
            type="file"
            accept=".jpeg,.jpg,.png,.gif"
            onChange={handleThumbnailChange}
            className="absolute z-20 w-full h-full opacity-0 cursor-pointer"
            multiple={false}
          />
        </div>

        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
          Add some more photos
        </label>

        <input
          type="file"
          accept=".jpeg,.jpg,.png,.gif"
          onChange={handleImagesChange}
          className="z-20 w-full cursor-pointer"
          multiple={true}
        />

        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
          Pick a location
        </label>

        <Map coordinates={coordinates} setCoordinates={setCoordinates} />

        <div className="flex justify-end gap-2 mt-2 mb-2">
          {isEditing && (
            <button
              className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900"
              onClick={onDeletePlaceHandler}
            >
              Delete
            </button>
          )}

          <button
            className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900"
            onClick={onCancelHandler}
          >
            Cancel
          </button>
          <button
            className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900 disabled:cursor-not-allowed"
            onClick={onSubmitHandler}
            disabled={!isFormValid}
          >
            {!loading ? "Submit" : "Loading..."}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BusinessModal;
