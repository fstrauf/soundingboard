import React from "react";

const FormField = ({ label, text, children }) => {
  return (
    <div className="flex justify-between">
      <div className="w-1/3">
        <label className="text-white">{label}</label>
        <p className="text-xs text-gray-500">{text}</p>
      </div>
      <div className="w-2/3">{children}</div>
    </div>
  );
};

export default FormField;
