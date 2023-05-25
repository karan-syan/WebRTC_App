import React, { ReactNode } from "react";
import "./Card.css";
interface Props {
  title: string;
  logo: string;
  children: ReactNode;
}
const Card = ({ logo, title, children }: Props) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="heading-wrapper">
          <img src={`/images/${logo}`} alt="logo" height="30" />
          <h1 className="heading">&nbsp;{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
