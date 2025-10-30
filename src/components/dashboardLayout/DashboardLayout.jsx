import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Badge } from "@mui/material";
import {
  Menu,
  Notifications,
  Search,
  Close,
  DisplaySettings,
  WbSunnyOutlined,
  RestoreOutlined,
  NotificationsNoneOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/features/theme/themeSlice";
import profileIcon from "../../assets/svg/profileIcon.svg";
import SidebarDashboardPart from "./Sidebar-DashboardPart/SidebarDashboardPart";
import menu1 from "../../assets/svg/menu1.svg";


const DashboardLayout = ({ children }) => {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.value);

  // Set theme variables
  useEffect(() => {
    if (isDark) {
      document.documentElement.style.setProperty("--theme-bg", "#1C1C1C");
      document.documentElement.style.setProperty("--theme-text", "#FFFFFF");
    } else {
      document.documentElement.style.setProperty("--theme-bg", "#FFFFFF");
      document.documentElement.style.setProperty("--theme-text", "#1C1C1C");
    }
  }, [isDark]);

  // Track window size
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive Logic
  useEffect(() => {
    if (windowWidth < 768) {
      setIsLeftOpen(false);
      setIsRightOpen(false);
    } else if (windowWidth <= 1024) {
      // Changed < to <=
      setIsLeftOpen(true);
      setIsRightOpen(false);
    } else {
      setIsLeftOpen(true);
      setIsRightOpen(true);
    }
  }, [windowWidth]);

  const toggleLeft = () => setIsLeftOpen((prev) => !prev);
  

  return (
    <div className="flex h-screen bg-theme text-theme-text overflow-hidden transition-colors duration-300">
      {/* ===== Left Sidebar ===== */}
      <aside
        className={`
        ${isDark ? "scrollbar-dark" : "scrollbar-light"}
        bg-theme border-r ${
          isDark ? "border-[#333333] bg-[#1C1C1C]" : "border-[#e8e8e8] bg-white"
        } flex flex-col z-30 transition-transform duration-300 gap-4 pt-5  pb-5 pl-4 
        ${
          windowWidth < 768
            ? `fixed h-full w-full top-0 left-0 ${
                isLeftOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-70 static translate-x-0"
        }
        overflow-y-auto 
        ${
          isDark
            ? "scrollbar-track-[#1C1C1C] scrollbar-thumb-[#333333]"
            : "scrollbar-track-white scrollbar-thumb-[#D1D5DB]"
        }
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-2 items-center">
            <img src={profileIcon} alt="profile-icon" width={24} height={24} />
            <div className="text-xl text-theme-text">MGNREGA</div>
          </div>
          {windowWidth < 768 && (
            <IconButton onClick={toggleLeft}>
              <Close className={isDark ? "text-[#ffffff]" : "text-[#1c1c1c]"} />
            </IconButton>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {/* Favorites and Recently */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              {["Favorites", "Recently"].map((label) => (
                <div
                  key={label}
                  className={isDark ? "text-[#FFFFFF66]" : "text-[#1c1c1c66]"}
                >
                  {label}
                </div>
              ))}
            </div>
            <ul
              className={`list-disc space-y-2 pl-4 ${
                isDark ? "marker:text-[#FFFFFF33]" : "marker:text-[#1c1c1c33]"
              }`}
            >
              {["Overview", "Projects"].map((item) => (
                <li
                  key={item}
                  className="hover:text-theme-text cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboards */}
          <SidebarDashboardPart />

        </nav>
      </aside>

      {/* ===== Main + Right Section ===== */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 h-full justify-between items-center`}
      >
        {/* ===== Top Navbar ===== */}
        <AppBar
          position="static"
          elevation={0}
          color="transparent"
          className={`bg-theme border-b ${
            isDark ? "border-[#333333]" : "border-[#e8e8e8]"
          }`}
        >
          <Toolbar className="flex justify-between px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Menu1 */}
              <IconButton
                edge="start"
                onClick={toggleLeft}
                sx={{ padding: "8px" }}
              >
                <img
                  src={menu1}
                  alt="menu"
                  width={18}
                  height={14}
                  className={isDark ? "brightness-100" : "brightness-0"}
                />
              </IconButton>

              {/* Star - Hidden on mobile */}
              <IconButton
                sx={{
                  padding: "8px",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                <StarBorderOutlined
                  sx={{
                    fontSize: "20px",
                    color: isDark ? "#FFFFFF" : "#1C1C1C",
                  }}
                />
              </IconButton>

              {/* Material-UI Breadcrumbs - Hidden on mobile and tablet */}
              <Breadcrumbs
                separator="/"
                sx={{
                  display: { xs: "none", lg: "flex" },
                  "& .MuiBreadcrumbs-separator": {
                    color: isDark ? "#FFFFFF66" : "#1C1C1C66",
                    mx: 1,
                  },
                }}
              >
                <Link
                  underline="none"
                  sx={{
                    color: isDark ? "#FFFFFF66" : "#1C1C1C66",
                    fontSize: "14px",
                    cursor: "pointer",
                    "&:hover": {
                      color: isDark ? "#FFFFFF" : "#1C1C1C",
                    },
                  }}
                >
                  Dashboards
                </Link>
                <span
                  className={`text-sm ${
                    isDark ? "text-white" : "text-[#1C1C1C]"
                  }`}
                >
                  Default
                </span>
              </Breadcrumbs>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search Bar - Hidden on mobile */}
              <div
                className={`items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark ? "bg-[#282828]" : "bg-[#F5F5F5]"
                } hidden md:flex`}
              >
                <Search
                  className={`${
                    isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C66]"
                  } w-5 h-5`}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className={`bg-transparent outline-none text-sm w-32 ${
                    isDark
                      ? "text-white placeholder:text-[#FFFFFF66]"
                      : "text-[#1C1C1C] placeholder:text-[#1C1C1C66]"
                  }`}
                />
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    isDark
                      ? "bg-[#383838] text-[#FFFFFF66]"
                      : "bg-[#E5E5E5] text-[#1C1C1C66]"
                  }`}
                >
                  ⌘/
                </span>
              </div>

              {/* Icons */}
              {/* mode toggle */}
              <IconButton
                sx={{ padding: "8px" }}
                onClick={() => dispatch(toggleTheme())}
              >
                <WbSunnyOutlined
                  sx={{
                    fontSize: "20px",
                    color: isDark ? "#FFFFFF" : "#1C1C1C",
                  }}
                />
              </IconButton>

              {/* Restore - Hidden on mobile */}
              <IconButton
                sx={{
                  padding: "8px",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                <RestoreOutlined
                  sx={{
                    fontSize: "20px",
                    color: isDark ? "#FFFFFF" : "#1C1C1C",
                  }}
                />
              </IconButton>

              {/* Notifications */}
              <IconButton sx={{ padding: "8px" }}>
                <Badge
                  badgeContent={0}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FF4D4F",
                      color: "white",
                      fontSize: "10px",
                      minWidth: "16px",
                      height: "16px",
                    },
                  }}
                >
                  <NotificationsNoneOutlined
                    sx={{
                      fontSize: "20px",
                      color: isDark ? "#FFFFFF" : "#1C1C1C",
                    }}
                  />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* ===== Page Content ===== */}
        <main className="flex-1 p-3 lg:p-6 overflow-y-auto bg-theme text-theme-text w-full">
          {children}
        </main>
      </div>

      {/* ===== Mobile Overlay ===== */}
      {windowWidth < 768 && (isLeftOpen || isRightOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => {
            setIsLeftOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
