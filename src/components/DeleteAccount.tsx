import { useState } from "react";
import { deleteAccount } from "../services/userServices";

function DeleteAccount() {
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password) {
      setError("Password is required");
      return;
    }
    try {
      const res = await deleteAccount(formData.password);
      setError(res);
      if (res === "Account deleted successfully") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      console.error("Error occurred while deleting user account", error);
      setError((error as Error).message);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Delete Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete My Account!
        </button>
      </form>
    </div>
  );
}

export default DeleteAccount;
