import DownChevron from "../assets/down-chevron.svg";
import Button from "../components/Button";
import BnbSvg from "../assets/Bnb.svg";
const TokenBalance = () => {
  return (
    <section className="container flex justify-between items-center ">
      <div className="flex justify-between items-start flex-col gap-4 my-10">
        <div className=" p-2  text-sm text-dark bg-brightprimary">
          <p> Rank #1</p>
        </div>
        <div className=" flex items-center justify-start gap-2">
          <img src={BnbSvg} alt="Bnb" className="w-10 md:w-12" />
          <h3>BNB</h3>
        </div>
        <div className="flex items-center gap-4">
          <h3>$ 100.00</h3>
          <div className="flex items-center gap-2  w-fit p-1 ">
            <img src={DownChevron} alt="down" className="w-5 " />
            <p className="text-red">0.51%</p>
          </div>
        </div>
      </div>
      <Button>Add to Portfolio</Button>
    </section>
  );
};
export default TokenBalance;
