import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FormSubmitEvent } from "@utils/types";
import useLogin from "@hooks/useLogin";
import validate from "@utils/Validations";
import ErrorMsg from "componets/ErrorMsg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { signIn, isLogging, logMessage } = useLogin();
  const redirect: string | null = location.state?.to as string | null;
  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    await signIn(email, password, redirect);
  };
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <section className="max-w-[600px] min-h-[400px] border flex flex-col py-5 space-y-10 px-3 shadow-md">
        <NavLink to="/" className="nav-brand w-full text-center py-4">
          Job Portal
        </NavLink>
        {logMessage && <ErrorMsg msg={logMessage} />}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          <section className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
            />
          </section>
          <button
            type="submit"
            className="log-btn"
            disabled={!validate(email, password) || isLogging}
          >
            Login
          </button>
          <fieldset className="border-t-[0.5px] border-gray-300 px-1 text-center text-gray-500 font-chakra">
            <legend>OR</legend>
            <p className="flex flex-row space-x-2 items-center">
              <span className="text-sm"> create a new account?</span>
              <NavLink to="/signup" className="text-blue-500 hover:font-bold">
                Sign Up
              </NavLink>
            </p>
          </fieldset>
        </form>
      </section>
    </div>
  );
}

export default Login;
