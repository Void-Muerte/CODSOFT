import { useState } from "react";
import { FormSubmitEvent, InputChangeEvent } from "@utils/types";
import useRegEmp from "@hooks/useRegEmp";
import InputText from "./InputText";
import ErrorMsg from "./ErrorMsg";
import { validateEmp } from "@utils/Validations";

function RegisterEmp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErr, setPassworderr] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebSite] = useState("");
  const { isEmpLoading, signup, signErr } = useRegEmp();

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    await signup(name, email, password, website, location);
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
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocation("");
    setPassworderr("");
    setWebSite("");
  };
  const validate = validateEmp(
    name,
    email,
    location,
    confirmPassword,
    password
  );
  return (
    <section className="flex flex-col space-y-3">
      <h2 className="text-center py-4">Employer Registeration</h2>
      {signErr && <ErrorMsg msg={signErr as string} />}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <InputText
          type="text"
          name="name"
          value={name}
          disabled={isEmpLoading}
          required={true}
          placeholder="Employer Name"
          handleChange={(e) => setName(e.target.value)}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="text"
          name="location"
          value={location}
          disabled={isEmpLoading}
          required={true}
          placeholder="Address"
          handleChange={(e) => setLocation(e.target.value)}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="email"
          name="email"
          value={email}
          disabled={isEmpLoading}
          required={true}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="url"
          name="webiste"
          value={website}
          disabled={isEmpLoading}
          required={false}
          placeholder="Website, if any"
          handleChange={(e) => setWebSite(e.target.value)}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="password"
          name="password"
          value={password}
          disabled={isEmpLoading}
          required={true}
          placeholder="Password"
          handleChange={handlePassword}
          className="py-1.5 px-2 border rounded-md focus:outline-sky-600"
        />
        <InputText
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          disabled={isEmpLoading}
          required={true}
          placeholder="Confirm Password"
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
            disabled={!validate || isEmpLoading}
          >
            Sign up
          </button>
        </section>
      </form>
    </section>
  );
}

export default RegisterEmp;
