import EmptyImg from "../assets/empty.png";
import Button from "./Button";

const EmptyPortfolio = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10  ">
      <div className=" mx-auto flex items-center justify-center max-w-xl">
        <img src={EmptyImg} alt="hero" className="object-contain " />
      </div>
      <h2>Your portfolio needs some work!</h2>
      <Button>Start By adding a token</Button>
    </div>
  );
};
export default EmptyPortfolio;
