import { toast } from "react-hot-toast";

/* Validate Login Page Username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

/* Validate Login Page Password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/* Validate Login Page Reset Password */
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error(
      "Password and Confirm Password must be same.....!"
    );
  }
  return errors;
}

/* *********************************************** */

/* Validate Username */
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required.....!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username.....!");
  }
  return error;
}

/* Validate Password */
function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const upperCaseChars = /[A-Z]/;

  if (!values.password) {
    errors.password = toast.error("Password Required.....!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password.....!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must have atleast 4 characters.....!"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error(
      "Password must have special characters.....!"
    );
  } else if (!upperCaseChars.test(values.password)) {
    errors.password = toast.error(
      "Password must have an uppercase letter.....!"
    );
  }
  return errors;
}
