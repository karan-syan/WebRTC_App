import React from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
interface Props {
  onNext: () => void;
}
const StepAvatar = ({ onNext }: Props) => {
  return (
    <Card logo="phone.png" title="Okay, Rakesh k!">
      <Button text="Next" logo="arrow-forward.png" onclick={onNext} />
    </Card>
  );
};

export default StepAvatar;
