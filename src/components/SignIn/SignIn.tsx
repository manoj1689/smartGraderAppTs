import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import smartLogo from "../../assets/logos/smart-logo.png"
import educationSticker from "../../assets/stickers/persons/education-sticker.png";
import organisationSticker from "../../assets/stickers/persons/organisation-sticker.png";
import individualSticker from "../../assets/stickers/persons/individul-sticker.png";
import socialIcon from "../../assets/logos/social-icon.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginService } from "../../services/api/LoginService.ts";
import { handleMouseDown, handleMouseUp } from "../common/Mouse/HandleMouse.ts";
import { handleChange, handleCheckboxChange } from "../common/Form/HandleForm.ts";
import { FormData } from "../../types/interfaces/interface.ts";
import { getRememberedEmail, getRememberedPassword,  } from '../../utils/rememberedCredentials.ts';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTab } = location.state || {};
  
  const [isPressed, setIsPressed] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    agreedToTerms: false,
  });

  useEffect(() => {
    const rememberedEmail = getRememberedEmail();
    const rememberedPassword = getRememberedPassword();
    if (rememberedEmail && rememberedPassword) {
      setFormData((prevData) => ({
        ...prevData,
        email: rememberedEmail,
        password: rememberedPassword,
        agreedToTerms: true,
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submit successfully", formData);
    await LoginService(formData, navigate, activeTab);
  };
 
  return (
    <>
      <div className="container mx-auto min-h-screen px-4 py-4 flex flex-col lg:flex-row ">
        <div className="lg:hidden w-full ">
          <Link to="/">
            <div className="w-1/4">
              <img src={smartLogo} alt="smart Grader" />
            </div>
          </Link>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          {activeTab !== "organization" && activeTab !== "educational" && (
            <div className="flex flex-col justify-center px-8 py-7 mt-5 bg-white rounded-md">
              <div className="flex flex-row gap-5 max-md:flex-wrap ">
                <img
                  loading="lazy"
                  alt="individual"
                  src={individualSticker}
                  className="shrink-0 self-start w-12 aspect-[0.94]"
                />
                <div className="flex flex-col">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-slate-800 font-medium  font-spline">
                    Individual User
                  </div>
                  <div className="  font-sans text-lg font-light text-gray-600 my-1.5 ">
                    I am a candidate and want to test my skills through mock
                    interviews.
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "organization" && (
            <div className="flex flex-col justify-center px-8 py-7 mt-5 bg-white rounded-md">
              <div className="flex gap-5 max-md:flex-wrap">
                <img
                  loading="lazy"
                  alt="organisation"
                  src={organisationSticker}
                  className="shrink-0 self-start w-12 aspect-square"
                />
                <div className="flex flex-col">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-slate-800 font-medium  font-spline">
                    Organization
                  </div>
                  <div className="  font-sans text-lg  font-light text-gray-600 my-1.5 ">
                    I am an organization and want to outsource my interviews
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "educational" && (
            <div className="flex flex-col justify-center px-8 py-7 mt-5 bg-white rounded-md">
              <div className="flex gap-5 max-md:flex-wrap">
                <img
                  loading="lazy"
                  alt="eductional"
                  src={educationSticker}
                  className="shrink-0 self-start w-12 aspect-square"
                />
                <div className="flex flex-col">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-slate-800 font-medium  font-spline">
                    Educational Institution
                  </div>
                  <div className=" font-sans text-lg  font-light text-gray-600 my-1.5 ">
                    I am a candidate and want to test my skills through mock
                    interviews.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full  lg:w-1/2">
          <ToastContainer />
          <div className="flex flex-col h-[70%] my-20 text-sm max-md:max-w-full justify-center items-center">
            <div className="max-lg:hidden  ">
              <Link to="/">
                <img
                  width={179}
                  height={43}
                  src={smartLogo}
                  alt="smart Grader"
                />
              </Link>
            </div>
            {activeTab === "individual" && (
              <div className="self-center font-spline  mt-5 text-xl sm:text-2xl text-slate-800">
                Log In as Candidate
              </div>
            )}
            {activeTab === "organization" && (
              <div className="self-center font-spline  mt-5 text-xl sm:text-2xl text-slate-800">
                Log In as Organization
              </div>
            )}
            {activeTab === "educational" && (
              <div className="self-center font-spline  mt-5 text-xl sm:text-2xl text-slate-800">
                Log In as Student
              </div>
            )}
           <form onSubmit={handleSubmit} className="flex-flex-col w-full sm:w-96">
  <div>
    <input
      type="email"
      name="email"
      placeholder="Email*"
      required
      value={formData.email}
      onChange={(e) => handleChange(e, setFormData)}
      className="justify-center items-start p-5 mt-10 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
      autoFocus={localStorage.getItem("rememberedEmail") === null}
    />
  </div>

  <div>
    <input
      type="password"
      name="password"
      placeholder="Password*"
      required
      value={formData.password}
      onChange={(e) => handleChange(e, setFormData)}
      className="justify-center items-start p-5 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
    />
  </div>

  <div className="flex flex-row justify-between gap-3 mt-6 leading-5 max-md:flex-wrap">
    <div className="flex flex-row gap-3">
      <input
        type="checkbox"
        name="agreedToTerms"
        checked={formData.agreedToTerms}
        onChange={(e) => handleCheckboxChange(e, formData, setFormData)}
        className="shrink-0 self-start rounded-md border border-solid border-neutral-500 h-[18px] w-[18px] focus:border-orange-300 focus:ring-orange-300"
      />
      <div className="text-gray-600 font-spline ">Remember Me </div>
    </div>
    <Link to="password">
      <div className="text-cyan-600 font-spline ">
        Forget Password?
      </div>
    </Link>
  </div>
  <button
    className={`flex justify-center items-center px-4 py-5 mt-8 text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full ${
      isPressed ? "bg-sky-600" : "bg-sky-500"
    }`}
    onMouseDown={() => handleMouseDown(setIsPressed)}
    onMouseUp={() => handleMouseUp(setIsPressed)}
    type="submit"
  >
    <div className="flex gap-2.5 px-3 font-spline ">
      <span className="font-spline  text-sm sm:text-lg">Login</span>
    </div>
  </button>

  <div className="flex flex-col self-end mt-8 leading-5 text-center">
    <div>
      <span className="font-light text-gray-600 font-sans ">
        Don't have an account?
      </span>{" "}
      <br />
      <div
        className="text-cyan-600 cursor-pointer font-spline "
        onClick={() => navigate("/createAccount")}
      >
        Signup
      </div>
    </div>
  </div>
</form>

          </div>
          <div className="flex  px-5   text-sm  font-light leading-5 justify-center text-center text-neutral-500">
            <div className="flex flex-col sm:flex-row">
              <div className="flex mx-5 ">
                <div className="flex px-2 sm:px-4 md:gap-5 font-spline max-sm:text-[12px]  ">
                  Legal information
                </div>
                <div className="flex px-2 sm:px-4 md:gap-5 font-spline max-sm:text-[12px]  ">
                  Help Resources
                </div>
              </div>
              <img
                loading="lazy"
                alt="socialIcon"
                src={socialIcon}
                className="shrink-0 self-center mx-5  aspect-[4.35] w-[93px]"
              />
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
