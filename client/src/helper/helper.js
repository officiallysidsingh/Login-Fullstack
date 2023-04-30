import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_URI;

/* Make API Request */

/* Get Username from Token */

export const getUsername = async () => {
  const token = localStorage.getItem("token");
  if (!token) return Promise.return("Cannot Find Token...!");

  let decode = jwt_decode(token);
  return decode;
};

/* Authenticate Function */
export const authenticate = async (username) => {
  try {
    const res = await axios.post("/api/authenticate", { username });
    return res.data;
  } catch (error) {
    return error.response.status;
  }
};

/* Get User Details */
export const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match!" };
  }
};

/* Register User Function */

export const registerUser = async (credentials) => {
  try {
    // if any error remove data: {message} and use data directly
    const {
      data: { message },
      status,
    } = await axios.post("/api/register", credentials);
    let { username, email } = credentials;

    // Send Email
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }
    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
};

/* Login User Function */

export const loginUser = async ({ username, password }) => {
  try {
    if (username) {
      const res = await axios.post("/api/login", { username, password });
      return res.data;
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
};

/* Update User Function */

export const updateUser = async (response) => {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
};

/* Generate OTP Function */

export const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", {
      params: { username },
    });

    if (status === 200) {
      let {
        data: { email },
      } = await getUser({ username });

      let text = `Your Password Recovery OTP is ${code}`;

      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
};

/* Verify OTP Function */

export const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });

    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};

/* Reset Password Function */

export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
};
