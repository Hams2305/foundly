"use client";

import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mt-8 px-6 w-full">
      {/* The main white pill container */}
      <div className="flex items-center bg-white rounded-full p-1.5 pl-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#F1EAE2]">
        
        {/* Magnifying Glass Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-[#8E867D]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Search for lost items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none ml-3 text-[#4A4238] placeholder-[#8E867D] text-[15px]"
        />

        {/* The Pink Add Button */}
        <button className="w-10 h-10 flex-shrink-0 bg-[#C48B96] hover:bg-[#b07d87] text-white rounded-full flex items-center justify-center shadow-sm transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}