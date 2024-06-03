import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TodayPrices from "../components/TodayPrices";

const Home = () => {
  return (
    <div className="bg-dark">
      <Navbar />
      <Hero />
      <TodayPrices />
    </div>
  );
};
export default Home;
