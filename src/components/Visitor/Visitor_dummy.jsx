import React from "react";
import coding from "../../assets/images/Landing/coding.png"
import Ellipse  from "../../assets/images/Landing/Ellipse 257.png"
import { MdArrowOutward } from "react-icons/md";


function Visitor_dummy() {
  return (
    <div className="Main_container flex flex-col md:flex-row gap-5 md:gap-[10%] py-10 px-5 justify-center bg-[#F2FBFF]">
      <div className="Image_container flex-shrink-0 flex flex-col items-center md:items-start">
        <div className="image  max-w-xs md:max-w-[20vw] bg-white flex justify-center items-center p-5 md:p-0 w-[100%] md:w-[15vw] h-[25vh]">
          <img
            src={coding}
            alt="Profile"
            className="rounded-md shadow-lg   object-cover"
          />
        </div>
      </div>
      <div className="Form_container w-full max-w-2xl mt-10 md:mt-0">
        <h1 className="text-2xl md:text-4xl leading-8 md:leading-10 font-bold text-slate-800">
          Senior Frontend Developer
        </h1>
        <h5 className="mt-3 text-base md:text-lg leading-6 md:leading-8 text-sky-500">
          Experience 4-5 Years
        </h5>
        <div className="image_content flex items-center gap-5 mt-5">
          <img
            src={Ellipse}
            alt="Creator"
            className="rounded-full w-12 h-12 md:w-14 md:h-14 shadow-md"
          />
          <h4 className="flex-auto my-auto font-medium text-neutral-700">
            Job Created by <br />
            Nadia K, HR Executive at ABC Consultancy
          </h4>
        </div>
        <hr className="my-5 border-t-2 border-neutral-300" />
        <div className="Quandans flex flex-col  sm:flex-row justify-start sm:items-center ">
          <h1 className="text-base font-light leading-7 text-neutral-500 min-w-[30%]">
            Interview Category
          </h1>
          <h1 className="text-lg leading-7 font-bold text-slate-800">
            Frontend Developer
          </h1>
        </div>
        <hr className="my-5 border-t-2 border-neutral-300" />
        <div className="Quandans flex flex-col  sm:flex-row justify-start sm:items-center">
          <h1 className="text-base font-light leading-7 text-neutral-500 min-w-[30%]">
            Total Questions
          </h1>
          <h1 className="text-lg leading-7 font-bold text-slate-800">20</h1>
        </div>
        <hr className="my-5 border-t-2 border-neutral-300" />
        <div className="Quandans flex flex-col  sm:flex-row justify-start sm:items-center">
          <h1 className="text-base font-light leading-7 text-neutral-500 min-w-[30%]">
            Interview Time
          </h1>
          <h1 className="text-lg leading-7 font-bold text-slate-800">
            60 minutes
          </h1>
        </div>
        <hr className="my-5 border-t-2 border-neutral-300" />
        <div className="Quandans flex flex-col  sm:flex-row justify-start sm:items-center">
          <h1 className="text-base font-light leading-7 text-neutral-500 min-w-[30%]">
            Interview Date
          </h1>
          <h1 className="text-lg leading-7 font-bold text-slate-800">
            05 May 2024
          </h1>
        </div>
        <hr className="my-5 border-t-2 border-neutral-300" />
        <div className="flex flex-row gap-2.5 justify-center items-center self-end px-4 py-5 mt-8 max-w-full text-sm font-medium text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full cursor-pointer">
          <div>Start Your Assessment    </div>
          <div> <MdArrowOutward size={20} /></div>
       </div>
     </div>
    </div>
  );
}

export default Visitor_dummy;
