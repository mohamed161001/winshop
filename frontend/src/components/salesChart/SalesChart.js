import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SalesChart = ({ isDashboard = false, view }) => {
  const color = "#4B4EFC"; // Blue color

  // Static data
  const data = [
    { month: "Jan", totalSales: 1000, totalUnits: 50 },
    { month: "Fév", totalSales: 1500, totalUnits: 70 },
    { month: "Mar", totalSales: 2000, totalUnits: 90 },
    { month: "Avr", totalSales: 1800, totalUnits: 80 },
    { month: "Mai", totalSales: 4200, totalUnits: 100 },
    { month: "Juin", totalSales: 2500, totalUnits: 120 },
    { month: "Juil", totalSales: 1000, totalUnits: 150 },
    { month: "Aou", totalSales: 3500, totalUnits: 170 },
    { month: "Sept", totalSales: 3000, totalUnits: 190 },
    { month: "Oct", totalSales: 4500, totalUnits: 210 },
    { month: "Nov", totalSales: 5000, totalUnits: 230 },
    { month: "Dec", totalSales: 500, totalUnits: 250 },
  ];

  const totalSalesArea = {
    id: "totalSales",
    data: data.map(({ month, totalSales }) => ({ x: month, y: totalSales })),
  };

  const totalUnitsArea = {
    id: "totalUnits",
    data: data.map(({ month, totalUnits }) => ({ x: month, y: totalUnits })),
  };

  if (!data) return "Loading...";

  return (
    <AreaChart
      width={500}
      height={320}
      data={view === "sales" ? totalSalesArea.data : totalUnitsArea.data}
      margin={{ top: 20, right: 30, bottom: 0, left: 0 }}
    >
      <XAxis 
      dataKey="x"
       stroke={color}
        tickLine={false} 
        axisLine={false}
        style={{ fontSize: "13px", lineHeight: "17px" }}
        />
      <YAxis 
      stroke={color}
        tickLine={false}
        axisLine={false}
        style={{ fontSize: "10px", lineHeight: "17px" }}
       />
      <Tooltip containerStyle={{ backgroundColor: color }} />
      
      <Area
        type="monotone"
        dataKey="y"
        stroke={color}
        fill={color}
        dot={true}
        strokeWidth={1}
        activeDot={{ r: 8 }}
        name={view === "sales" ? "Total Sales" : "Total Units"}
      >
        <defs>
          <linearGradient id="colorTotalSales" x1="0" y1="0" x2="0" y2="2">
            <stop offset="20%" stopColor={color} stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </Area>
    </AreaChart>
  );
};

export default SalesChart;
