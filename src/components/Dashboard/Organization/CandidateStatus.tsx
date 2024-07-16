import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
const CandidateStatus: React.FC = () => {
  return (
    <div className="flex  flex-col  lg:flex-row my-5  ">
      <div className="w-full lg:w-1/3 ">
      <div className="flex flex-col  justify-between items-start px-7 pt-7 pb-4 mx-2 bg-white rounded-md border border-solid border-black border-opacity-10 ">
        <div className="flex flex-col font-medium text-slate-800 ">
          <div className="text-lg leading-6">Interviews</div>
          <div className="mt-2.5 text-sm font-light leading-5 text-neutral-500">
            Jan 2024
          </div>
          <div className="flex gap-5 mt-7 w-full text-4xl leading-6 whitespace-nowrap justify-around items-center  ">
          <TiGroup size={50}  color="#01AFF4" />
            <div className="my-auto">50</div>
            <div className="flex gap-5  my-auto text-sm leading-5 text-sky-500">
             <BsGraphUpArrow size={25} />
              <div className="my-auto">30%</div>
            </div>
          </div>
        </div>
      </div>

      </div>
     <div className="w-full lg:w-1/3 "> 
     <div className="flex flex-col justify-between items-start px-7 pt-7 pb-4 mx-2 bg-white rounded-md border border-solid border-black border-opacity-10  ">
        <div className="flex flex-col font-medium text-slate-800 ">
          <div className="text-lg leading-6">Shortlisted</div>
          <div className="mt-2.5 text-sm font-light leading-5 text-neutral-500">
          Year 2024
          </div>
          <div className="flex gap-5 mt-7 w-full text-4xl leading-6 whitespace-nowrap justify-around items-center ">
          <TiGroup size={50}  color="rgb(234 88 12)" />
            <div className="my-auto">30</div>
         
          <div className="flex gap-5 my-auto text-sm leading-5 text-orange-600">
          <BsGraphDownArrow size={25}/>
            <div className="my-auto">20%</div>
          </div>
        </div>
        </div>
      </div>

     </div>
     
    <div className="w-full lg:w-1/3">
    <div className="flex flex-col justify-between items-start px-7 pt-7 pb-4 mx-2 bg-white rounded-md border border-solid border-black border-opacity-10   ">
        <div className="flex flex-col font-medium text-slate-800 ">
          <div className="text-lg leading-6"> Hired Candidates</div>
          <div className="mt-2.5 text-sm font-light leading-5 text-neutral-500">
          Year 2024
          </div>
          <div className="flex gap-5 mt-7 w-full text-4xl leading-6 whitespace-nowrap justify-around items-center ">
       
          <TiGroup size={50}  color="rgb(5 150 105)" />
            <div className="my-auto">20</div>
        
          <div className="flex gap-5 my-auto text-sm leading-5 text-emerald-600">
           <BsGraphUpArrow size={25}/>
            <div className="my-auto">20%</div>
          </div>
        </div>
        </div>
      </div> 

    </div>
    

      
    </div>
  );
};

export default CandidateStatus;
