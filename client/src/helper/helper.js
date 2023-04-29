import axios from "axios";

/* Make API Request */

/* Authenticate Function */
export const authenticate = async (username) => {
  try {
    const res = await axios.post("/api/authenticate", { username });
    return res.data;
  } catch (error) {
    return { error: "Username doesn't exist" };
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
