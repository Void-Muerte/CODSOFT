import { useState } from "react";
import axios from "axios";
import { axiosPrivate } from "@api/axios";
import useAuthContext from "context/AuthContext";

function useLogout() {
  const [isloggingOut, setIsLoggingOut] = useState(false);
  const [logErr, setLogErr] = useState<string | null>(null);
  const { logout } = useAuthContext();
  const Logout = async () => {
    try {
      setIsLoggingOut(true);
      const {
        data: { isLoggedOut },
      } = await axiosPrivate.get("/logout");
      if (isLoggedOut) logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const {
            data: { msg },
          } = error.response;
          setLogErr(msg);
        } else if (error.request) {
          setLogErr("Error connecting to server");
        } else {
          setLogErr(error.message);
        }
      } else {
        setLogErr("Unknown error occurred!");
      }
    } finally {
      setIsLoggingOut(false);
    }
  };
  return { logErr, Logout, isloggingOut };
}

export default useLogout;
