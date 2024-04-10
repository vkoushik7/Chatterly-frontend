import { useState } from "react";
import { changePassword } from "../services/userServices";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.currentPassword) {
      setError("Current Password is required");
      return;
    }
    if (!formData.newPassword) {
      setError("New Password is required");
      return;
    }
    if (!formData.confirmNewPassword) {
      setError("Confirm New Password is required");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New Password and Confirm New Password do not match");
      return;
    }
    if (formData.newPassword === formData.currentPassword) {
      setError("New Password must be different from Current Password");
      return;
    }
    try {
      const res = await changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setError(await res);
    } catch (error) {
      console.error("Error occurred while updating user password", error);
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="currentPassword">
            Current Password:
          </label>
          <input
            type="password"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="newPassword">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="confirmNewPassword">
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
