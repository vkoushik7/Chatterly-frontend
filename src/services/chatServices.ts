import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL as string;

interface Message {
    direction: string;
    partnerUsername: string;
    content: string;
    timestamp: string;
    _id: string;
}
const getRecentMessages = async (): Promise<Message[]> => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
        return Promise.reject("Unauthorized");
    }
    try {
        const res = await axios.get(`${API_URL}/chat`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token}`,
            }
        });
        // console.log(res.data);
        return res.data as Message[];
    } catch (error: any) {
        console.error("Error occurred while changing user account", error);
        if (error.response) {
          throw new Error(String(error.response.data));
        } else {
          throw new Error("An error occurred while changing the account");
        }
      }
};

export default getRecentMessages;