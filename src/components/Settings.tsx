import { Link, Route, Routes } from "react-router-dom";
import ChangeUsernameEmail from "./ChangeUsernameEmail";
import ChangePassword from "./ChangePassword";
import { logOut } from "../services/userServices";
import DeleteAccount from "./DeleteAccount";
import withAuth from "../middleware/withAuth";

function Settings() {
  const handleLogout = () => {
    logOut();
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
        <div>
          <span className="text-lg font-bold">Settings</span>
        </div>
        <div className="flex items-center">
          <Link to="/dashboard" className="text-lg mr-4 hover:text-white">
            Dashboard
          </Link>
          <button className="text-lg focus:outline-none" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="flex">
        {/* Left sidebar */}
        <div className="bg-gray-800 text-white min-h-screen w-64 py-4 px-6 flex flex-col justify-between overflow-y-auto">
          <ul className="flex-1 mb-4">
            <li className="mb-2">
              <Link
                to={`change-username-email`}
                className="text-gray-300 hover:text-white"
              >
                Change Username/Email
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={`change-password`}
                className="text-gray-300 hover:text-white"
              >
                Change Password
              </Link>
            </li>
          </ul>
          <hr className="my-4 border-gray-700" />
          <ul>
            <li className="mb-2">
              <Link
                to={`delete-account`}
                className="text-red-500 hover:text-white"
              >
                Delete Account
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-grow p-8">
          <Routes>
            <Route
              path="/"
              element={<h2>Please select an option from the left sidebar.</h2>}
            />
            <Route
              path="change-username-email"
              element={<ChangeUsernameEmail />}
            />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
const SettingsWithAuth: React.FC = withAuth(Settings);
export default SettingsWithAuth;
