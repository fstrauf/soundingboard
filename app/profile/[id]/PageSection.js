import React from "react";

const PageSection = ({ children }) => {
  return (
    <section className="border-gray-400 border-[2px] p-4 w-full rounded-lg">
      {children}
    </section>
  );
};

export default PageSection;
