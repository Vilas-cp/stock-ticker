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
        const requestBodies = [
          { market: "ind", group: 1 },
          { market: "ind", group: 2 },
          { market: "us", group: 1 },
          { market: "us", group: 2 },
        ];

        
        const responses = await Promise.all(
          requestBodies.map((body) =>
            fetch("https://v3f43y5hpc.execute-api.ap-south-1.amazonaws.com/default/stock-api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            })
          )
        );

      
        const data = await Promise.all(responses.map((res) => res.json()));

   
        const combinedStocks = data.flatMap((item) =>
          item.filter(
            (stock) =>
              stock &&
              stock.symbol &&
              stock.curPrice !== null &&
              stock.currency &&
              stock.percent !== null &&
              stock.direction
          )
        );

       
        localStorage.setItem("stocks", JSON.stringify(combinedStocks));

        setStocks(combinedStocks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error.message);

   
        const localData = localStorage.getItem("stocks");
        if (localData) {
          setStocks(JSON.parse(localData));
        }

        setLoading(false);
      }
    };

  
    const initialData = localStorage.getItem("stocks");
    if (initialData) {
      setStocks(JSON.parse(initialData));
      setLoading(false);
    }

    
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

  if (error && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-sm text-red-600">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-[100px] w-[2164px] overflow-hidden text-[25px] mt-[-5px]">
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
        ))}
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
        ))}
      </div>
    </div>
  );
}
