import Logo from "./Logo";
import SearchIcon from "./SearchIcon";
import SearchComponent from "./SearchComponent";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center container ">
      <Logo />
      <div className="flex items-center gap-8 lg:justify-between lg:w-3/5 ">
        <div className=" md:hidden">
          <SearchIcon />
        </div>
        <div className="w-3/5 hidden md:block">
          <SearchComponent />
        </div>
        <Button>Get Started</Button>
      </div>
    </div>
  );
};
export default Navbar;
