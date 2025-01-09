"use client";
import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("https://stock.manojad.dev/stock-prices");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed Data:", data);

        const formattedData = data.stocks
          ? data.stocks.filter(
              (stock) =>
                stock &&
                stock.symbol &&
                stock.curPrice !== null &&
                stock.currency &&
                stock.percent !== null &&
                stock.direction
            )
          : [];
        console.log("Filtered Data:", formattedData);

        setStocks(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStockData();

    const intervalId = setInterval(fetchStockData, 240000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-sm text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-sm text-red-600">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-[100px] w-[2164px] overflow-hidden text-[26px] mt-[-5px]">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full max-w-[300px] mx-7"
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
                {stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
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
        ))}{stocks.map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full max-w-[300px] mx-7"
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
                {stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
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
