import React from "react";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
interface Props {
  onNext: () => void;
}
const StepUsername = ({ onNext }: Props) => {
  return (
    <Card logo="phone.png" title="Pick a username">
      <Button text="Next" logo="arrow-forward.png" onclick={onNext} />
    </Card>
  );
};

export default StepUsername;
