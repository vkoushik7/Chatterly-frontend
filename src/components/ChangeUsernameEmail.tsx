import { useEffect, useState } from "react";
import { getUserData, changeUserData } from "../services/userServices";

interface UserData {
  name: string;
  username: string;
  email: string;
}

function ChangeUsernameEmail() {
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    newName: "",
    newUsername: "",
    newEmail: "",
  });
  const [initialData, setInitialData] = useState<UserData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData: UserData = await getUserData();
        setInitialData(userData);
        setFormData({
          newName: userData.name,
          newUsername: userData.username,
          newEmail: userData.email,
        });
      } catch (error) {
        console.error("Error occurred while fetching user data", error);
      }
    };
    void fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.newName) {
      setError("Name is required");
      return;
    }
    if (!formData.newUsername) {
      setError("Username is required");
      return;
    }
    if (!formData.newEmail) {
      setError("Email is required");
      return;
    }
    try {
      const res: Promise<string> = changeUserData({
        name: formData.newName,
        username: formData.newUsername,
        email: formData.newEmail,
      });
      setError(await res);
    } catch (error) {
      console.error("Error occurred while updating user data", error);
      setError((error as Error).message);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Change Username/Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="newUsername">
            Name:
          </label>
          <input
            type="text"
            value={formData.newName}
            onChange={handleChange}
            id="newName"
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="newUsername">
            Username:
          </label>
          <input
            type="text"
            value={formData.newUsername}
            onChange={handleChange}
            id="newUsername"
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="newEmail">
            Email:
          </label>
          <input
            type="email"
            value={formData.newEmail}
            onChange={handleChange}
            id="newEmail"
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={
            !initialData ||
            (initialData.name === formData.newName &&
              initialData.username === formData.newUsername &&
              initialData.email === formData.newEmail)
          }
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ChangeUsernameEmail;
