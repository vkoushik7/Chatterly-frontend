import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL as string;

interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface UserDataChange {
  name: string;
  username: string;
  email: string;
}

let userData: UserData;

const getUserData = async (): Promise<UserData> => {
  const token = localStorage.getItem("auth-token");
  if (!token) {
    throw new Error("Token not found");
  }
  try {
    const res = await axios.get(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
    if (res.status === 200) {
      userData = res.data as UserData;
      return userData;
    } else {
      throw new Error("Error occurred while fetching user data");
    }
  } catch (error) {
    console.error("Error occurred while fetching user data", error);
    throw new Error("Error occurred while fetching user data");
  }
};

const changeUserData = async (data: UserDataChange): Promise<string> => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        throw new Error('Token not found');
    }
    try {
        const res = await axios.put(`${API_URL}/users`, {
              name: `${data.name}`,
              username: `${data.username}`,
              email: `${data.email}`,
            }, {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': `${token}`,
          },
        });
        if (res.status === 200) {
          return "User data updated successfully";
        }
        else {
            console.log(res.data);
            throw new Error(String(res.data));
        }
    } catch (error: any) {
      console.log(error);
      throw new Error(String(error.response.data));
    }
};

const changePassword = async (data: { oldPassword: string; newPassword: string }): Promise<string> => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        throw new Error('Token not found');
    }
    try {
        const res = await axios.put(`${API_URL}/users/password`, {
              oldPassword: `${data.oldPassword}`,
              newPassword: `${data.newPassword}`,
            }, {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': `${token}`,
          },
        });
        if (res.status === 200) {
          return "Password updated successfully";
        }
        else {
            console.log(res.data);
            throw new Error(String(res.data));
        }
    } catch (error: any) {
      console.log(error);
      throw new Error(String(error.response.data));
    }
};

const logOut = () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        throw new Error('Token not found');
    }
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
}
export { getUserData, changeUserData,changePassword, logOut};