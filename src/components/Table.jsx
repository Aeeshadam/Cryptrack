import BnbSvg from "../assets/Bnb.svg";
import UpChevron from "../assets/up-chevron.svg";

const Table = () => {
  return (
    <table className="table-auto w-full bg-midnight mt-12 md:mt-36 ">
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
        <td className="hidden md:table-cell">Volume(24h)</td>
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
      <td className="hidden md:table-cell ">$53,000.0000000</td>
      <td className="hidden md:table-cell">$33,000.00</td>
    </tr>
  );
};

export default Table;
