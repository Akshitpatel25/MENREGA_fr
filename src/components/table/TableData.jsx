import React from "react";
import { useSelector } from "react-redux";

function TableData({ sumData }) {
  const isDark = useSelector((state) => state.theme.value);

  // Helper to convert key like "Women_Persondays" => "Women Persondays"
  const formatName = (key) =>
    key
      .replace(/_/g, " ") // replace underscore with space
      .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letter of each word

  // Transform sumData into array of { name, value }
  const dataRows = Object.entries(sumData).map(([key, value]) => ({
    name: formatName(key),
    value,
  }));

  return (
    <div
      className={`w-full h-full ${
        isDark ? "bg-[#282828]" : "bg-[#F7F9FB]"
      } rounded-2xl p-6`}
    >
      {/* Title */}
      <h2
        className={`text-xl font-bold mb-6 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Summary Data
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-[#3a3a3a]" : "border-gray-200"
              }`}
            >
              <th
                className={`text-left pb-4 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Name
              </th>
              <th
                className={`text-left pb-4 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Value
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {dataRows.map(({ name, value }, index) => (
              <tr
                key={index}
                className={`border-b ${
                  isDark ? "border-[#3a3a3a]" : "border-gray-200"
                } last:border-b-0`}
              >
                <td
                  className={`py-4 text-sm ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {name}
                </td>
                <td
                  className={`py-4 text-sm ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {typeof value === "number" && !Number.isInteger(value)
                    ? value.toFixed(2)
                    : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;
