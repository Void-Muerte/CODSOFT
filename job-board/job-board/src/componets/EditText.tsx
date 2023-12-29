import React from "react";
import InputText from "./InputText";
import { InputChangeEvent } from "@utils/types";

type EditProps = {
  myref: React.RefObject<HTMLInputElement>;
  name: string;
  value: string;
  edit: boolean;
  handleChange: (e: InputChangeEvent) => void;
  placeholder: string;
  handleEdit: (ed: boolean) => void;
  title: string;
};
function EditText({
  myref,
  name,
  value,
  edit,
  handleChange,
  handleEdit,
  placeholder,
  title,
}: EditProps) {
  return (
    <fieldset className=" rounded-md py-3 border-[0.5px] px-2 my-5 flex flex-col space-y-2 max-w-[400px] shadow-sm items-center">
      <legend className="text-center text-lg px-0.5 text-gray-500">
        {title}
      </legend>
      <section className="flex flex-row space-x-1 items-center">
        <InputText
          type="text"
          myref={myref}
          value={value}
          handleChange={handleChange}
          name={name}
          disabled={!edit}
          required={true}
          placeholder={placeholder}
          className="inp border-transparent"
        />
        {!edit ? (
          <i
            className="bi text-gray-500 bi-pencil-square hover:cursor-pointer"
            onClick={() => handleEdit(true)}
          ></i>
        ) : (
          <i
            className="bi bi-x-circle hover:cursor-pointer text-gray-500"
            onClick={() => handleEdit(false)}
          ></i>
        )}
      </section>
      {edit && <button className="save-btn ">Save</button>}
    </fieldset>
  );
}

export default EditText;
