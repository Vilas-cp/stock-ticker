import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Page = () => {
  const stocks = [
    {
      symbol: "AAPL",
      curPrice: 176.85,
      currency: "$",
      percent: 1.23,
      direction: "up",
      diff: 2.15,
    },
    {
      symbol: "GOOGL",
      curPrice: 2800.55,
      currency: "$",
      percent: -0.89,
      direction: "down",
      diff: -25.15,
    },
    {
      symbol: "TSLA",
      curPrice: 950.75,
      currency: "$",
      percent: 3.14,
      direction: "up",
      diff: 28.95,
    },
    {
      symbol: "INFY",
      curPrice: 1550.6,
      currency: "$",
      percent: 0.45,
      direction: "up",
      diff: 7.0,
    },
    {
      symbol: "TCS",
      curPrice: 3200.1,
      currency: "$",
      percent: -1.12,
      direction: "down",
      diff: -3600,
    },
  ];

  return (
    <div className="relative bg-black h-[100px] w-[2164px]  text-[32px]  font-bold  mt-[-5px]">
      <div className="absolute top-0 left-0 flex animate-marquee">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className={`flex  items-center justify-center  gap-5 mx-7 ${
              stock.direction === "up" ? "text-[#00FF00]" : "text-[#FF0000]"
            }`}
          >
            <div className="flex items-center flex-col space-y-[-8px]">
              <div className="">{stock.symbol}</div>
              <div>{stock.percent}%</div>
            </div>
            <div className="flex items-center flex-col space-y-[-8px]">
              <div>
                <span >{stock.direction === "up" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}</span>
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
};

export default Page;
