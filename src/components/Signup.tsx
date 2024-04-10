import { Link } from "react-router-dom";
import { useState } from "react";
import signup from "../services/signup";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setError("Name is required");
      return;
    }
    if (!formData.username) {
      setError("Username is required");
      return;
    }
    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }
    if (!formData.confirmPassword) {
      setError("Confirm Password is required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Form submitted");
    try {
      const { confirmPassword, ...reqData } = formData;
      const res: Promise<{ success: boolean; message: string }> =
        signup(reqData);
      setError((await res).message);
      if ((await res).success) {
        setError("Account successfully created. Redirecting to login page...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Error occurred while signing up", error);
      setError("Error occurred while signing up");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white h-screen">
      <Link
        to="/"
        className="absolute top-0 left-0 mt-4 ml-4 text-white font-bold"
      >
        Home
      </Link>
      <h1 className="text-2xl mb-4">Signup</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-black text-white rounded-lg py-2 px-4 mb-4"
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-black text-white rounded-lg py-2 px-4 mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-black text-white rounded-lg py-2 px-4 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-black text-white rounded-lg py-2 px-4 mb-4"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          className="bg-black text-white rounded-lg py-2 px-4 mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already registered?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
}
export default Signup;
