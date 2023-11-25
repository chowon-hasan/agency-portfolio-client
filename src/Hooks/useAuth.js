import AuthContext from "@/Context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const auth = useContext(AuthContext);
  const isClient = typeof window !== "undefined";

  if (!isClient && !auth) return {};

  if (!auth) {
    throw new Error(
      "You must wrap your application with AuthProvider of use the useAuth"
    );
  }
  return auth;
};

export default useAuth;
