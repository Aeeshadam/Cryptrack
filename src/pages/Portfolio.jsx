import Navbar from "../components/Navbar";
import CurrentBalance from "../components/CurrentBalance";
import Chart from "../components/Chart";
import Holdings from "../components/Holdings";
import Footer from "../components/Footer";

const Portfolio = () => {
  return (
    <div className="bg-dark">
      <Navbar />
      <CurrentBalance />
      <Chart />
      <Holdings />
      <Footer />
    </div>
  );
};
export default Portfolio;
