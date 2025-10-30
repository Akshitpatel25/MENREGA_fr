import React, { useEffect, useRef, useState } from "react";
import * as Chart from "chart.js";
import { useSelector } from "react-redux";

export default function StackedBarChart({ OW, CW }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const isDark = useSelector((state) => state.theme.value);
  const [monthValueByName, setMonthValueByName] = useState();
  const monthData = useSelector((state) => state.dataset.monthData);
  // const Ongoing_Work = monthlyData.Number_of_Ongoing_Works

  useEffect(() => {
    if (monthData) {
      const monthOrder = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const orderedValues = monthOrder.map((m) => monthData[m] || 0);

      setMonthValueByName(orderedValues);
    }
  }, [monthData]);

  // Track container size
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Calculate responsive sizes based on container height
      const height = containerSize.height || 300;
      const fontSize = Math.max(10, Math.min(20, height / 15));
      const padding = Math.max(10, Math.min(30, height / 15));

      // Chart data
      const data = {
        labels: [
          "Ongoining Works",
          "Completed Works",
        ],
        datasets: [
          {
            label: "Projection",
            data: [OW, CW],
            backgroundColor: "#a8c5d4",
            borderColor: "#a8c5d4",
            borderWidth: 0,
            barPercentage: 0.4,
            borderRadius: {
              topLeft: 8,
              topRight: 8,
              bottomLeft: 0,
              bottomRight: 0,
            },
            borderSkipped: false,
          },
        ],
      };

      // Chart configuration
      const config = {
        type: "bar",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (context) {
                  return (context.parsed.y).toLocaleString();
                },
              },
            },
          },
          hover: {
            mode: null,
          },
          interaction: {
            mode: null,
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                color: "#999",
                font: {
                  size: fontSize,
                },
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
              // max: 30,
              grid: {
                color: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
                drawBorder: false,
              },
              ticks: {
                display: true,
              },
              border: {
                display: false,
              },
            },
          },
        },
      };

      // Create new chart instance
      chartInstance.current = new Chart.Chart(ctx, config);
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isDark, containerSize, monthData]);

  // if (monthData == undefined) return <div>Loading...</div>
  return (
    <div
      className={`${
        isDark ? "bg-[#282828]" : "bg-[#f7f9fb]"
      } rounded-2xl h-full w-full flex flex-col`}
    >
      <h1 className=" text-lg xl:text-xl font-bold px-5 xl:px-6 pt-3 xl:pt-6 pb-2">
        Work
      </h1>
      <div
        ref={containerRef}
        className="flex-1 p-3 px-0 xl:px-6 xl:pb-6 min-h-0"
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
