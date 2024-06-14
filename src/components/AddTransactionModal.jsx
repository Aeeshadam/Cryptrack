import CloseICon from "../assets/xmark-solid.svg";
import SearchComponent from "./SearchComponent";

const AddTransactionModal = ({ setModalIsOpen }) => {
  const handleClick = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="w-full bg-darkprimary bg-opacity-50 flex p-5 md:p-12 h-screen fixed top-0 inset-0 items-center justify-center">
      <div className="bg-dark flex flex-col gap-10 w-full p-8  sm:w-[500px] mx-auto">
        <div className="flex items-center w-full justify-between gap-4 ">
          <h3>Add Transaction</h3>
          <img
            src={CloseICon}
            alt=""
            className="w-6 h-6"
            onClick={handleClick}
          />
        </div>

        <SearchComponent />
      </div>
    </div>
  );
};
export default AddTransactionModal;
