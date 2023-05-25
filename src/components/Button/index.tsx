import React from "react";
import "./Button.css";
interface Props {
  text: string;
  logo: string;
  onclick: () => void;
}
const Button = ({ text, logo, onclick }: Props) => {
  return (
    <button className="button" onClick={onclick}>
      <span>{text}&nbsp;</span>
      <img src={`/images/${logo}`} alt="arrow" height="15" />
    </button>
  );
};

export default Button;
