// Checklist.jsx
import React from 'react';
import { PiSquare } from "react-icons/pi";
import { GiCheckMark } from "react-icons/gi";

const Checklist = ({ items }) => {
  return (
    <div className="p-4 ">
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-2 p-2 border rounded-md ${
              item.isChecked ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
            }`}
          >
            <span
              className={`font-bold border-2  rounded border-[#D7C67F]  ${
                item.isChecked ? 'text-green-600 p-1.5' : 'text-red-600 p-3'
              }`}
            >
              {item.isChecked ? <GiCheckMark  color="green" size={12} />:''}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
