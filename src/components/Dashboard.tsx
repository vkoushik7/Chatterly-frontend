import { useEffect, useState } from "react";
import withAuth from "../middleware/withAuth";
import { getUserData, logOut } from "../services/userServices";
import { Link } from "react-router-dom";

interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
}

function Dashboard() {
  const [name, setName] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData: UserData = await getUserData();
        setName(userData.name);
      } catch (error) {
        console.error("Error occurred while fetching user data", error);
      }
    };
    void fetchData();
  }, []);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex justify-between items-center py-4 px-8">
        <div>
          <h1 className="text-lg font-bold">Hi, {name}!</h1>
        </div>
        <div className="relative">
          <button
            onClick={handleMenuToggle}
            className="focus:outline-none text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {menu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={logOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* Content */}
    </div>
  );
}
const DashboardWithAuth = withAuth(Dashboard);
export default DashboardWithAuth;
