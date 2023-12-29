import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@api/axios";

export default () => {
  const [isSignUser, setIsSignUser] = useState(false);
  const [signErr, setSignErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const signup = async (fullname: string, email: string, password: string) => {
    try {
      setIsSignUser(true);
      const {
        data: { created },
      } = await axiosInstance.post(
        "/auth/register/user",
        JSON.stringify({ fullname, email, password })
      );
      if (created) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const {
            data: { msg },
          } = error.response;
          setSignErr(msg);
        } else if (error.request) {
          setSignErr("Unable to connect to server!");
        } else {
          setSignErr(error.message);
        }
      } else {
        setSignErr("Unknown error occured");
      }
    } finally {
      setIsSignUser(false);
    }
  };
  return { isSignUser, signup, signErr };
};
