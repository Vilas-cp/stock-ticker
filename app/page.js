"use client";
import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const initialStockData = [
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
    },
  ];

  const [stocks, setStocks] = useState(initialStockData);

  // Simulate fetching new stock data every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate updated stock data (replace this with an actual API call)
      const updatedStockData = initialStockData.map((stock) => ({
        ...stock,
        curPrice: (stock.curPrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
        diff: ((stock.curPrice - stock.prePrice) * (Math.random() - 0.5)).toFixed(2),
        percent: `${((Math.random() - 0.5) * 2).toFixed(2)}%`,
        direction: Math.random() > 0.5 ? "up" : "down",
      }));
      setStocks(updatedStockData);
    }, 120000); 

    return () => clearInterval(interval);
  }, []);

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
              <span className="font-bold">{stock.percent}</span>
            </div>
            <div
              className={`flex flex-col items-center ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="flex items-center">
                {stock.direction === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {stock.curPrice !== null
                  ? `${stock.currency}${stock.curPrice}`
                  : "Price Unavailable"}
              </span>
              <span className="font-bold">
                {stock.diff > 0 ? "+" : ""}
                {stock.currency}
                {stock.diff}
              </span>
            </div>
          </div>
        ))}
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
              <span className="font-bold">{stock.percent}</span>
            </div>
            <div
              className={`flex flex-col items-center ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="flex items-center">
                {stock.direction === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {stock.curPrice !== null
                  ? `${stock.currency}${stock.curPrice}`
                  : "Price Unavailable"}
              </span>
              <span className="font-bold">
                {stock.diff > 0 ? "+" : ""}
                {stock.currency}
                {stock.diff}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
