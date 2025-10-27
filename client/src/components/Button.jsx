import React from "react";
import { UI_TEXT } from "../constants/consts.js";

export const Button = ({ handleCheck, disabled = false }) => {
  const handleClick = () => {
    console.info(`User clicked Check button`);
    handleCheck();
  };

  return (
    <button 
      onClick={handleClick} 
      className="check-button"
      disabled={disabled}
    >
      {disabled ? UI_TEXT.CHECKING_BUTTON : UI_TEXT.CHECK_BUTTON}
    </button>
  );
};
