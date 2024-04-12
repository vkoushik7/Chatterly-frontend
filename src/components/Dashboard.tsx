import { useEffect, useState } from "react";
import withAuth from "../middleware/withAuth";
import { getUserData, logOut } from "../services/userServices";
import { Link } from "react-router-dom";
import getRecentMessages from "../services/chatServices";

interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
}
interface Message {
  direction: string;
  partnerUsername: string;
  content: string;
  timestamp: string;
  _id: string;
}

function Dashboard() {
  const [name, setName] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await getRecentMessages();
        console.log("sender: ", messages[0].content);
        setRecentMessages(messages);
      } catch (error) {
        console.error("Error occurred while fetching messages", error);
      }
    };
    void fetchMessages();
  }, []);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMessages = recentMessages.filter((message) =>
    message.partnerUsername?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav className="bg-gray-600 text-white flex justify-between items-center w-96 py-4 px-8">
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
      <div className="flex">
        <div
          className="bg-gray-800 text-white w-96 py-4 px-6 flex flex-col overflow-y-auto"
          style={{ height: "100vh" }}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 rounded-full py-2 px-4 mb-4 focus:outline-none w-full"
            onChange={handleSearchChange}
          />
          <ul className="flex-grow">
            {filteredMessages.map((chat) => (
              <li key={chat._id} className="mb-2">
                <div>
                  <span className="font-bold">{chat.partnerUsername}</span>:{" "}
                  {chat.content}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-grow p-8 bg-gray-200">{/* Content Area */}</div>
      </div>
    </div>
  );
}
const DashboardWithAuth = withAuth(Dashboard);
export default DashboardWithAuth;
