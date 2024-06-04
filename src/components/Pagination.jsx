import React from "react";

export default function Pagination() {
  return (
    <nav className="w-full m-6">
      <ul className="list-style-none flex items-start justify-center">
        <li>
          <a className="cursor-pointer relative block  px-3 py-1.5 text-lg border border-darkprimary transition-all duration-300">
            Previous
          </a>
        </li>
        <div className="flex gap-2 mx-10">
          <li>
            <a
              className="cursor-pointer  relative block  px-3 py-1.5 text-lg text-grey transition-all duration-300"
              href="#!"
            >
              1
            </a>
          </li>
          <li aria-current="page">
            <a
              className="cursor-pointer  bg-primary relative block  px-3 py-1.5 text-lg text-dark transition-all duration-300"
              href="#!"
            >
              2
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer relative block  px-3 py-1.5 text-lg text-grey transition-all duration-300"
              href="#!"
            >
              3
            </a>
          </li>
        </div>

        <li>
          <a
            className="cursor-pointer relative block  px-3 py-1.5 text-lg border border-darkprimary transition-all duration-300"
            href="#!"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
