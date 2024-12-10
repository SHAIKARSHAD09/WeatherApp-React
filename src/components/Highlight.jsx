import React from "react";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="bg-sky-700 text-white p-4 rounded-md ">
      <div>
        <div className="text-4xl">{title} </div>
        <div className="flex items-center justify-evenly">
          <Icon className="text" />
          <p className="text-3xl">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightBox;
