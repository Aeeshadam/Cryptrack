import MarketCapCards from "./MarketCapCards";
import Table from "./Table";
import Pagination from "./Pagination";
import SearchComponent from "./SearchComponent";
const TodayPrices = () => {
  return (
    <section className="container ">
      <h2 className="my-12 md:my-24">
        Today&rsquo;s Crypto Prices by Market Cap
      </h2>
      <MarketCapCards />
      <div className="md:hidden mt-24">
        <SearchComponent />
      </div>
      <Table />
      <Pagination />
    </section>
  );
};
export default TodayPrices;
