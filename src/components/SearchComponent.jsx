import SearchIcon from "./SearchIcon";

const SearchComponent = () => {
  return (
    <div className="flex justify-center border border-darkprimary  items-center p-4 gap-3 w-full max-md:w-full">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search token"
        className="w-full bg-transparent outline-none text-white placeholder:text-grey"
      />
    </div>
  );
};
export default SearchComponent;
