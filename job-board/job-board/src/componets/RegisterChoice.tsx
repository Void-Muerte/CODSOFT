import { NavLink } from "react-router-dom";

const RegisterChoice = ({
  handleChoice,
}: {
  handleChoice: (choice: string) => void;
}) => {
  return (
    <div className="flex flex-col space-y-6 py-6">
      <h2 className="font-semibold font-raleway text-2xl text-sky-500">
        Create Account As
      </h2>
      <section className="flex flex-wrap">
        <button onClick={() => handleChoice("CAN")} className="log-btn mx-2">
          Candidate
        </button>
        <button onClick={() => handleChoice("EMP")} className="log-btn mx-2">
          Employer
        </button>
      </section>
      <fieldset className="border-t-[0.5px] border-gray-300 px-1 text-center text-gray-500 font-chakra">
        <legend>OR</legend>
        <p className="flex flex-row space-x-2 items-center">
          <span className="text-sm"> Already have an account?</span>
          <NavLink to="/login" className="text-blue-500 hover:font-bold">
            Login
          </NavLink>
        </p>
      </fieldset>
    </div>
  );
};

export default RegisterChoice;
