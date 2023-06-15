import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Authentication from "../../service/Authentication";
import { registerInit } from "../../utils/init";
import { registerSchema } from "../../utils/schema";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: registerInit,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...other } = values;
        const res = await Authentication.register(other);
        if (res) {
          navigate("/lobby");
        } else {
          console.log("fail to create user");
        }
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
          {touched.name && <p className="error">{errors.name}</p>}
          <input
            type="text"
            className="inputText"
            onBlur={handleBlur}
            value={values.name}
            name="name"
            placeholder={"Name"}
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
          {touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <input
            type="password"
            className="inputText"
            onBlur={handleBlur}
            value={values.confirmPassword}
            name="confirmPassword"
            placeholder={"Confirm Password"}
            onChange={handleChange}
          />
          <button className="button" type="submit">
            <span>{"Next"}&nbsp;</span>
            <img src={`/images/arrow-forward.png`} alt="arrow" height="15" />
          </button>
        </form>
        <div>
          <p className="bottomParagraph">
            Already have account?
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
