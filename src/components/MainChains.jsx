import EthereumSvg from "../assets/Ethereum.svg";
import BnbSvg from "../assets/Bnb.svg";
import BitCoinSvg from "../assets/Bitcoin.svg";
import TetherSvg from "../assets/Tether.svg";
const MainChains = () => {
  return (
    <div className="flex justify-between pt-24">
      <img src={EthereumSvg} alt="Ethereum" />
      <img src={BnbSvg} alt="Bnb" />
      <img src={BitCoinSvg} alt="BitCoin" />
      <img src={TetherSvg} alt="Tether" />
    </div>
  );
};
export default MainChains;
