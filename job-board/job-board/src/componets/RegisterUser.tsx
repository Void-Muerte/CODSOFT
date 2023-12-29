import { FormSubmitEvent, InputChangeEvent } from "@utils/types";
import { useState } from "react";
import InputText from "./InputText";
import useRegUser from "@hooks/useRegUser";
import ErrorMsg from "./ErrorMsg";
import { validateUser } from "@utils/Validations";

function RegisterUser() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErr, setPassworderr] = useState("");
  const { isSignUser, signup, signErr } = useRegUser();

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    await signup(fullname, email, password);
  };
  const handleConfirmPassword = (e: InputChangeEvent) => {
    const val = e.target.value;
    if (val !== password && password !== "") {
      setPassworderr("password do not match");
    }
    if (val == password) {
      setPassworderr("");
    }
    setConfirmPassword(val);
  };
  const handlePassword = (e: InputChangeEvent) => {
    const val = e.target.value;
    if (val !== confirmPassword && confirmPassword !== "") {
      setPassworderr("password do not match");
    }
    if (val == confirmPassword) {
      setPassworderr("");
    }
    setPassword(val);
  };
  const handleReset = (e: FormSubmitEvent) => {
    e.preventDefault();
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPassworderr("");
  };
  const validate = validateUser(email, password, fullname, confirmPassword);
  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-center py-3">Candidate Registration</h2>
      {signErr && <ErrorMsg msg={signErr} />}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <InputText
          type="text"
          name="fullname"
          value={fullname}
          placeholder="Full Name"
          required={true}
          disabled={isSignUser}
          handleChange={(e) => setFullName(e.target.value)}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          required={true}
          disabled={isSignUser}
          handleChange={(e) => setEmail(e.target.value)}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          required={true}
          disabled={isSignUser}
          handleChange={handlePassword}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          required={true}
          disabled={isSignUser}
          handleChange={handleConfirmPassword}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        {passwordErr && (
          <p className="text-rose-400 text-center italic">{passwordErr}</p>
        )}
        <section className="flex flex-row justify-between py-2">
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
          <button
            type="submit"
            className="log-btn"
            disabled={!validate || isSignUser}
          >
            Sign up
          </button>
        </section>
      </form>
    </section>
  );
}

export default RegisterUser;
