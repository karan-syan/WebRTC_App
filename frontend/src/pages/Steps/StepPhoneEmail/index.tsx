import React from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
interface Props {
  onNext: () => void;
}
const StepPhoneEmail = ({ onNext }: Props) => {
  return (
    <Card logo="phone.png" title="Enter you phone number">
      <Button text="Next" logo="arrow-forward.png" onclick={onNext} />
    </Card>
  );
};

export default StepPhoneEmail;
