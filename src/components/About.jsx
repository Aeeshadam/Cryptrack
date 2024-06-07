import CopySvg from "../assets/copy-regular.svg";

const About = () => {
  return (
    <section className="container ">
      <div className="flex flex-col items-start gap-12 bg-midnight p-5 md:p-12">
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-semibold">About Bitcoin</h3>
          <p>
            Launched in July 2017, Binance is the biggest cryptocurrency
            exchange globally based on daily trading volume. Binance aims to
            bring cryptocurrency exchanges to the forefront of financial
            activity globally. The idea behind Binance name is to show this new
            paradigm in global finance — Binary Finance, or Binance. Aside from
            being the largest cryptocurrency exchange globally, Binance has
            launched a whole ecosystem of functionalities for its users. The
            Binance network includes the Binance Chain,Binance Smart Chain,
            Binance Academy, Trust Wallet and Research projects, which all
            employ the powers of blockchain technology to bring new-age finance
            to the world. BNB is an integral part of the successful functioning
            of many of the Binance sub-projects.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h4 className="font-semibold">Markets</h4>
          <div className="flex gap-4">
            <p className="text-primary text-2xl font-medium">Binance</p>
            <p className="text-primary text-2xl font-medium">Coinbase</p>
            <p className="text-primary text-2xl font-medium">Kucoin</p>
            <p className="text-primary text-2xl font-medium">Bybit</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h4 className="font-semibold">Contract</h4>
          <div className="flex gap-4">
            <p>0x0000000000000000000000000000000000000000</p>
            <img
              src={CopySvg}
              alt="copy"
              className="w-5 cursor-pointer active:scale-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
