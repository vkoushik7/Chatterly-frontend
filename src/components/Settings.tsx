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
        <div className="relative">
          <button className="text-lg focus:outline-none" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container mx-auto">
        
      </div>
    </div>
  );
}

export default Settings;
