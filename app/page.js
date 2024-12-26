"use client";
import { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded stock data
    const stockData = [
      { symbol: "AAPL", percentChange: 1.2, price: 150, absoluteChange: 1.8 },
      { symbol: "GOOG", percentChange: -0.8, price: 2800, absoluteChange: -22.4 },
      { symbol: "AMZN", percentChange: 0.5, price: 3400, absoluteChange: 17.0 },
      { symbol: "MSFT", percentChange: -1.0, price: 299, absoluteChange: -3.0 },
      { symbol: "TSLA", percentChange: 2.1, price: 900, absoluteChange: 18.9 },
      { symbol: "META", percentChange: -0.4, price: 375, absoluteChange: -1.5 },
      { symbol: "NFLX", percentChange: 3.0, price: 650, absoluteChange: 19.5 },
      { symbol: "NVDA", percentChange: -2.5, price: 800, absoluteChange: -20.0 },
      { symbol: "INTC", percentChange: 1.7, price: 55, absoluteChange: 0.93 },
      { symbol: "AMD", percentChange: -0.3, price: 110, absoluteChange: -0.33 },
      { symbol: "IBM", percentChange: 1.1, price: 125, absoluteChange: 1.38 },
      { symbol: "ORCL", percentChange: -1.8, price: 95, absoluteChange: -1.71 },
      { symbol: "SAP", percentChange: 0.9, price: 130, absoluteChange: 1.17 },
      { symbol: "UBER", percentChange: 2.3, price: 45, absoluteChange: 1.04 },
      { symbol: "LYFT", percentChange: -0.6, price: 30, absoluteChange: -0.18 },
    ];

    // Simulate API delay
    setTimeout(() => {
      setStocks(stockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-sm text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-[40px] w-[2164px] overflow-hidden text-sm">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div key={index} className="mx-8 flex items-center space-x-4">
            <div
              className={`flex flex-col font-bold ${
                stock.percentChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{stock.symbol}</span>
              <span>
                {stock.percentChange > 0 ? "+" : ""}
                {stock.percentChange}%
              </span>
            </div>
            <div
              className={`flex flex-col font-bold ${
                stock.percentChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>
                {stock.percentChange > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {stock.price !== null ? `$${stock.price}` : "Price Unavailable"}
              </span>
              <span>
                {stock.absoluteChange > 0 ? "+" : ""}
                {stock.absoluteChange}$
              </span>
            </div>
          </div>
        ))}

        {/* Duplicate for scrolling effect */}
        {stocks.map((stock, index) => (
          <div key={index + stocks.length} className="mx-8 flex items-center space-x-4">
            <div
              className={`flex flex-col font-bold ${
                stock.percentChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{stock.symbol}</span>
              <span>
                {stock.percentChange > 0 ? "+" : ""}
                {stock.percentChange}%
              </span>
            </div>
            <div
              className={`flex flex-col font-bold ${
                stock.percentChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>
                {stock.percentChange > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {stock.price !== null ? `$${stock.price}` : "Price Unavailable"}
              </span>
              <span>
                {stock.absoluteChange > 0 ? "+" : ""}
                {stock.absoluteChange}$
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
