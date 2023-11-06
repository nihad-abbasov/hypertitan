"use client";
import { useState } from "react";
import axiosInstance from "../../../config/axios";

export const PriceFilter = ({ onPriceChange, currentRange }) => {
  const handleMinChange = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (newVal < currentRange.max) {
      onPriceChange({ ...currentRange, min: newVal });
    }
  };

  const handleMaxChange = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (newVal > currentRange.min) {
      onPriceChange({ ...currentRange, max: newVal });
    }
  };

  return (
    <div className="range-slider mr-[20px]">
      <div className="text-black dark:text-white">
        Min Value: {currentRange.min} | Max Value: {currentRange.max}
      </div>
      <input
        type="range"
        name="min"
        min="0"
        max="5000"
        value={currentRange.min}
        onChange={handleMinChange}
        step="10"
      />
      <input
        type="range"
        name="max"
        min="0"
        max="5000"
        value={currentRange.max}
        onChange={handleMaxChange}
        step="50"
      />
    </div>
  );
};
