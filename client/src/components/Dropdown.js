import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Dropdown = ({ actions, onSelect, itemId, itemType, mainText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (itemId, option) => {
    setIsOpen(false);
    onSelect(itemId, itemType, option);
  };

  if (!Boolean(mainText)) {
    mainText = "Select action";
  }
  return (
    <div className="w-fit" onClick={(e) => e.preventDefault()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-b-1 border-[#999494] p-2 hover:bg-lightBlue rounded-sm"
      >
        {mainText}
        {!isOpen && <MdExpandMore className="ml-1" />}
        {isOpen && <MdExpandLess className="ml-1" />}
      </button>
      {isOpen && (
        <ul className="p-2">
          {actions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(itemId, option)}
              className="my-1 py-1 hover:bg-lightBlue hover:cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
