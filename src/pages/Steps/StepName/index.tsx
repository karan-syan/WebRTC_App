import React from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
interface Props {
  onNext: () => void;
}
const StepName = ({ onNext }: Props) => {
  return (
    <Card logo="phone.png" title="What's your full name?">
      <Button text="Next" logo="arrow-forward.png" onclick={onNext} />
    </Card>
  );
};

export default StepName;
