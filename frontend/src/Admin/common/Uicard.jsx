import React from "react";
import Aos from "aos";
const Uicard = ({ title, value,subvalue1,subtitle1,subvalue2,subtitle2 }) => {
  return (
    <div className="flex flex-col  gap-2 rounded-lg text-center py-2 bg-offwhite  " >
      <div className=" text-xl font-bold text-gray-400 ">{title}</div>
      <div className="text-4xl text-ink font-bold  ">{value}</div>

<div>
      {subtitle1 && 
      <div className="text-gray-500">{subtitle1}: {subvalue1}</div>}
      {subtitle2 && 
      <div className="text-gray-500">{subtitle2}: {subvalue2}</div>
       }
</div>
       
    </div>
  );
};

export default Uicard;
