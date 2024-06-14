import Logo from "./Logo";
import SearchIcon from "./SearchIcon";
import SearchComponent from "./SearchComponent";
import Button from "./Button";

const Navbar = () => {
  return (
    <section className="navbar  ">
      <Logo />
      <div className="flex items-center gap-8 justify-end md:justify-between  w-2/3 ">
        <div className=" md:hidden">
          <SearchIcon />
        </div>
        <div className="w-3/5 hidden md:block">
          <SearchComponent />
        </div>
        <Button>Get Started</Button>
      </div>
    </section>
  );
};
export default Navbar;
