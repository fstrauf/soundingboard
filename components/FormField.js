import React from "react";

const FormField = ({ label, text, children }) => {
  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div className="mb-3 md:mb-0 md:w-1/3">
        <label className="text-white">{label}</label>
        <p className="text-xs text-gray-500">{text}</p>
      </div>
      <div className="md:w-2/3">{children}</div>
    </div>
  );
};

export default FormField;
