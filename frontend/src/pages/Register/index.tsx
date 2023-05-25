import { useState } from "react";
import Card from "../../components/Card";
import StepAvatar from "../Steps/StepAvatar";
import StepName from "../Steps/StepName";
import StepOtp from "../Steps/StepOtp";
import StepPhoneEmail from "../Steps/StepPhoneEmail";
import StepUsername from "../Steps/StepUsername";
import "./Register.css";
const steps = [StepPhoneEmail, StepOtp, StepName, StepAvatar, StepUsername];
const Register = () => {
  const [step, setStep] = useState<number>(0);
  const Step = steps[step];
  const handleNavigation = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };
  return <Step onNext={handleNavigation} />;
};

export default Register;
