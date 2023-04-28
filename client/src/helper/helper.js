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
export const getUser = async (username) => {
  try {
    const res = await axios.get(`/api/user/${username}`);
    return res.data;
  } catch (error) {
    return { error: "Password doesn't match!" };
  }
};
