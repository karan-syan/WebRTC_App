import React, { useState } from "react";
import StepOtp from "../Steps/StepOtp";
import StepPhoneEmail from "../Steps/StepPhoneEmail";
const steps = [StepPhoneEmail, StepOtp];

const Login = () => {
  const [step, setStep] = useState<number>(0);
  const Step = steps[step];
  const handleNavigation = () => {
    if (step < 1) {
      setStep((prev) => prev + 1);
    }
  };
  return <Step onNext={handleNavigation} />;
};

export default Login;
