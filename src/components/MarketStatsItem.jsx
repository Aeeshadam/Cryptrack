import React, { useState } from "react";
import InfoSvg from "../assets/Information.svg";
import DownChevron from "../assets/down-chevron.svg";

const MarketStatItem = ({ label, value, tooltip, isNegative, date }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex items-center gap-2 relative">
        <p>{label}</p>
        <img
          src={InfoSvg}
          alt="info"
          className="w-5 cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
        {showTooltip && (
          <div className="absolute bg-darkprimary text-white text-lg  p-2 bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-10">
            {tooltip}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isNegative ? (
          <>
            <img src={DownChevron} alt="down" className="w-5" />
            <h3 className="text-red">{value}</h3>
          </>
        ) : (
          <h3>{value}</h3>
        )}
        {date && <p className="text-lg">{date}</p>}
      </div>
    </div>
  );
};

export default MarketStatItem;
