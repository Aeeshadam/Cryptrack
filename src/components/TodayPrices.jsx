import DownChevron from "../assets/down-chevron.svg";
const TodayPrices = () => {
  return (
    <div className="container ">
      <h2 className="my-6 md:my-24">
        Today&rsquo;s Crypto Prices by Market Cap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-midnight p-8 flex flex-col gap-4">
          <p className="text-2xl">Market Cap</p>
          <div className="flex gap-4 flex-row md:flex-col">
            <h3>$ 1,000,000,000</h3>
            <div className="flex items-center gap-2 bg-red_bg w-fit p-1 ">
              <img src={DownChevron} alt="down" className="w-5 " />
              <p className="text-red">0.51%</p>
            </div>
          </div>
        </div>

        <div className="bg-midnight p-8 flex flex-col gap-4">
          <p className="text-2xl">Volume</p>
          <div className="flex gap-4 flex-row md:flex-col">
            <h3>$ 1,000,000,000</h3>
            <div className="flex items-center gap-2 bg-red_bg w-fit p-1 ">
              <img src={DownChevron} alt="down" className="w-5 " />
              <p className="text-red">0.51%</p>
            </div>
          </div>
        </div>

        <div className="bg-midnight p-8 flex flex-col gap-4">
          <p className="text-2xl">BTC Dominance</p>
          <div className="flex gap-4 flex-row md:flex-col">
            <h3>50.8%</h3>
            <div className="flex items-center gap-2 bg-red_bg w-fit p-1 ">
              <img src={DownChevron} alt="down" className="w-5 " />
              <p className="text-red">0.51%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodayPrices;
