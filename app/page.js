"use client";
import { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "https://stock.manojad.dev/stock-prices"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed Data:", data);

        const formattedData = data.stocks.map((stock) => ({
          symbol: stock.symbol,
          price: stock.curPrice,
          percentChange: stock.percent,
          absoluteChange: stock.diff,
          currency: stock.currency,
          direction: stock.direction, // Added direction field
        }));

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

  return (
    <div className="relative bg-black h-[100px] w-[2164px] overflow-hidden text-[30px] mt-[-5px]">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div key={index} className="mx-5 flex items-center space-x-4">
            <div
              className={`flex flex-col ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-bold">{stock.symbol}</span>
              <span className="font-bold">{stock.percentChange}</span>
            </div>

            <div
              className={`flex flex-col ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>
                {stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
                {stock.price !== null
                  ? `${stock.currency}${stock.price}`
                  : "Price Unavailable"}
              </span>
              <span
                className={`font-bold ${
                  stock.absoluteChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.absoluteChange > 0 ? "+" : ""}
                {stock.currency}
                {stock.absoluteChange}
              </span>
            </div>
          </div>
        ))}   {stocks.map((stock, index) => (
          <div key={index} className="mx-5 flex items-center space-x-4">
            <div
              className={`flex flex-col ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-bold">{stock.symbol}</span>
              <span className="font-bold">{stock.percentChange}</span>
            </div>

            <div
              className={`flex flex-col ${
                stock.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>
                {stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
                {stock.price !== null
                  ? `${stock.currency}${stock.price}`
                  : "Price Unavailable"}
              </span>
              <span
                className={`font-bold ${
                  stock.absoluteChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
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
