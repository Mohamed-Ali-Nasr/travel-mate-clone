import UserAvatar from "helpers/UserAvatar";
import { useAppSelector } from "hooks/redux-hooks";
import Input from "helpers/Input";
import { useEffect, useState } from "react";
import fetchApi from "utils/fetchApi";
import { selectAuth } from "store/auth/authSlice";

interface Props {
  onClose: () => void;
  signOutHandler: () => void;
}

const Profile = ({ onClose, signOutHandler }: Props) => {
  const { user } = useAppSelector(selectAuth);

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const validName = name.trim().length >= 3;

  const validPassword =
    password.trim().length >= 6 || password.trim().length !== 0;

  const validForm = validName && validPassword && !loading;

  const imageURL = imageFile ? URL.createObjectURL(imageFile) : undefined;

  const image = imageURL ? undefined : user?.profileImage;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file || undefined);
  };

  const onSubmit = async () => {
    if (!validForm) {
      return;
    }

    setLoading(true);
    const profile = {
      name: name.trim().length > 0 ? name : undefined,
      password: password.trim().length > 0 ? password : undefined,
    };

    try {
      const formData = new FormData();

      formData.append("profile", JSON.stringify(profile));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetchApi(`/api/user/profile`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        try {
          response.json().then((data) => {
            setError(data.message);
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new Error(error);
        }
      }

      setLoading(false);

      if (response.ok) {
        onClose();
        signOutHandler();
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-20 box-border flex items-center justify-center bg-[#0000009a]"
      onClick={() => onClose()}
    >
      <div
        className="flex max-h-full w-full overflow-y-auto rounded border bg-white p-4 shadow-xl xs:w-[400px]"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="group w-14 relative cursor-pointer">
          <UserAvatar
            name={user?.name || ""}
            url={imageURL}
            image={image}
            className="w-12 h-12 bg-pink-400"
          />
          <div className="group-hover:underline block mt-1 text-sm font-semibold text-gray-600">
            Click to change profile picture
          </div>
          <input
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={handleImageChange}
            className="absolute top-0 z-20 w-full h-full opacity-0 cursor-pointer"
            multiple={false}
          />
        </div>
        <div className="w-full ml-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            errorMessage="Enter a valid name"
            onChange={setName}
            isValid={validName}
            name="name"
            title="Name"
          />
          <div className="mb-2" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            errorMessage="Password must be at least 6 characters long"
            onChange={setPassword}
            isValid={validPassword}
            name="password"
            title="Password"
          />
          {error && (
            <div className="text-sm font-semibold text-red-600">{error}</div>
          )}
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900 disabled:cursor-not-allowed"
              onClick={onSubmit}
              disabled={!validForm}
            >
              {!loading ? "Submit" : "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
