import { useState } from "react";
import { FormSubmitEvent, InputChangeEvent } from "@utils/types";
import InputPassword from "./InputPassword";
import InputText from "./InputText";

function UpdatePassword() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const handleNewPwd = (e: InputChangeEvent) => {
    const val = e.target.value;
    if (confirmPwd && val != confirmPwd) {
      setPwdErr("Passwords do not match");
    }
    setNewPwd(val);
  };
  const handleOldPwd = (e: InputChangeEvent) => {
    setOldPwd(e.target.value);
  };
  const handleConfirmPwd = (e: InputChangeEvent) => {
    const val = e.target.value;
    if (newPwd && val != newPwd) {
      setPwdErr("Passwords do not match!");
    } else if (val == newPwd) {
      setPwdErr(null);
    }
    setConfirmPwd(val);
  };
  const emptyFields = () => {
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
  };
  const handleReset = (e: FormSubmitEvent) => {
    e.preventDefault();
    emptyFields();
  };
  return (
    <fieldset className=" rounded-md py-4 border-[0.5px] px-2 my-5 flex flex-col space-y-2 max-w-[400px] shadow-sm">
      <legend className="text-center text-lg px-0.5 text-gray-500">
        Change Password
      </legend>
      <InputText
        className="inp"
        placeholder="Enter old Password"
        type="password"
        value={oldPwd}
        name="oldPwd"
        disabled={false}
        required={true}
        handleChange={handleOldPwd}
      />
      <InputPassword
        className="inp"
        placeholder="Enter new Password"
        value={newPwd}
        name="newPwd"
        handleChange={handleNewPwd}
      />
      <InputPassword
        className="inp"
        placeholder="Confirm New Password"
        value={confirmPwd}
        name="confirmNewPassword"
        handleChange={handleConfirmPwd}
      />
      {<p className="text-rose-500 text-end text-sm italic">{pwdErr}</p>}
      <section className="flex flex-row justify-between py-2">
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
        <button className="log-btn" disabled={false}>
          Save Password
        </button>
      </section>
    </fieldset>
  );
}

export default UpdatePassword;
