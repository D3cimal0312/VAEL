import React from 'react'

const ClearAllbtn = ({clearFilters}) => {
  return (
    <div>    <button
          onClick={clearFilters}
          className="px-3 py-1 text-xs bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
        >
          Clear All
        </button></div>
  )
}

export default ClearAllbtn