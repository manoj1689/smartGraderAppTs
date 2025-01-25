import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { SignUpService } from "../../services/api/SignUpService";
import { handleMouseDown, handleMouseUp } from "../common/Mouse/HandleMouse";
import { SignupRequest } from "../../types/interfaces/interface";
import smartLogo from "../../assets/logos/smartGrader.png";
import individualPerson from "../../assets/images/Account/individual-person.png";
import organizationPerson from "../../assets/images/Account/organization-person.png";
import educationalPerson from "../../assets/images/Account/educational-person.png";
import educationSticker from "../../assets/stickers/persons/education-sticker.png";
import organisationSticker from "../../assets/stickers/persons/organisation-sticker.png";
import individualSticker from "../../assets/stickers/persons/individul-sticker.png";
import { PiSpinnerGapBold, PiSpinnerBold } from "react-icons/pi";
import { ToastContainer } from "react-toastify";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { activeTab?: string } | undefined;

  const [formData, setFormData] = useState<SignupRequest>({
    name: "",
    email: "",
    password: "",
    user_type: "",
  });

  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userType = searchParams.get("userType");

    if (userType) {
      setActiveTab(userType);
    } else if (locationState && locationState.activeTab) {
      setActiveTab(locationState.activeTab);
    }
  }, [location.search, locationState]);

  console.log("The active tab is", activeTab);

  const { handleSubmit, handleChange } = SignUpService(setFormData, setLoading);

  return (
    <>
      <div className="container mx-auto min-h-screen px-4 py-4 flex flex-col lg:flex-row">
        <ToastContainer />
        <div className="lg:hidden w-full">
          <Link to="/">
            <img width={179} height={43} src={smartLogo} alt="smart Grader" />
          </Link>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-5 items-start">
          {(activeTab === undefined || activeTab === "individual") && (
            <div>

              <div className="flex max-sm:hidden  w-full justify-center">
                <img src={individualPerson} alt="individual Person" className="w-96 rounded-lg" />
              </div>

              <div className="flex flex-col justify-center p-4 mt-5 sm:mt-10 bg-gray-100 rounded-md">
                <div className="flex flex-row gap-5 max-md:flex-wrap ">
                  <div className="flex gap-5 justify-center items-center">
                    <img
                      loading="lazy"
                      alt="individual"
                      src={individualSticker}
                      className="shrink-0 self-start w-8 sm:w-12 aspect-[0.94]"
                    />

                    <div className="block md:hidden  text-2xl md:text-4xl text-slate-800 font-medium ">
                      <div>Individual User</div>
                    </div>
                  </div>

                  <div className="flex-col">
                    <div className=" hidden md:block text-2xl  md:text-3xl text-slate-800 font-medium ">
                      Individual User
                    </div>
                    <div className=" font-sans text-md sm:text-lg  font-light text-gray-600 sm:my-1.5 ">
                      I am a candidate and want to test my skills through mock
                      interviews.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
          {(activeTab === undefined || activeTab === "organization") && (
            <div>
              <div className="flex max-sm:hidden  w-full justify-center">
                <img src={organizationPerson} alt="organisation Person" className="w-96 rounded-lg" />
              </div>
              <div className="flex flex-col justify-center p-4  mt-5 bg-gray-100 rounded-md">
                <div className="flex gap-5 max-md:flex-wrap">
                  <div className="flex gap-5 justify-center items-center">
                    <img
                      loading="lazy"
                      alt="organisation"
                      src={organisationSticker}
                      className="shrink-0 self-start w-8 sm:w-12 aspect-square"
                    />

                    <div className="block md:hidden  text-2xl md:text-3xl text-slate-800 font-medium ">
                      <div>Organization</div>
                    </div>
                  </div>

                  <div className=" flex-col">
                    <div className="  hidden md:block  text-2xl  md:text-3xl text-slate-800 font-medium ">
                      Organization
                    </div>
                    <div className=" font-sans text-md sm:text-lg  font-light text-gray-600 sm:my-1.5 ">
                      I am an organization and want to outsource my interviews
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
          {(activeTab === undefined || activeTab === "educational") && (
            <div>

              <div className="flex max-sm:hidden w-full justify-center">
                <img src={educationalPerson} alt="education Person" className="w-96 rounded-lg" />
              </div>


              <div>
                <div className="flex flex-col justify-center p-4 mt-5 bg-gray-100 rounded-md">
                  <div className="flex gap-5 max-md:flex-wrap">
                    <div className="flex gap-5 justify-center items-center">
                      <img
                        loading="lazy"
                        alt="eductional"
                        src={educationSticker}
                        className="shrink-0 self-start w-8 sm:w-12 aspect-square"
                      />

                      <div className="block md:hidden  text-2xl md:text-3xl text-slate-800 font-medium ">
                        <div>Educational Institution</div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className=" hidden md:block text-2xl sm:text-3xl md:text-3xl text-slate-800 font-medium ">
                        Educational Institution
                      </div>
                      <div className=" font-sans txt-md sm:text-lg  font-light text-gray-600 sm:my-1.5 ">
                        I am a candidate and want to test my skills through mock
                        interviews.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col h-full text-sm max-md:max-w-full justify-center items-center">
            <div className="max-lg:hidden">
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
              <div className="self-center  mt-5 text-xl sm:text-2xl text-slate-800">
                Signup as Individual Users
              </div>
            )}
            {activeTab === "organization" && (
              <div className="self-center  mt-5 text-xl sm:text-2xl text-slate-800">
                Signup as Organization
              </div>
            )}
            {activeTab === "educational" && (
              <div className="self-center  mt-5 text-xl sm:text-2xl text-slate-800">
                Signup as Student
              </div>
            )}
            <form
              onSubmit={(e) => handleSubmit(e, formData, activeTab)}
              className="flex flex-col w-full sm:w-96"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange(e, activeTab)}
                  className="justify-center items-start p-5 mt-10 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange(e, activeTab)}
                  className="justify-center items-start p-5 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  required
                  value={formData.password}
                  onChange={(e) => handleChange(e, activeTab)}
                  className="justify-center items-start p-5 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-row justify-center items-start gap-3 mt-6 text-md leading-5 ">
                <span>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded-lg"
                  />
                </span>{" "}
                <span className="text-gray-600">
                  By signing up you agree to SmartGrade{" "}
                  <span className="text-sky-500 mx-2">Privacy Policy</span>{" "}
                  and
                  <span className="text-sky-500 mx-2"> Terms of Service</span>
                </span>
              </div>

              <button
                className={`flex justify-center items-center px-4 py-3 mt-8 text-white bg-sky-500 rounded border border-sky-500 border-solid w-full ${loading || !termsAccepted
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sky-600"
                  }`}
                onMouseDown={() => handleMouseDown(setIsPressed)}
                onMouseUp={() => handleMouseUp(setIsPressed)}
                disabled={loading || !termsAccepted}
                type="submit"
              >
                <div className="flex gap-2.5  justify-center items-center  text-sm sm:text-lg">
                  {loading ? (
                    <PiSpinnerBold className="animate-spin mr-2" size={25} />
                  ) : (
                    <PiSpinnerGapBold className="mr-2 " size={25} />
                  )}
                  <span>Create Account</span>
                  <span>
                    <FiArrowUpRight size={20} />
                  </span>
                </div>
              </button>

              <div className="flex flex-col self-end mt-8 max-w-full leading-5 text-center text-gray-600 w-full">
                <div>
                  <span className="font-light font-sans">
                    Already have an account?
                  </span>{" "}
                  <br />
                  <span
                    className="text-cyan-600 cursor-pointer "
                    onClick={() => navigate("/signIn")}
                  >
                    Log in here
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
