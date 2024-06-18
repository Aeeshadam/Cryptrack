import TwitterSvg from "../assets/twitter.svg";
import InstagramSvg from "../assets/instagram.svg";
import YoutubeSvg from "../assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="container ">
      <div className="flex flex-col items-center gap-12 pt-24">
        <div className="flex gap-4 justify-center">
          <div className="bg-midnight p-8 flex rounded-full">
            <img src={TwitterSvg} alt="Twitter" className="w-6" />
          </div>
          <div className="bg-midnight p-8 flex rounded-full">
            <img src={InstagramSvg} alt="Instagram" className="w-6 " />
          </div>
          <div className="bg-midnight p-8 flex  gap-4 rounded-full ">
            <img src={YoutubeSvg} alt="Youtube" className="w-6" />
          </div>
        </div>

        <div className="border-t border-darkprimary border-opacity-30 text-center text-lg w-full text-grey py-12 md:text-xl">
          © 2022 Cryptrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
