import DownChevron from "../assets/down-chevron.svg";
import EyeIcon from "../assets/Eye.svg";
import Button from "./Button";
const CurrentBalance = ({ setModalIsOpen }) => {
  const handleClick = () => {
    setModalIsOpen(true);
  };
  return (
    <section className="container ">
      <div className="flex justify-between items-center flex-row py-10 ">
        <div className="flex flex-col gap-4">
          <p> Current Balance</p>
          <div className="flex gap-4 flex-row">
            <h3>$ 1,000,000,000</h3>
            <img src={EyeIcon} alt="eye" className="w-5 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 bg-red_bg w-fit p-1 ">
            <img src={DownChevron} alt="down" className="w-5 " />
            <p className="text-red">0.51%</p>
          </div>
        </div>
        <Button onClick={handleClick}>Add Transaction</Button>
      </div>
    </section>
  );
};
export default CurrentBalance;
