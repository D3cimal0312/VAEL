import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PALETTE = ["#b5713a", "#c8893f", "#d4a06a", "#99938b", "#c4bdb6"];



const TopSellingCategories = ({ categories }) => {
  const total = categories.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="py-4 bg-offwhite rounded-2xl px-4 mt-4 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Overview</p>
          <p className="text-lg font-semibold text-gray-900">Top selling categories</p>
        </div>
        <p className="text-xs text-gray-400">
          {total.toLocaleString()} total sold
        </p>
      </div>

      {/* Body */}
      <div className="flex items-start flex-wrap gap-10">
        {/* Donut */}
        <div className="relative shrink-0" style={{ width: 300, height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip  />
              <Pie
                data={categories}
                dataKey="count"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={118}
                cornerRadius={4}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
                isAnimationActive
                animationDuration={1400}
                animationEasing="ease-out"
              >
                {categories.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centre label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p
              className="m-0 leading-tight font-medium text-3xl"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-lux)" }}
            >
              {total.toLocaleString()}
            </p>
            <p
              className="mt-1 m-0 text-[11px] uppercase tracking-widest"
              style={{ color: "var(--color-hair)" }}
            >
              total sold
            </p>
          </div>
        </div>

        {/* Legend */}
     <div className="flex-1 pt-4 overflow-x-auto">
  <table className="w-full text-sm border-collapse">
    <thead>
      <tr className="border-b border-hair/30">
        <th className="text-left text-[11px] uppercase tracking-widest text-gray-400 pb-2 font-medium w-6" />
        <th className="text-left text-[11px] uppercase tracking-widest text-gray-400 pb-2 font-medium">Category</th>
        <th className="text-right text-[11px] uppercase tracking-widest text-gray-400 pb-2 font-medium">Sales</th>
        <th className="text-right text-[11px] uppercase tracking-widest text-gray-400 pb-2 font-medium">Share</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((d, i) => {
        const pct = Math.round((d.count / total) * 100);
        return (
          <tr
            key={d.name}
            className="border-b border-hair/10 last:border-0 hover:bg-cream/40 transition-colors"
          >
            {/* colour dot */}
            <td className="py-2.5 pr-2">
              <span
                className="w-2 h-2 rounded-full block"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
            </td>

            {/* name */}
            <td className="py-2.5 capitalize text-[13px] text-ink flex-1">
              {d.name}
            </td>

            {/* count */}
            <td className="py-2.5 text-right text-[13px] font-medium tabular-nums"
              style={{ color: "var(--color-lux)" }}>
              {d.count}
            </td>

            {/* share bar  */}
            <td className="py-2.5 text-right text-[13px] text-gray-400 tabular-nums w-28">
              <div className="flex items-center justify-end gap-2">
                <span className="w-8 text-right">{pct}%</span>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


      </div>
    </div>
  );
};

export default TopSellingCategories;