import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CurrentBalance from "../components/CurrentBalance";
import Chart from "../components/Chart";
import Holdings from "../components/Holdings";
import Footer from "../components/Footer";
import EmptyPortfolio from "../components/EmptyPortfolio";
import AddTransactionModal from "../components/AddTransactionModal";

const Portfolio = () => {
  const [ModalisOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    if (ModalisOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [ModalisOpen]);

  return (
    <div className="bg-dark">
      <Navbar />
      <CurrentBalance setModalIsOpen={setModalIsOpen} />
      <Chart />
      <Holdings />
      <Footer />
      {ModalisOpen && <AddTransactionModal setModalIsOpen={setModalIsOpen} />}
    </div>
  );
};
export default Portfolio;
