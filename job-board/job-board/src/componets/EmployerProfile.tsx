import { useState, useEffect, useRef } from "react";
import EditText from "./EditText";
import { InputChangeEvent } from "@utils/types";
import UpdatePassword from "./UpdatePassword";

function EmployerProfile() {
  const [name, setName] = useState("TicketZone");
  const [nameEdit, setNameEdit] = useState(false);
  const [nameAct, setNameAct] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loc, setLoc] = useState("Chipinge, Zimbabwe");
  const [locEdit, setLocEdit] = useState(false);
  const [locAct, setLocAct] = useState(false);
  const locationRef = useRef<HTMLInputElement>(null);
  const [webiste, setWebsite] = useState("www.muchovha.com");
  const [webEdit, setWebEdit] = useState(false);
  const [webAct, setWebAct] = useState(false);
  const webRef = useRef<HTMLInputElement>(null);

  console.log(nameAct, locAct, webAct);
  /** change handlers */
  const handleNameChange = (e: InputChangeEvent) => {
    setName(e.target.value);
  };
  const handleLocChange = (e: InputChangeEvent) => {
    setLoc(e.target.value);
  };
  const handleWebChange = (e: InputChangeEvent) => {
    setWebsite(e.target.value);
  };
  /** Edit handlers */
  const handleNameEdit = (ed: boolean) => {
    setNameAct(ed);
    setNameEdit(ed);
  };
  const handleLocEdit = (ed: boolean) => {
    setLocAct(ed);
    setLocEdit(ed);
  };
  const handleWebEdit = (ed: boolean) => {
    setWebAct(ed);
    setWebEdit(ed);
  };
  /** effects to focus elements */
  useEffect(() => {
    if (nameEdit && nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameEdit]);
  useEffect(() => {
    if (locEdit && locationRef.current) {
      locationRef.current.focus();
    }
  }, [locEdit]);
  useEffect(() => {
    if (webEdit && webRef.current) {
      webRef.current.focus();
    }
  }, [webEdit]);
  return (
    <div>
      <section className="bg-gray-300 h-[15vh]"></section>
      <section className="flex flex-col items-center justify-center space-y-2">
        <div className="w-[150px] h-[150px] bg-gray-500 outline outline-[0.25rem] -mt-[75px] rounded-sm outline-white outline-offset-4"></div>
        <p className="italic text-gray-700">psicologia@gmail.com</p>
        <section className="flex flex-col">
          <EditText
            name="name"
            value={name}
            title="Name"
            placeholder="Edit Name"
            edit={nameEdit}
            handleChange={handleNameChange}
            myref={nameRef}
            handleEdit={handleNameEdit}
          />
          <EditText
            name="location"
            value={loc}
            title="Location"
            placeholder="Edit Location"
            edit={locEdit}
            handleChange={handleLocChange}
            myref={locationRef}
            handleEdit={handleLocEdit}
          />
          <section>
            <EditText
              name="website"
              value={webiste}
              title="Website"
              placeholder="Edit Website"
              edit={webEdit}
              handleChange={handleWebChange}
              myref={webRef}
              handleEdit={handleWebEdit}
            />
          </section>
          <UpdatePassword />
        </section>
      </section>
    </div>
  );
}

export default EmployerProfile;
