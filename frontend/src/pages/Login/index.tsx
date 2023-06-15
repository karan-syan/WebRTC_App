import React, { FormEventHandler, useState } from "react";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/schema";
import { loginInit } from "../../utils/init";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: loginInit,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        auth.login({ email, password });
        navigate("/");
      } catch (err) {}
    },
  });
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    formik;

  return (
    <div className="cardWrapper">
      <Card logo="email2.png" title="Login Using Your Email">
        <form className="column-wrapper" onSubmit={handleSubmit}>
          {touched.email && <p className="error">{errors.email}</p>}
          <input
            type="email"
            className="inputText"
            onBlur={handleBlur}
            value={values.email}
            name="email"
            placeholder={"Email"}
            onChange={handleChange}
          />
          {touched.password && <p className="error">{errors.password}</p>}
          <input
            type="password"
            className="inputText"
            onBlur={handleBlur}
            value={values.password}
            name="password"
            placeholder={"Password"}
            onChange={handleChange}
          />
          <button className="button" type="submit">
            <span>{"Next"}&nbsp;</span>
            <img src={`/images/arrow-forward.png`} alt="arrow" height="15" />
          </button>
        </form>
        <div>
          <p className="bottomParagraph">
            don't have account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>{" "}
      </Card>
    </div>
  );
};

export default Login;
