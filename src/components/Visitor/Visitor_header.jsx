import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";
function Visitor_header() {
  return (
    <div className="Main_container flex flex-col sm:flex-row sm:justify-end gap-5 px-5 py-3 bg-white shadow-md">
      <div className=" flex gap-2.5 py-3 ">
        <div className="flex justify-center items-center  text-3xl px-2 leading-8 text-white rounded-full bg-neutral-500 h-[2rem] w-[2rem]">
          A
        </div>

        <div className=" flex text-base gap-2 leading-5 items-center text-sky-500">
          Welcome! <span className="font-medium">Andrew S</span>
        </div>

        <RiArrowDropDownLine size={30} />
      </div>
      <div className="flex gap-2.5 items-center px-4 py-2 max-sm:py-4 text-sm text-white bg-sky-500 rounded-md border border-sky-500 cursor-pointer">
        <button>Contact Support</button>
        <MdArrowOutward size={20} />
      </div>
    </div>
  );
}

export default Visitor_header;
