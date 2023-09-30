import React from 'react';

const FormField = ({ label, text, children }) => {
    return (
      <div className="flex justify-between">
        <div>
          <label className="text-white">{label}</label>
          <p className="text-xs text-gray-500">{text}</p>
        </div>
        {children}
      </div>
    );
  }

export default FormField;
