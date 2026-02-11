"use client";
import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to check if current time is within Indian market hours (9 AM - 4 PM IST)
  const isMarketHours = () => {
    const now = new Date();
    const indianTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const hours = indianTime.getHours();
    const minutes = indianTime.getMinutes();
    
    // Market hours: 9:00 AM to 4:00 PM (16:00)
    const currentTimeInMinutes = hours * 60 + minutes;
    const marketOpenTime = 9 * 60; // 9:00 AM
    const marketCloseTime = 16 * 60; // 4:00 PM
    
    return currentTimeInMinutes >= marketOpenTime && currentTimeInMinutes < marketCloseTime;
  };

  useEffect(() => {
    const fetchStockData = async () => {
      // Check if we're within market hours
      // if (!isMarketHours()) {
      //   console.log("Outside market hours, using localStorage data");
      //   const localData = localStorage.getItem("stocks");
      //   if (localData) {
      //     setStocks(JSON.parse(localData));
      //   }
      //   setLoading(false);
      //   return;
      // }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        const response = await fetch(
          "https://rgcfwe8e2g.execute-api.ap-south-1.amazonaws.com/default/stock-api-v2",
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        const filteredStocks = data.filter(
          (stock) =>
            stock &&
            stock.symbol &&
            stock.curPrice !== null &&
            stock.currency &&
            stock.percent !== null &&
            stock.direction
        );

        localStorage.setItem("stocks", JSON.stringify(filteredStocks));
        setStocks(filteredStocks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error.message);

        const localData = localStorage.getItem("stocks");
        if (localData) setStocks(JSON.parse(localData));

        setLoading(false);
      }
    };

   
    const initialData = localStorage.getItem("stocks");
    if (initialData) {
      setStocks(JSON.parse(initialData));
      setLoading(false);
    }

   
    fetchStockData();

   
    const intervalId = setInterval(() => {
      fetchStockData();
    }, 300000); 

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-sm text-white">Loading...</h1>
      </div>
    );
  }

  if (error && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-sm text-red-600">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-[100px] w-[2164px] text-[35px] overflow-hidden font-bold -mt-[8px]">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div
            key={`first-${index}`}
            className={`flex items-center justify-center gap-5 mx-7 ${
              stock.direction === "up" ? "text-[#00FF00]" : "text-[#FF0000]"
            }`}
          >
            <div className="flex items-center flex-col -space-y-[8px]">
              <div>{stock.symbol}</div>
              <div>{stock.percent}</div>
            </div>
            <div className="flex items-center flex-col -space-y-[8px] justify-center">
              <div>
                <span>
                  {stock.direction === "up" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </span>
                <span>{stock.currency}</span>
                {stock.curPrice}
              </div>
              <div>
                <span>{stock.currency}</span>
                {stock.diff}
              </div>
            </div>
          </div>
        ))}
        {stocks.map((stock, index) => (
          <div
            key={`second-${index}`}
            className={`flex items-center justify-center gap-5 mx-7 ${
              stock.direction === "up" ? "text-[#00FF00]" : "text-[#FF0000]"
            }`}
          >
            <div className="flex items-center flex-col -space-y-[8px]">
              <div>{stock.symbol}</div>
              <div>{stock.percent}</div>
            </div>
            <div className="flex items-center flex-col -space-y-[8px] justify-center">
              <div>
                <span>
                  {stock.direction === "up" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </span>
                <span>{stock.currency}</span>
                {stock.curPrice}
              </div>
              <div>
                <span>{stock.currency}</span>
                {stock.diff}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
