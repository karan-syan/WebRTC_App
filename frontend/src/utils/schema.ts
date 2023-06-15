import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  name: Yup.string().required("Please enter your name").min(2),
  password: Yup.string()
    .min(8, "Password must be 8 character long")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please Confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be 8 character long")
    .required("Please enter your password"),
});
