import { Link } from "react-router-dom";
import logoSvg from "../assets/Logo.svg";

function Logo() {
  return (
    <Link to="/">
      <img src={logoSvg} alt="Cryptrack logo" className="w-48 md:w-64" />
    </Link>
  );
}

export default Logo;
