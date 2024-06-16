// Checklist.jsx
import React from 'react';

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
              className={`font-bold ${
                item.isChecked ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.isChecked ? '✓' : '𐄂'}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
