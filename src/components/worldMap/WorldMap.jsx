import React, { useEffect, useRef } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useSelector } from "react-redux";

function WorldMap() {
  const isDark = useSelector((state) => state.theme.value);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Completely disable all mouse/touch interactions on the map
    const disableMapInteractions = () => {
      const jvmContainer = container.querySelector('.jvectormap-container');
      if (jvmContainer) {
        jvmContainer.style.pointerEvents = 'none';
      }
    };

    // Run immediately
    disableMapInteractions();

    // Also run after a small delay to catch any late renders
    const timer = setTimeout(disableMapInteractions, 100);

    // Watch for new map renders and disable them too
    const observer = new MutationObserver(() => {
      disableMapInteractions();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isDark]);

  const locations = [
    { name: "New York", value: 72, progress: 90 },
    { name: "San Francisco", value: 39, progress: 49 },
    { name: "Sydney", value: 25, progress: 31 },
    { name: "Singapore", value: 61, progress: 76 },
  ];

  const markers = [
    { name: "New York", latLng: [40.7128, -74.006] },
    { name: "San Francisco", latLng: [37.7749, -122.4194] },
    { name: "Sydney", latLng: [-33.8688, 151.2093] },
    { name: "Singapore", latLng: [1.3521, 103.8198] },
  ];

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${
        isDark ? "bg-[#282828]" : "bg-[#F7F9FB]"
      } rounded-2xl flex flex-col p-6 gap-4`}
      style={{ userSelect: 'none' }}
    >
      <h2 className={`text-xl font-bold`}>Revenue by Location</h2>

      <div 
        className="w-full h-32 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <VectorMap
          key={isDark ? "dark" : "light"}
          map={worldMill}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          zoomButtons={false}
          zoomOnScroll={false}
          panOnDrag={false}
          markers={markers}
          markerStyle={{
            initial: {
              fill: isDark ? "#C6C7F8" : "#1c1c1c",
              stroke: "#fff",
              "fill-opacity": 1,
              "stroke-width": 2,
              "stroke-opacity": 1,
              r: 5,
            },
          }}
          backgroundColor="transparent"
          regionStyle={{
            initial: {
              fill: isDark ? "#5A6B7A" : "#C5D9E6",
              "fill-opacity": 1,
              stroke: "none",
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        {locations.map((location, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span>{location.name}</span>
              <span>{location.value}K</span>
            </div>
            <div
              className={`w-full h-1 rounded-full ${
                isDark ? "bg-[#3a3a3a]" : "bg-gray-200"
              }`}
            >
              <div
                className={`h-full rounded-full ${
                  isDark ? "bg-[#7B9FB8]" : "bg-[#8FBDD8]"
                }`}
                style={{ width: `${location.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorldMap;