import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "context/AuthContext";
import useLogout from "@hooks/useLogout";
import ErrorMsg from "./ErrorMsg";

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const active = "border-b-[0.25rem] py-2 border-sky-900 text-sky-800";
  const { auth } = useAuthContext();
  const { logErr, Logout, isloggingOut } = useLogout();
  const navigate = useNavigate();

  const logginOut = async () => {
    await Logout();
  };
  return (
    <header className="nav-container">
      <NavLink to="/" className="nav-brand">
        Job Portal
      </NavLink>
      <nav className="space-x-5 hidden sm:flex items-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? active : "")}>
          Home
        </NavLink>
        <NavLink to="/" className={({ isActive }) => (isActive ? active : "")}>
          Listings
        </NavLink>
        {auth && (
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Dashboard
          </NavLink>
        )}
        {!auth && (
          <span className="space-x-2">
            <NavLink
              to="/login"
              className="hover:border-b-[0.25rem] hover:py-2 hover:border-sky-900 hover:text-sky-800"
            >
              login
            </NavLink>{" "}
            |
            <NavLink
              to="/signup"
              className="hover:border-b-[0.25rem] hover:py-2 hover:border-sky-900 hover:text-sky-800"
            >
              register
            </NavLink>
          </span>
        )}
        {auth && (
          <section
            className="hidden sm:flex flex-col relative"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <i className="bi text-3xl hover:cursor-pointer rounded-full bi-person-circle"></i>
            {profileOpen && (
              <section className="absolute bottom-100 border w-[180px] px-1.5 bg-white mt-1 py-3 shadow-md rounded-sm flex flex-col space-y-1.5">
                <button
                  className="text-center py-0.5 bg-sky-900 hover:outline-sky-900 outline outline-[0.25px] outline-offset-1 rounded-sm text-white"
                  onClick={() => navigate("/account")}
                  disabled={isloggingOut}
                >
                  Account
                </button>
                <button
                  className="text-white bg-rose-500/50 px-2 hover:bg-rose-500 py-0.5 outline outline-[0.25px] outline-offset-1 rounded-sm hover:outline-rose-500"
                  onClick={logginOut}
                  disabled={isloggingOut}
                >
                  logout
                </button>
                {logErr && <ErrorMsg msg={logErr} />}
              </section>
            )}
          </section>
        )}
      </nav>
      <button className="sm:hidden absolute left-3">
        <i className="bi text-2xl text-gray-600 bi-list"></i>
      </button>
    </header>
  );
};

export default Header;
