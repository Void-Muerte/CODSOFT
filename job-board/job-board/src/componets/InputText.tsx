import { InputChangeEvent } from "@utils/types";
import React from "react";

type InputTextProps = {
  name: string;
  value: string;
  type: string;
  myref?: React.RefObject<HTMLInputElement>;
  className: string;
  placeholder: string;
  handleChange: (e: InputChangeEvent) => void;
  disabled: boolean;
  required: boolean;
};
const InputText: React.FC<InputTextProps> = ({
  name,
  value,
  className,
  placeholder,
  handleChange,
  disabled = true,
  type,
  required,
  myref,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={handleChange}
      ref={myref}
    />
  );
};

export default InputText;
