import { useEffect, useRef, useState } from "react";
import { InputChangeEvent } from "@utils/types";
import UpdatePassword from "./UpdatePassword";
import EditText from "./EditText";

function UserProfile() {
  const [fullname, setFullName] = useState("Psychology Simango");
  const [edit, setEdit] = useState(false);
  const fullNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit && fullNameRef.current) {
      fullNameRef.current.focus();
    }
  }, [edit]);
  const handleFullNameChange = (e: InputChangeEvent) => {
    setFullName(e.target.value);
  };
  const handleEdit = (ed: boolean) => {
    setEdit(ed);
  };

  return (
    <div>
      <section className="bg-gray-300 h-[15vh]"></section>
      <section className="flex flex-col items-center justify-center space-y-2 ">
        <div className="w-[150px] h-[150px] bg-gray-500 outline outline-[0.25rem] -mt-[75px] rounded-sm outline-white outline-offset-4"></div>
        <p className="italic text-gray-700">psicologia@gmail.com</p>
        <section>
          <EditText
            name="fullname"
            title="Full Name"
            value={fullname}
            handleChange={handleFullNameChange}
            myref={fullNameRef}
            edit={edit}
            handleEdit={handleEdit}
            placeholder="Enter full Name"
          />
          <UpdatePassword />
        </section>
      </section>
    </div>
  );
}

export default UserProfile;
