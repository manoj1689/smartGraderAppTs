import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import smartLogo from "../../assets/logos/smart-logo.png";
import individualPerson from "../../assets/images/Account/individual-person.png";
import organizationPerson from "../../assets/images/Account/organization-person.png";
import educationalPerson from "../../assets/images/Account/educational-person.png";
import educationSticker from "../../assets/stickers/persons/education-sticker.png";
import organisationSticker from "../../assets/stickers/persons/organisation-sticker.png";
import individualSticker from "../../assets/stickers/persons/individul-sticker.png";
import { handleMouseDown, handleMouseUp } from "../common/Mouse/HandleMouse";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Tab = "individual" | "organization" | "educational" | "";

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab>("");

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleButtonClick = () => {
    if (activeTab === "") {
      toast.error("Please select one of the fields.");
      return;
    }
    navigate("/signUp", { state: { activeTab } });
  };

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row">
      <ToastContainer />
      <div>
        <div className="flex lg:hidden gap-4 items-start text-neutral-500 max-md:flex-wrap">
          <Link to="/">
            <img width={179} height={43} src={smartLogo} alt="smart Grader" />
          </Link>
          <div className="shrink-0 mt-2.5 w-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 h-[33px]" />
          <div className="flex-auto mt-3 text-sm leading-5">
            A brief, catchy phrase that <br />
            encapsulates the SmartGrader mission.
          </div>
        </div>
      </div>
      <div className="w-full order-2 lg:order-1 lg:w-1/2">
        <div>
          <div className="flex max-lg:hidden gap-4 items-start text-neutral-500 max-md:flex-wrap">
            <Link to="/">
              <img width={179} height={43} src={smartLogo} alt="smart Grader" />
            </Link>
            <div className="shrink-0 mt-2.5 border border-solid bg-black bg-opacity-10 border-black border-opacity-10 h-[33px]" />
            <div className="flex-auto mt-3 text-sm leading-5">
              A brief, catchy phrase that <br />
              encapsulates the SmartGrader mission.
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-20 md:mt-32 md:w-5/6 w-full">
          <div className="text-3xl font-medium font-spline md:text-4xl leading-8 text-slate-900 max-md:max-w-full">
            Signup with SmartGrader
          </div>
          <div
            className={`flex flex-col justify-center px-4 py-4 mt-8 bg-white rounded-md border ${
              activeTab === "individual"
                ? "border-sky-500"
                : "border-black border-opacity-10"
            } hover:bg-sky-50 hover:rounded-md cursor-pointer`}
            onClick={() => handleTabClick("individual")}
          >
            <div className="flex flex-row gap-5 max-md:flex-wrap ">
              <div className="flex gap-5 justify-center items-center">
              <img
                  loading="lazy"
                  alt="individual"
                  src={individualSticker}
                  className="shrink-0 self-start w-8 sm:w-12 aspect-[0.94]"
                />
                
                <div className="block md:hidden  text-2xl md:text-4xl text-slate-800 font-medium font-spline">
                  <div>
                  Individual User
                  </div>
              
                 
                </div>

                </div>
            
                <div className="flex-col">
                  <div className=" hidden md:block text-2xl  md:text-3xl text-slate-800 font-medium font-spline">
                  Individual User
                  </div>
                  <div className=" font-sans text-md sm:text-lg  font-light text-gray-600 sm:my-1.5 ">
                  I am a candidate and want to test my skills through mock
                  interviews.
                  </div>
                </div>
              
              </div>
          </div>
          <div
            className={`flex flex-col justify-center px-4 py-4 mt-5 bg-white rounded-md border ${
              activeTab === "organization"
                ? "border-sky-500"
                : "border-black border-opacity-10"
            } hover:bg-sky-50 hover:rounded-md cursor-pointer`}
            onClick={() => handleTabClick("organization")}
          >
             <div className="flex gap-5 max-md:flex-wrap">
                <div className="flex gap-5 justify-center items-center">
                <img
                  loading="lazy"
                  alt="organisation"
                  src={organisationSticker}
                  className="shrink-0 self-start w-8 sm:w-12 aspect-square"
                />
                
                <div className="block md:hidden  text-2xl md:text-3xl text-slate-800 font-medium font-spline">
                  <div>
                  Organization
                  </div>
                 
                </div>

                </div>
             

                <div className=" flex-col">
                  <div className="  hidden md:block  text-2xl  md:text-3xl text-slate-800 font-medium font-spline">
                    Organization
                  </div>
                  <div className=" font-sans text-md sm:text-lg  font-light text-gray-600 sm:my-1.5 ">
                    I am an organization and want to outsource my interviews
                  </div>
                </div>
              </div>
          </div>
          <div
            className={`flex flex-col justify-center px-4 py-4 my-5 bg-white rounded-md border ${
              activeTab === "educational"
                ? "border-sky-500"
                : "border-black border-opacity-10"
            } hover:bg-sky-50 hover:rounded-md cursor-pointer`}
            onClick={() => handleTabClick("educational")}
          >
              <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex gap-5 justify-center items-center">
              <img
                  loading="lazy"
                  alt="eductional"
                  src={educationSticker}
                  className="shrink-0 self-start w-8 sm:w-12 aspect-square"
                />
                
                <div className="block md:hidden  text-2xl md:text-3xl text-slate-800 font-medium font-spline">
                  <div>
                  Educational Institution
                  </div>
                </div>
                </div>
                <div className="flex flex-col">
                  <div className=" hidden md:block text-2xl sm:text-3xl md:text-3xl text-slate-800 font-medium font-spline">
                  Educational Institution
                  </div>
                  <div className=" font-sans txt-md sm:text-lg  font-light text-gray-600 sm:my-1.5 ">
                  I am a candidate and want to test my skills through mock
                  interviews.
                  </div>
                </div>
                </div>
            
          </div>
          <button
            className={`flex justify-center items-center px-4 py-3 mt-8 text-sm text-white rounded-md border border-sky-500 border-solid max-md:px-5 max-md:max-w-full focus:outline-none ${
              isPressed ? "bg-sky-600" : "bg-sky-500"
            }`}
            onMouseDown={() => handleMouseDown(setIsPressed)}
            onMouseUp={() => handleMouseUp(setIsPressed)}
            onClick={handleButtonClick}
          >
              <div className="flex gap-2.5 font-spline justify-center items-center  text-sm sm:text-lg">
              <span>Create an Account</span>
              <span>
                <FiArrowUpRight size={20} />
              </span>
            </div>
          </button>
        </div>
      </div>
      <div className="w-full order-1 lg:order-2 lg:w-1/2 flex justify-center items-end">
        <div className="mt-10">
          {activeTab === "individual" && (
            <img
              src={individualPerson}
              alt="person"
              className=" max-sm:w-52 w-full rounded-md lg:px-16 object-cover"
            />
          )}
          {(activeTab === "organization" || activeTab === "") && (
            <img
              src={organizationPerson}
              alt="person"
              className="max-sm:w-52 w-full rounded-md lg:px-16 object-cover"
            />
          )}
          {activeTab === "educational" && (
            <img
              src={educationalPerson}
              alt="person"
              className=" max-sm:w-52  w-full rounded-md lg:px-16 object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
