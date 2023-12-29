import { Rol } from "@utils/types";
import RegisterChoice from "componets/RegisterChoice";
import RegisterEmp from "componets/RegisterEmp";
import RegisterUser from "componets/RegisterUser";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Signup() {
  const [userType, setUserType] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <section className="flex flex-col space-y-2 max-w-[600px] border px-5 py-4 rounded-md shadow-md">
        <NavLink to="/" className="nav-brand w-full text-center py-4">
          Job Portal
        </NavLink>
        {!userType && (
          <RegisterChoice handleChoice={(choice) => setUserType(choice)} />
        )}
        {userType == Rol.Cand && <RegisterUser />}
        {userType == Rol.Emp && <RegisterEmp />}
      </section>
    </div>
  );
}

export default Signup;
