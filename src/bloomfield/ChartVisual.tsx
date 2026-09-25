import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { useReducedMotion } from "motion/react";
export default function ChartVisual({
  labels,
  values,
  unit,
}: {
  labels: string[];
  values: (number | null)[];
  unit: string;
}) {
  const reduced = useReducedMotion();
  const data = labels.map((label, i) => ({ label, value: values[i] }));
  return (
    <div
      style={{ width: "100%", height: 270, minWidth: 0 }}
      role="group"
      aria-label="Interactive chart. Equivalent values are in the data table below."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, bottom: 20, left: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e0e8d9"
          />
          <XAxis
            dataKey="label"
            tick={{ fill: "#4f6544", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#4f6544", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip
            cursor={{ fill: "#eef3e6" }}
            formatter={(value) => [`${value}${unit}`, "Value"]}
            contentStyle={{ borderRadius: 10, border: "1px solid #d4e0c8" }}
          />
          <Bar
            dataKey="value"
            radius={[5, 5, 0, 0]}
            maxBarSize={65}
            isAnimationActive={!reduced}
            animationDuration={300}
          >
            {data.map((d, i) => (
              <Cell key={d.label} fill={i === 1 ? "#cfaf37" : "#24523d"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
