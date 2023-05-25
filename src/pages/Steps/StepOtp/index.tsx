import React from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
interface Props {
  onNext: () => void;
}
const StepOtp = ({ onNext }: Props) => {
  return (
    <Card logo="lock.png" title="Enter the code we just texted you">
      <Button text="Next" logo="arrow-forward.png" onclick={onNext} />
    </Card>
  );
};

export default StepOtp;
