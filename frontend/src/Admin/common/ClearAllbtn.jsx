import React from "react";

const ClearAllbtn = ({ clearFilters }) => {
  return (
    <div className="W-FIT">
      {" "}
      <button
        onClick={clearFilters}
        className="px-3 py-1 text-xs bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors
        whitespace-nowrap"
      >
        Clear All
      </button>
    </div>
  );
};

export default ClearAllbtn;
