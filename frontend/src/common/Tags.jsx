import React from "react";
import { Hexagon } from "lucide-react";

const Tags = ({ items,color="hair" }) => {
  return (
    <div>
      <p className={`text-${color}  uppercase flex items-center flex-wrap gap-0.5`}>
        {items.map((tag, i) => (
          <span key={i} className="flex items-center">
            <span >{tag}</span>
            {i < items.length - 1 && (
              <span className="w-fit px-1">
                <Hexagon size={12} color={"#d4905a"} fill={"#d4905a"} />
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Tags;