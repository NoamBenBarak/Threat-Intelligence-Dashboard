import { UI_TEXT } from "../constants/consts.js";

export const InputField = ({ setIp, handleCheck }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.info(`User pressed Enter key in input field`);
      handleCheck();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setIp(value);
  };

  return (
    <input
      type="text"
      placeholder={UI_TEXT.PLACEHOLDER}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="input-field"
    />
  );
};
