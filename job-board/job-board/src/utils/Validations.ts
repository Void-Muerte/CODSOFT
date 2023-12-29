export default function validate(email: string, password: string) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (email === "" || password.length < 8 || !emailRegex.test(email))
    return false;
  return true;
}

export const validateUser = (
  email: string,
  password: string,
  fullname: string,
  confirmPassword: string
) => {
  if (
    !validate(email, password) ||
    fullname.length < 3 ||
    confirmPassword.length < 8 ||
    confirmPassword != password
  ) {
    return false;
  }
  return true;
};
export const validateEmp = (
  name: string,
  email: string,
  location: string,
  confirmPassword: string,
  password: string
) => {
  if (
    !validate(email, password) ||
    name.length < 3 ||
    location.length < 3 ||
    confirmPassword.length < 8 ||
    confirmPassword != password
  ) {
    return false;
  }
  return true;
};
