import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const PieChartComponent = () => {
  const data = [
    { name: "Very satisfied", value: 50, color: "#6D28D9" }, // Deep purple
    { name: "Satisfied", value: 20, color: "#4338CA" }, // Indigo
    { name: "Somewhat satisfied", value: 21, color: "#818CF8" }, // Light purple
    { name: "A little satisfied", value: 7, color: "#C4B5FD" }, // Lighter purple
    { name: "Not satisfied", value: 2, color: "#EDE9FE" }, // Lightest purple
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }) => {
    if (index !== 0) return null;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          className="font-medium"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${value}%`}
        </text>
        <line
          x1={cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN)}
          y1={cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN)}
          x2={x - (x > cx ? -10 : 10)}
          y2={y}
          stroke="#666"
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm p-6 w-full max-w-md"
    >
      <h3 className="text-sm font-medium text-gray-700 text-center mb-2 px-4">
        How satisfied were you with how the insurance company/agent handled the
        claim?
      </h3>

      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={CustomLabel}
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600">{entry.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PieChartComponent;
