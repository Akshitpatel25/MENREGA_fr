import { useState } from "react";
import {
  ChevronRight,
  PieChart
} from "lucide-react";
import { useSelector } from "react-redux";

export default function SidebarDashboardPart() {
  const [openDropdown, setOpenDropdown] = useState(null); // track which dropdown is open
  const [active, setActive] = useState("Default");

  const menuItems = [
    { name: "Default", icon: PieChart, dropdown: false, subItems: [] },
    
  ];

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isDark = useSelector((state) => state.theme.value);

  return (
    <div className=" text-white/60 mt-6">
      {/* Section Title */}
      <div
        className={`tracking-wide mb-3 ${
          isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C66]"
        }`}
      >
        Dashboards
      </div>

      {/* Menu List */}
      <ul className="space-y-1">
        {menuItems.map(({ name, icon: Icon, dropdown, subItems = [] }) => {
          const isActive = active === name;
          const isOpen = openDropdown === name;

          return (
            <li key={name} className="flex flex-col ">
              <div
                className={`
                  group relative flex items-center gap-1 px-2 py-2 cursor-pointer rounded-xl transition-colors duration-200 
                  ${isDark ? "hover:bg-[#2C2C2C]" : "hover:bg-[#F5F5F5]"}
                  ${
                    isActive
                      ? `${
                          isDark
                            ? "bg-[#262626] text-white"
                            : "bg-[#1C1C1C0D] text-[#1c1c1c]"
                        }`
                      : "text-[#FFFFFF99] hover:text-white"
                  }
                `}
                onClick={() => {
                  if (dropdown) handleDropdownToggle(name);
                  else setActive(name);
                }}
              >
                {/* Left Active Bar */}
                {isActive && (
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full ${
                      isDark ? "bg-[#C6C7F8]" : "bg-[#1C1C1C]"
                    }`}
                  />
                )}

                {/* Left Chevron (for dropdowns) */}
                {dropdown && (
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 
                    ${isDark ? "text-[#FFFFFF33]" : "text-gray-400"}
                    ${
                      subItems.length > 0 && openDropdown === name
                        ? "rotate-90 text-[#C6A5FF]"
                        : "text-[#FFFFFF33]"
                    }`}
                  />
                )}

                {/* Icon */}
                <Icon
                  size={18}
                  className={`transition-colors duration-200
                    ${isDark ? "text-white" : "text-black"}
                    ${
                      isActive
                        ? `${isDark ? "text-white ml-5" : "text-black ml-5"}`
                        : "text-[#FFFFFF]"
                    }`}
                />

                {/* Label */}
                <span className={`${isDark ? "text-white" : "text-black"}`}>
                  {name}
                </span>
              </div>

              {/* Dropdown Content (only for expandable items) */}
              {/* {dropdown && (
                <ul
                  className={`overflow-hidden transition-all duration-300 pl-10  pr-2 space-y-1 
      
                    ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <li className={`cursor-pointer  transition-colors ${isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C]"}`}>
                    Overview
                  </li>
                  <li className={`cursor-pointer  transition-colors ${isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C]"}`}>
                    Analytics
                  </li>
                  <li className={`cursor-pointer  transition-colors ${isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C]"}`}>
                    Reports
                  </li>
                </ul>
              )} */}

              {dropdown && (
                <ul
                  className={`overflow-hidden transition-all duration-300 pl-14 pr-2 space-y-1 ${
                    isOpen ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {subItems.map((sub) => (
                    <li
                      key={sub}
                      className={`cursor-pointer transition-colors text 
                        text py-1 ${
                          isDark
                            ? "text-[#FFFFFF] hover:text-[#C6A5FF]"
                            : "text-[#1C1C1C] hover:text-black"
                        }`}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
