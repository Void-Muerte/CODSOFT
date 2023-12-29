import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuthContext from "context/AuthContext";
import { AuthUser, Rol } from "@utils/types";
import Applications from "componets/Applications";
import Vacancies from "componets/Vacancies";

function DashLayout() {
  const { auth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  if (!auth) {
    navigate("/login", { state: { to: location } });
    return;
  }
  const { role } = auth as AuthUser;

  return (
    <>
      {role == Rol.Cand ? (
        <Applications />
      ) : role == Rol.Emp ? (
        <Vacancies />
      ) : (
        <Navigate to="/error" replace={true} />
      )}
    </>
  );
}

export default DashLayout;
