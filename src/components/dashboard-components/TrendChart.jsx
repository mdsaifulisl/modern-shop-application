import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 1. Data points to create that "wave" look
const data = [
  { x: 0, current: 20, prev: 15 },
  { x: 1, current: 28, prev: 18 },
  { x: 2, current: 25, prev: 22 },
  { x: 3, current: 50, prev: 28 }, // Peak 1
  { x: 4, current: 15, prev: 35 }, // Dip
  { x: 5, current: 38, prev: 20 }, // The "38" point
  { x: 6, current: 45, prev: 38 }, // Peak 2
  { x: 7, current: 35, prev: 25 },
];

// 2. Custom Tooltip (The white bubble with "38")
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        padding: '5px 12px',
        border: '1px solid #ececec',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '14px',
        fontWeight: 'bold',
        position: 'relative',
        transform: 'translateY(-10px)'
      }}>
        {payload[0].value}
        {/* Little arrow at bottom */}
        <div style={{
          position: 'absolute',
          bottom: '-5px',
          left: '50%',
          marginLeft: '-5px',
          width: '10px',
          height: '10px',
          backgroundColor: '#fff',
          transform: 'rotate(45deg)',
          borderRight: '1px solid #ececec',
          borderBottom: '1px solid #ececec'
        }}></div>
      </div>
    );
  }
  return null;
};

export default function App() {
  return (
    <div style={{ width: "100%", height: 400, padding: "20px", fontFamily: "sans-serif" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {/* Gradient for the blue glow under the line */}
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Horizontal lines only */}
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          
          <XAxis hide dataKey="x" />
          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />

          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
          />

          {/* Background Grey Line */}
          <Area
            type="monotone"
            dataKey="prev"
            stroke="#e2e8f0"
            strokeWidth={3}
            fill="transparent"
          />

          {/* Main Blue Line */}
          <Area
            type="monotone"
            dataKey="current"
            stroke="#3b82f6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorBlue)"
            activeDot={{ 
              r: 6, 
              fill: "#fff", 
              stroke: "#3b82f6", 
              strokeWidth: 3 
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}