"use client";

import { useState } from "react";

export default function FilterTabs() {
  // This state keeps track of which tab is currently selected
  const[activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Lost", "Found"];

  return (
    <div className="flex justify-center mt-8 px-6 w-full">
      {/* The background pill */}
      <div className="flex bg-[#F1EAE2] rounded-full p-1.5 w-full shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-[#FDFBF7] text-[#4A4238] shadow-sm" // Active state (white background)
                : "text-[#8E867D] hover:text-[#4A4238]"   // Inactive state
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}