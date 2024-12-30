"use client";
import { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const stockData = [
    {
      symbol: "AAPL",
      curPrice: 255.65,
      prePrice: 259.02,
      percent: "-1.30%",
      currency: "$",
      diff: "-3.37",
      direction: "down",
    },
    {
      symbol: "MSFT",
      curPrice: 430.56,
      prePrice: 438.11,
      percent: "-1.72%",
      currency: "$",
      diff: "-7.55",
      direction: "down",
    },
    {
      symbol: "GOOGL",
      curPrice: 192.76,
      prePrice: 195.6,
      percent: "-1.45%",
      currency: "$",
      diff: "-2.84",
      direction: "down",
    },
    {
      symbol: "TSLA",
      curPrice: 431.66,
      prePrice: 454.13,
      percent: "-4.95%",
      currency: "$",
      diff: "-22.47",
      direction: "down",
    },
    {
      symbol: "AMZN",
      curPrice: 223.79,
      prePrice: 227.05,
      percent: "-1.44%",
      currency: "$",
      diff: "-3.26",
      direction: "down",
    },
    {
      symbol: "RELIANCE",
      curPrice: 1211.5,
      prePrice: 1221.05,
      percent: "-0.78%",
      currency: "₹",
      diff: "-9.55",
      direction: "up",
    }
  ];

  const [stocks] = useState(
    stockData.map((stock) => ({
      symbol: stock.symbol,
      price: stock.curPrice,
      percentChange: stock.percent,
      absoluteChange: stock.diff,
      currency: stock.currency,
      direction: stock.direction,
    }))
  );

  return (
    <div className="relative bg-black h-[100px] w-[2164px] overflow-hidden text-[34px] mt-[-5px]">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center space-x-8 w-full max-w-[300px] mx-7"
          >
         
            <div
              className={`flex flex-col items-center ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-bold">{stock.symbol}</span>
              <span className="font-bold">{stock.percentChange}</span>
            </div>

            
            <div
              className={`flex flex-col items-center ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="flex items-center">
                {stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
                {stock.price !== null
                  ? `${stock.currency}${stock.price}`
                  : "Price Unavailable"}
              </span>
              <span className="font-bold">
                {stock.absoluteChange > 0 ? "+" : ""}
                {stock.currency}
                {stock.absoluteChange}
              </span>
            </div>
          </div>
        ))}
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center space-x-8 w-full max-w-[300px] mx-7"
          >
            {/* Symbol and Percent Change */}
            <div
              className={`flex flex-col items-center ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-bold">{stock.symbol}</span>
              <span className="font-bold">{stock.percentChange}</span>
            </div>

            {/* Price and Absolute Change */}
            <div
              className={`flex flex-col items-center ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="flex items-center">
                {stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
                {stock.price !== null
                  ? `${stock.currency}${stock.price}`
                  : "Price Unavailable"}
              </span>
              <span className="font-bold">
                {stock.absoluteChange > 0 ? "+" : ""}
                {stock.currency}
                {stock.absoluteChange}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
