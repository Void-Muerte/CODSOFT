import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@api/axios";
import axios from "axios";
import useAuthContext from "context/AuthContext";
import { decodeToken } from "@utils/Tokens";
import { Rol } from "@utils/types";

const useLogin = () => {
  const [logMessage, setLogMessage] = useState<string | null>(null);
  const [isLogging, setIsLogging] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const ACCESS = import.meta.env.VITE_ACCESS;

  const signIn = async (
    email: string,
    password: string,
    redirect: string | null
  ) => {
    try {
      setIsLogging(true);
      const {
        data: { accessToken },
      } = await axiosInstance.post(
        "/auth/login",
        JSON.stringify({ email, password })
      );
      localStorage.setItem(ACCESS, accessToken);
      const { id, role, token } = decodeToken(accessToken);
      login({ id, role, token });
      const red = role == Rol.Cand ? "user" : "employer";
      const redPath = `/dashboard/${redirect ? redirect : red}`;
      navigate(redPath, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const {
            data: { msg },
          } = error.response;
          setLogMessage(msg);
        } else if (error.request) {
          setLogMessage("Failed to connect to server");
        } else {
          setLogMessage(error.message);
        }
      } else {
        setLogMessage("Unknown error occured!");
      }
    } finally {
      setIsLogging(false);
    }
  };
  return { signIn, isLogging, logMessage };
};

export default useLogin;
