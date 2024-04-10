import axios,{AxiosResponse} from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL as string;

interface SignupResponse {
    success: boolean;
    message: string;
}

interface SignupData {
    name: string;
    username: string;
    email: string;
    password: string;
}

const signup = async (data: SignupData): Promise<SignupResponse> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/signup`,
        JSON.stringify({ 
            name: `${data.name}`,
            username: `${data.username}`,
            email: `${data.email}`,
            password: `${data.password}`,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
        console.log(response);
        if (response.status === 200) {
            return { success: true, message: 'Account successfully created' };
        } else if (response.status === 201) {
            return { success: true, message: 'Account created and email verification sent' };
        } else if (response.status === 400) {
            return { success: false, message: 'Bad request: invalid data' };
        } else if (response.status === 401) {
            return { success: false, message: 'Unauthorized: invalid credentials' };
        } else if (response.status === 403) {
            return { success: false, message: 'Forbidden: access denied' };
        } else if (response.status === 409) {
            return { success: false, message: 'Conflict: resource already exists' };
        } else if (response.status === 500) {
            return { success: false, message: 'Internal server error' };
        } else {
            return { success: false, message: 'Unexpected error occurred' };
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

export default signup;