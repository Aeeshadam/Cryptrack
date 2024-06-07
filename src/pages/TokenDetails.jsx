import Navbar from "../components/Navbar";
import TokenBalance from "../components/TokenBalance";
import TokenPerformance from "../components/TokenPerformance";
import MarketStats from "../components/MarketStats";
import About from "../components/About";
import Footer from "../components/Footer";

const TokenDetails = () => {
  return (
    <div>
      <Navbar />
      <TokenBalance />
      <TokenPerformance />
      <MarketStats />
      <About />
      <Footer />
    </div>
  );
};
export default TokenDetails;
