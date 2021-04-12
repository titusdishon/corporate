export const validateRegistrationInputs = (email,userName, password, phoneNumber) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regex =
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    if (!email.match(regex)) {
      errors.email = "Invalid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } 
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export const validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === "") {
      errors.email = "Name must not be empty";
    }
    if (password === "") {
      errors.password = "Password must not be empty";
    }
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };