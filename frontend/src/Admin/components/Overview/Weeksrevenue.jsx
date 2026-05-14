import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs border"
      style={{ background: "var(--color-cream-light, #faf6f0)", borderColor: "#d4905a44" }}
    >
      <p className="mb-0.5 font-medium" style={{ color: "var(--color-ink)" }}>
        {label}
      </p>
      <p className="m-0" style={{ color: "var(--color-lux)" }}>
        {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const WeeksRevenue = ({ revenueData }) => {
  const total = revenueData?.reduce((sum, d) => sum + (d.total ?? 0), 0) ?? 0;

  return (
    <div className="py-6 px-4 bg-offwhite rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>

          <p className="text-lg font-semibold text-gray-900">Weekly revenue</p>
        </div>
        <p className="text-2xl font-semibold  text-ink">
          {total.toLocaleString()} <span className='text-xl font-light text-gray-500'>Total</span>
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              width={48}
                 />

<CartesianGrid stroke="#ccc"  strokeDasharray="5 5"/>

<Tooltip/>
            <Area
              type="monotone"
              dataKey="total"
              stroke="#b5713a"
              strokeWidth={2}
              fill="#b5713a"
              dot={false}

              isAnimationActive
              animationDuration={1600}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeksRevenue;