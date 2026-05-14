import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, LabelList, ResponsiveContainer,
} from "recharts";

const HEALTH_CONFIG = [
  { key: "outOfStock",  label: "Out of stock",   color: "#A32D2D" },

  { key: "published",   label: "Published",  color: "#b5713a" },
  { key: "draft",       label: "Draft",      color: "#E4A944" },
  { key: "archived",    label: "Archived",   color: "#99938b" },
  { key: "lowStock",    label: "Low stock",  color: "#c8893f" },
];



const ProductHealth = ({ products }) => {
  const data = HEALTH_CONFIG.map(({ key, label, color }) => ({
    name: label,
    value: products[key] ?? 0,
    color,
  }));

  return (
    <div className="py-4 bg-offwhite rounded-2xl px-4 mt-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 w-full">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-0.5">
            Inventory
          </p>
          <p className="text-base font-semibold text-ink">Product health</p>
        </div>
      

        <div className=" px-4">        
          <p className="text-2xl font-semibold  text-ink">
          {products.total} <span className='text-xl font-light text-gray-500'>Total Products</span>
        </p>
      </div>
      </div>

      {/* Chart */}
      <div className="w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 4, bottom: 0 }}
        >
          <CartesianGrid
       horizontal={false}
            strokeDasharray="5 5"
     
          />
          <XAxis
            type="number"
            tick={{ fontSize: 16, fill: "#9ca3af" }}

            tickLine={false}

          />
          <YAxis
            type="category"
            dataKey="name"

            width={100}
            tick={{ fontSize: 16, fill: "#4b4b4b" }}

            tickLine={false}
          />
          <Tooltip  />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            maxBarSize={30}
            isAnimationActive
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              style={{ fontSize: 24, fill: "#4b4b4b", fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductHealth;