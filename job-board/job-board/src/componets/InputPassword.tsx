import { InputChangeEvent } from "@utils/types";

type InPasswordProps = {
  name: string;
  value: string;
  handleChange: (e: InputChangeEvent) => void;
  className: string;
  placeholder: string;
};
function InputPassword({
  name,
  value,
  handleChange,
  className,
  placeholder,
}: InPasswordProps) {
  return (
    <input
      type="password"
      max={8}
      required
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
    />
  );
}

export default InputPassword;
