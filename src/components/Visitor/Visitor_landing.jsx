import * as React from "react";
import { FaArrowRight } from "react-icons/fa"; // Importing icon from react-icons
import { motion } from "framer-motion"; // Importing framer-motion for animations
import { Link } from "react-router-dom"; // Importing Link from react-router-dom
import Visitor_dummy from "./Visitor_dummy";
import Subscribe from "../Visitor/Subscribe";
import Footer from "../Visitor/Footer";
import { useState } from "react";
import Visitor_header from "./Visitor_header";
import logo from "../../assets/images/Landing/logo.png";
import banner from "../../assets/images/Landing/banner.png";
import Testimonials from "../Visitor/Testimonials";
import Rectangle from "../../assets/images/Landing/Rectangle 70.png";

function Visitor_landing() {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    console.log("Input value:", inputValue); // Debugging line to check input value
    if (inputValue === "12345") {
      setValue(true);
    } else {
      setErrorMessage("Please enter the correct password"); // Show error message
    }
  };

  return (
    <div >
      {!value && (
        <div className="container mx-auto h-screen px-4 py-4 ">
   <>
          <div className="flex py-10  flex-row justify-between">
            <div>
              <img src={logo} alt="Smart Grader Logo" className="h-11" />
            </div>
            <button className="flex gap-2.5 justify-center px-4 py-2 my-auto text-sm text-white bg-sky-500 rounded-md border border-sky-500 border-solid">
              <div>Contact Support</div>^
            </button>
          </div>
        <div>
        <div className="flex flex-col  w-full lg:flex-row">
            <div className="w-full lg:w-1/3 order-2 lg:order-1 flex flex-col justify-center items-center">
              <div className="flex flex-col mt-2.5 w-10/12 text-sm text-neutral-500">
                <div className="text-2xl text-slate-800">Welcome to </div>
                <div className="mt-4 text-6xl text-slate-800 max-md:text-4xl">
                  SmartGrader
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5639b4710a273bf194ca6afa84379561c151260a9e0a5345e84d3745a6d1ce49?apiKey=64ac1a7b85e84629af509d56edee2526&"
                  className="mt-1.5 max-w-full aspect-[14.29] w-[307px]"
                />
                <div className="mt-2 text-lg leading-6">
                  Your Gateway to Professional Growth
                </div>
                <div className="flex gap-2.5 justify-between mt-20 whitespace-nowrap rounded-md border border-solid border-neutral-500 leading-[100%] max-md:mt-10 p-[2px]">
                  <input
                    type="password"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="my-auto p-4 rounded flex-grow w-full bg-[#F2FBFF] border-transparent focus:border-transparent focus:outline-none"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2158b0368d7dd1d329ebb86f7fcb880b9b630fce80bb5e6c32aa8052884b099?apiKey=64ac1a7b85e84629af509d56edee2526&"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div
                  className="flex justify-center items-center px-4 py-5 mt-3 w-full font-medium text-white bg-sky-500 rounded-md border border-sky-500 border-solid max-md:px-5 cursor-pointer"
                  onClick={handleClick}
                >
                  <button className="flex gap-2.5">
                    <div>Start Your Assessment</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9b4506dcfad2637bb53bf541187812c239909983b58b3dd80d0ef130c2c8e41?apiKey=64ac1a7b85e84629af509d56edee2526&"
                      className="shrink-0 my-auto border-2 border-white border-solid aspect-[0.88] stroke-[2px] stroke-white w-[7px]"
                    />
                  </button>
                </div>
                {errorMessage && (
                  <div className="mt-5 text-red-500 leading-5">
                    {errorMessage}
                  </div>
                )}
                <div className="mt-5 leading-5">
                  We value your privacy and security. Rest assured, your
                  responses and personal information are encrypted and
                  confidential.
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full order-1 lg:order-2 lg:w-2/3 justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-[100%] flex justify-center relative"
              >
                <img
                  src={banner}
                  alt="Designed For Interview"
                  className="w-full md:w-[60%]"
                />
                <img
                  src={Rectangle}
                  alt="This is rectangle"
                  className="absolute top-[20%] left-[10%] w-[25%]"
                />
              </motion.div>
            </div>
           
          </div>
          <div className="flex justify-center mt-10 lg:mt-36 items-center ">
              <div className=" text-neutral-500">
                © Copyrights 2024 All Rights Reserved Smart Graders
              </div>
            </div>
        </div>
          
        </>
        </div>
     
      )}
       
      {value && (
        <>
         <div className="w-full h-screen ">
          <div className="container mx-auto">
          <Visitor_header />
          <Visitor_dummy />
          <Testimonials />
          <Subscribe /> 
          </div>
          <Footer />
         </div>
       
       
        </>
      )}
    </div>
  );
}

export default Visitor_landing;
