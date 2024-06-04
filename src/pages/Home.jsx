import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TodayPrices from "../components/TodayPrices";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-dark">
      <Navbar />
      <Hero />
      <TodayPrices />
      <Footer />
    </div>
  );
};
export default Home;
