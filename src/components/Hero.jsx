import Button from "./Button";
import HeroSvg from "../assets/Hero.svg";
import MainChains from "./MainChains";
const Hero = () => {
  return (
    <section className="hero-background my-24">
      <div className="container flex flex-col md:flex-row justify-between items-center ">
        <div className="flex items-center flex-col gap-12 m-auto md:items-start max-w-4xl justify-center w-full md:w-1/2 md:max-w-5xl h-full">
          <h1>
            The
            <br />
            Ultimate <span className="text-primary">Cryto Portfolio</span>{" "}
            Tracker
          </h1>
          <Button>Create Portfolio</Button>
        </div>
        <div className="mt-12 mx-auto flex items-center justify-center  h-full max-w-3xl md:mt-0 ">
          <img src={HeroSvg} alt="hero" className="object-contain " />
        </div>
      </div>
      <div className="container hidden md:block ">
        <MainChains />
      </div>
    </section>
  );
};
export default Hero;
