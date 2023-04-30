import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUserProfile = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export const ProtectPasswordRoute = ({ children }) => {
  const { username } = useAuthStore((state) => state.auth);

  if (!username) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
