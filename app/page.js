"use client";
import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const initialStockData = [
    {
        "symbol": "AAPL",
        "curPrice": 255.65,
        "prePrice": 259.02,
        "percent": "-1.30%",
        "currency": "$",
        "diff": "-3.37",
        "direction": "down"
    },
    {
        "symbol": "MSFT",
        "curPrice": 430.56,
        "prePrice": 438.11,
        "percent": "-1.72%",
        "currency": "$",
        "diff": "-7.55",
        "direction": "down"
    },
    {
        "symbol": "GOOGL",
        "curPrice": 192.76,
        "prePrice": 195.6,
        "percent": "-1.45%",
        "currency": "$",
        "diff": "-2.84",
        "direction": "down"
    },
    {
        "symbol": "TSLA",
        "curPrice": 431.66,
        "prePrice": 454.13,
        "percent": "-4.95%",
        "currency": "$",
        "diff": "-22.47",
        "direction": "down"
    },
    {
        "symbol": "AMZN",
        "curPrice": 223.79,
        "prePrice": 227.05,
        "percent": "-1.44%",
        "currency": "$",
        "diff": "-3.26",
        "direction": "down"
    },
    {
        "symbol": "RELIANCE",
        "curPrice": 1211.5,
        "prePrice": 1221.05,
        "percent": "-0.78%",
        "currency": "₹",
        "diff": "-9.55",
        "direction": "down"
    },
    {
        "symbol": "INFY",
        "curPrice": 1898.45,
        "prePrice": 1916.75,
        "percent": "-0.95%",
        "currency": "₹",
        "diff": "-18.30",
        "direction": "down"
    },
    {
        "symbol": "TCS",
        "curPrice": 4150,
        "prePrice": 4164.85,
        "percent": "-0.36%",
        "currency": "₹",
        "diff": "-14.85",
        "direction": "down"
    },
    {
        "symbol": "HDFCBANK",
        "curPrice": 1784,
        "prePrice": 1798.25,
        "percent": "-0.79%",
        "currency": "₹",
        "diff": "-14.25",
        "direction": "down"
    },
    
    {
        "symbol": "META",
        "curPrice": 599.81,
        "prePrice": 603.35,
        "percent": "-0.59%",
        "currency": "$",
        "diff": "-3.54",
        "direction": "down"
    },
    {
        "symbol": "NVDA",
        "curPrice": 137.09,
        "prePrice": 139.93,
        "percent": "-2.03%",
        "currency": "$",
        "diff": "-2.84",
        "direction": "down"
    },
    {
        "symbol": "NFLX",
        "curPrice": 907.55,
        "prePrice": 924.14,
        "percent": "-1.80%",
        "currency": "$",
        "diff": "-16.59",
        "direction": "down"
    },
    {
        "symbol": "DIS",
        "curPrice": 111.55,
        "prePrice": 112.55,
        "percent": "-0.89%",
        "currency": "$",
        "diff": "-1.00",
        "direction": "down"
    },
    {
        "symbol": "BRK.B",
        "curPrice": 456.51,
        "prePrice": 459.08,
        "percent": "-0.56%",
        "currency": "$",
        "diff": "-2.57",
        "direction": "down"
    },
    {
        "symbol": "ITC",
        "curPrice": 476.8,
        "prePrice": 478.6,
        "percent": "-0.38%",
        "currency": "₹",
        "diff": "-1.80",
        "direction": "down"
    },
    {
        "symbol": "ICICIBANK",
        "curPrice": 1293.45,
        "prePrice": 1307.55,
        "percent": "-1.08%",
        "currency": "₹",
        "diff": "-14.10",
        "direction": "down"
    },
    {
        "symbol": "KOTAKBANK",
        "curPrice": 1741.2,
        "prePrice": 1759.9,
        "percent": "-1.06%",
        "currency": "₹",
        "diff": "-18.70",
        "direction": "down"
    },
    {
        "symbol": "LT",
        "curPrice": 3590,
        "prePrice": 3608.1,
        "percent": "-0.50%",
        "currency": "₹",
        "diff": "-18.10",
        "direction": "down"
    }
];
  const [stocks, setStocks] = useState(initialStockData);

  // Simulate fetching new stock data every 2 minutes
  
  useEffect(() => {
   
    const refreshInterval = setTimeout(() => {
      window.location.reload();
    }, 300000); 

    return () => clearTimeout(refreshInterval); 
  }, []);

  return (
    <div className="relative bg-black h-[100px] w-[2164px] overflow-hidden text-[34px] mt-[-5px]">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center  w-full max-w-[300px] mx-7"
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
            className="flex justify-between items-center  w-full max-w-[300px] mx-7"
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
