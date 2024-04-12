import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found!</h1>
      <p className="text-lg mb-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-300">
        Go back to home
      </Link>
    </div>
  );
}

export default NotFound;
