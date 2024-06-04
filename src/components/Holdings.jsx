import BnbSvg from "../assets/Bnb.svg";
import UpChevron from "../assets/up-chevron.svg";
import CancelIcon from "../assets/Cancel.svg";
import PlusIcon from "../assets/plus-solid (1).svg";

const Holdings = () => {
  return (
    <section className="container ">
      <h3 className="mt-12 md:mt-36">Holdings</h3>
      <Table />
    </section>
  );
};
export default Holdings;

const Table = () => {
  return (
    <table className="table-auto w-full bg-midnight mt-6 md:mt-12 ">
      <TableHead />
      <TableBody />
    </table>
  );
};

const TableHead = () => {
  return (
    <thead className="border-b border-darkprimary border-opacity-35">
      <tr className="m-6">
        <td>#</td>
        <td>Crypto</td>
        <td>Prices</td>
        <td>
          24h <span className="hidden md:inline">Change</span>
        </td>
        <td className="hidden md:table-cell">Market Cap</td>
        <td>Holdings</td>
      </tr>
    </thead>
  );
};
const TableBody = () => {
  return (
    <tbody>
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
    </tbody>
  );
};

const TableRow = () => {
  return (
    <tr className="bg-midnight ease-in-out hover:duration-700 hover:bg-dark hover:cursor-pointer">
      <td>1</td>
      <td className=" pl-4 flex items-start justify-start gap-2 flex-col md:flex-row md:items-center md:pl-0">
        <img src={BnbSvg} alt="Bnb" className="w-8 md:w-12" />
        BNB
      </td>
      <td>$53,000.00</td>
      <td>
        <div className="flex items-center text-green gap-4 ">
          <img src={UpChevron} alt="up" className="w-4" />
          0.51%
        </div>
      </td>
      <td className="hidden md:table-cell">$33,000.00</td>
      <td className="flex items-start justify-start gap-2 flex-col">
        $120.00
        <span className="text-grey text-lg">0.005 BTC</span>
      </td>
      <td>
        <div className="flex items-center gap-4">
          <img
            src={PlusIcon}
            alt="plus"
            className="w-6 cursor-pointer hover:w-8 hover:duration-500 ease-in-out"
          />
          <img
            src={CancelIcon}
            alt="cancel"
            className="w-6 cursor-pointer ease-in-out hover:w-8 hover:duration-500"
          />
        </div>
      </td>
    </tr>
  );
};
