import axios,{ AxiosResponse} from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL as string;

interface LoginData {
    email: string;
    password: string;
}
interface LoginResponse {
    success: boolean;
    message: string;
}
const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/login`,
        JSON.stringify({
          email: `${data.email}`,
          password: `${data.password}`,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        localStorage.setItem('auth-token', response.data as string);
        return { success: true, message: '' };
      } else {
        return { success: false, message: response.data as string};
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { success: false, message: error.response.data as string };
        } else if (error.request) {
          return { success: false, message: 'No response received from server' };
        } else {
          return { success: false, message: 'Error occurred while sending request' };
        }
      } else {
        return { success: false, message: 'Unexpected error occurred' };
      }
    }
  };

export default login;