import { Link, Route, Routes } from "react-router-dom";
import ChangeUsernameEmail from "./ChangeUsernameEmail";
import ChangePassword from "./ChangePassword";
import { logOut } from "../services/userServices";

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
        <div className="bg-gray-800 text-white h-screen w-64 py-4 px-6">
          <ul>
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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Settings;
