import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, LabelList, ResponsiveContainer,
} from 'recharts';

const STATUS_CONFIG = [
  { key: 'delivered',  label: 'Delivered', color: '#b5713a' },
  { key: 'confirmed',  label: 'Confirmed', color: '#c8893f' },
  { key: 'shipped',    label: 'Shipped',   color: '#1D9E75' },
  { key: 'pending',    label: 'Pending',   color: '#E4A944' },
  { key: 'cancelled',  label: 'Cancelled', color: '#A32D2D' },
];

const CustomTooltip = ({ active, payload, total }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  const pct = ((d.value / total) * 100).toFixed(1);
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm shadow-sm">
      <p className="font-semibold text-gray-900 mb-1">{d.name}</p>
      <p className="text-gray-500">{d.value.toLocaleString()} orders · {pct}%</p>
    </div>
  );
};

const OrderStatus = ({ ordersData }) => {
  const data = STATUS_CONFIG.map(({ key, label, color }) => ({
    name: label,
    value: ordersData[key] ?? 0,
    color,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
<div className="w-full py-6  h-full bg-offwhite rounded-2xl px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-lg font-semibold text-gray-900">Order status</p>
        </div>

                <p className="text-2xl font-semibold  text-ink">
          {total.toLocaleString()} <span className='text-xl font-light text-gray-500'>Total orders</span>
        </p>
      </div>


      {/* Legend */}
      <div className=" gap-3 mt-4">
        {data.map(d => (
          <div key={d.name} className="flex items-center justify-between
          py-2 border-b  gap-1.5 text-lg text-gray-500 hover:bg-cream/40 transition-colors ">
            <div className='flex items-center gap-1.5'>
            <span
              className="w-2 h-4 rounded-sm  "
              style={{ background: d.color }}
            />
            {d.name}
            </div>
            <p className="text-2xl text-gray-800">
              {d.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;