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
      { symbol: "AAPL", price: 175, percentChange: 1, absoluteChange: 2 },
      { symbol: "GOOGL", price: 2830, percentChange: -1, absoluteChange: -21 },
      { symbol: "AMZN", price: 3475, percentChange: 2, absoluteChange: 78 },
      { symbol: "MSFT", price: 299, percentChange: 1, absoluteChange: 1 },
      { symbol: "TSLA", price: 740, percentChange: -1, absoluteChange: -10 },
      { symbol: "META", price: 365, percentChange: 1, absoluteChange: 3 },
      { symbol: "NFLX", price: 525, percentChange: -1, absoluteChange: -2 },
      { symbol: "NVDA", price: 220, percentChange: 2, absoluteChange: 4 },
      { symbol: "ADBE", price: 655, percentChange: -1, absoluteChange: -8 },
      { symbol: "ORCL", price: 93, percentChange: 1, absoluteChange: 1 },
      { symbol: "IBM", price: 125, percentChange: 0, absoluteChange: 0 },
      { symbol: "INTC", price: 54, percentChange: -2, absoluteChange: -1 },
      { symbol: "AMD", price: 110, percentChange: 1, absoluteChange: 1 },
      { symbol: "SAP", price: 130, percentChange: -1, absoluteChange: -1 },
      { symbol: "TWTR", price: 64, percentChange: 3, absoluteChange: 2 },
    ];
    

    setTimeout(() => {
      setStocks(stockData);
      setLoading(false);
    }, 1000); // Simulating 1-second delay

    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: stock.price + 1,
          absoluteChange: stock.absoluteChange + 1,
        }))
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-sm text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-[100px] w-[2164px] overflow-hidden text-[30px] mt-[-5px]">
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
                {stock.percentChange > 0 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
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
          <div
            key={index + stocks.length}
            className="mx-8 flex items-center space-x-4"
          >
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
                {stock.percentChange > 0 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
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
