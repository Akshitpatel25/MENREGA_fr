import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const DonutChart = ({ SCP = 0, STP = 0, WP = 0 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isDark = useSelector((state) => state.theme.value);

  // ✅ Correct order: WP, SCP, STP
  const numberForValue = [WP, SCP, STP].map((v) => Number(v) || 0);
  const totalNumberForValue = numberForValue.reduce((a, b) => a + b, 0);

  // Prevent division by zero
  const percentageValues =
    totalNumberForValue > 0
      ? numberForValue.map(
          (value) => ((value / totalNumberForValue) * 100).toFixed(2)
        )
      : [0, 0, 0];

  // ✅ Match labels with correct percentage index
  const salesData = [
    { label: "Women Persondays", value: Number(percentageValues[0]), amount: WP, color: "#3ACCE1" },
    { label: "SC Persondays", value: Number(percentageValues[1]), amount: SCP, color: "#FF914D" },
    { label: "ST Persondays", value: Number(percentageValues[2]), amount: STP, color: "#A3B86C" },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    // Clean up old chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Skip rendering if total = 0
    if (totalNumberForValue === 0) return;

    const ctx = chartRef.current.getContext("2d");

    const data = {
      datasets: [
        {
          data: salesData.map((item) => item.value),
          backgroundColor: salesData.map((item) => item.color),
          borderColor: salesData.map((item) => item.color),
          borderWidth: 0,
        },
      ],
    };

    // --- Initialize Chart ---
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            cornerRadius: 10,
            padding: 10,
            caretSize: 0,
            backgroundColor: isDark ? "#3a3a3a" : "#1c1c1c",
            bodyFont: {
              size: 16,
              weight: "bold",
            },
            callbacks: {
              label: function (context) {
                const index = context.dataIndex;
                const item = salesData[index];
                return `${item.value}%`;
              },
            },
          },
        },
      }
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [WP, SCP, STP, isDark, totalNumberForValue]);

  // --- UI ---
  return (
    <div
      className={`w-full h-full ${
        isDark ? "bg-[#282828]" : "bg-[#F7F9FB]"
      } rounded-2xl p-6 flex flex-col`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Total Sales
      </h2>

      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 h-fit">
        {salesData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span
                className={`text-sm ${isDark ? "text-white" : "text-black"}`}
              >
                {item.label}
              </span>
            </div>
            <span
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
