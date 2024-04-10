import { Link } from "react-router-dom";
import { useState } from "react";
import login from "../services/login";

interface LoginData {
  email: string;
  password: string;
}
interface LoginResponse {
  success: boolean;
  message: string;
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }
    setError("");
    console.log("Form submitted");
    const loginData: LoginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res: LoginResponse = await login(loginData);
      setError(res.message);
      if (res.success) {
        //setError("Login successful. Redirecting to home page...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error) {
      console.error("Error occurred while LOGIN", error);
      setError("Error occurred while LOGIN");
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
      <h1 className="text-2xl mb-4">Login</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="text"
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Not registered yet?{" "}
        <a href="/signup" className="text-blue-500">
          Signup
        </a>
      </p>
    </div>
  );
}
export default Login;
