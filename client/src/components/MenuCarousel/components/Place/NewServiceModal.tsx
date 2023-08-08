import { useState } from "react";
import IService from "types/IService";
import fetchApi from "utils/fetchApi";
import Modal from "helpers/Modal";

interface Props {
  placeId: string;
  onClose: () => void;
}

const NewServiceModal = ({ placeId, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<File | undefined>(undefined);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [duration, setDuration] = useState("");

  const [description, setDescription] = useState("");

  const isFormValid =
    name.trim().length > 0 &&
    price.trim().length > 0 &&
    duration.trim().length > 0 &&
    !loading;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleAddService = async () => {
    if (!isFormValid) {
      return;
    }

    setLoading(true);

    const service: IService = {
      name,
      description,
      price: Number(price),
      duration: Number(duration),
    };

    try {
      const formData = new FormData();

      formData.append("service", JSON.stringify(service));

      if (image) {
        formData.append("image", image);
      }

      const response = await fetchApi(`/api/place/${placeId}/service`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Modal
      onBackdropClick={onClose}
      className="w-full border bg-white shadow-xl sm:w-[500px] sm:rounded"
    >
      <div className="flex w-full gap-4 p-4 mb-6">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-600">Add service</h1>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            className="mr-2 w-full border py-0.5 px-1 text-sm text-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block my-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            className="h-10 w-full resize-none rounded border px-0.5 text-sm font-semibold text-gray-600"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            className="mr-2 w-full border py-0.5 px-1 text-sm text-gray-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <label className="block my-2 text-sm font-medium text-gray-900">
            Duration (minutes)
          </label>
          <input
            className="mr-2 w-full border py-0.5 px-1 text-sm text-gray-500"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex flex-col flex-grow-0 flex-shrink-0 w-48 h-full">
          <label className=" block text-sm font-medium text-gray-900">
            Choose an image. (optional)
          </label>
          <div className="relative w-40 h-40 mt-2">
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="business"
                className="absolute z-10 object-cover w-full h-full"
              />
            )}

            {!image && (
              <div className="absolute z-20 flex h-full w-full items-center justify-center bg-[#00000041] text-white">
                Click to add image
              </div>
            )}

            <input
              type="file"
              accept=".jpeg,.jpg,.png,.gif"
              onChange={handleImageChange}
              className="absolute z-20 w-full h-full opacity-0 cursor-pointer"
              multiple={false}
            />
          </div>
        </div>
      </div>

      <div className="justify-self-end flex justify-end m-4">
        <button
          className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="ml-2 block rounded bg-blue-500 px-2 py-0.5 text-sm font-medium text-white"
          onClick={handleAddService}
          disabled={!isFormValid}
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </div>
    </Modal>
  );
};

export default NewServiceModal;
