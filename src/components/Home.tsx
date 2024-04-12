import { Link } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white h-screen">
      <h1 className="text-2xl mb-4">Chatting</h1>
      <div className="flex">
        <Link
          to="/login"
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l m-2"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r m-2"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
