import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationBar from "../../common/Notification/NotificationBar";
import AddEmails from "./AddEmails";
import { FaLaptopCode } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaEye } from "react-icons/fa";
import Database from "../../../assets/images/Organisation/Database.jpg";
import codingDev from "../../../assets/images/Individual/codingdeveloper.png";
import star from "../../../assets/images/Individual/Star.png";
import java from "../../../assets/images/Individual/javaLogo.png";
import Coding from "../../../assets/images/Organisation/coding.png";
import DatePicker from "react-datepicker";
import { MdArrowOutward } from "react-icons/md";
import { CreateJobService } from "../../../services/api/CreateJobService";
import { fetchSetDetail } from "../../../services/api/SetService";
import { Card } from "../../../types/interfaces/interface";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import QuestionView from "./QuestionView";
import Modal from "react-modal";
import Select from "react-select";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { FaArrowsDownToPeople } from "react-icons/fa6";

interface Option {
  value: string;
  label: string;
}

const CreateJobs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSetId = location.state?.selectedSetId || null;
  const [isedited, setIsedited] = useState(true);
  const [emailsList, setEmailsList] = useState<string[]>([]);
  const [isQuestionModel, setIsQuestionModel] = useState(false);
  const options = [
    { value: "", label: "Select Experience Level" },
    { value: "internship", label: "Internship" },
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "lead", label: "Lead" },
    { value: "manager", label: "Manager" },
    { value: "director", label: "Director" },
    { value: "vp", label: "Vice President" },
    { value: "cxo", label: "C-Level Executive" },
    { value: "founder", label: "Founder" },
  ];
  const [experience, setExperience] = useState<Option | null>(options[0]); // Default selection

  const handleChange = (experience: Option | null) => {
    setExperience(experience);
  };
  const handleButtonClick = () => {
    console.log(emailsList);
  };
  const [questionSet, setQuestionSet] = useState<Card>();
  const {
    jobData,

    setJobData, // Ensure setJobData is accessible
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleSaveAndPublish,
    handleDelete,
  } = CreateJobService(selectedSetId, emailsList, experience);

  const canSave = jobData.title && experience;
  const openQuestionSetModal = () => setIsQuestionModel(true);
  const closeQuestionSetModal = () => setIsQuestionModel(false);

  useEffect(() => {
    if (selectedSetId) {
      const fetchSet = async () => {
        const setDetails: any = await fetchSetDetail(selectedSetId);
        setQuestionSet(setDetails);
      };
      fetchSet();
    }
  }, [selectedSetId]);

  return (
    <div className="container mx-auto w-full h-full">
      <NotificationBar />

      <div className="bg-white my-5 rounded-md border border-solid border-black border-opacity-10 px-4 py-4">
        <div className="flex flex-row items-center max-lg:my-5 space-x-4">
          <FaLaptopCode size={30} color="5E676B" />
          <span className="text-lg sm:text-xl font-spline font-semibold">
            Current Job Opening
          </span>
        </div>
        <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 order-2 lg:order-1 px-4">
            <div className="bg-white my-5  rounded-lg">
              <form>
                <div className=" p-4 w-full border-solid max-md:flex-wrap max-md:max-w-full">
                  <div className=" gap-3">
                    <span className="block text-lg font-spline font-semibold  text-gray-700 whitespace-nowrap">
                      Title
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Post "
                      value={jobData.title}
                      onChange={(e) =>
                        setJobData({ ...jobData, title: e.target.value })
                      }
                      className="justify-center items-start p-4 leading-4 rounded  w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                  <div className="gap-3 w-full">
                    <span className="block  text-lg font-spline font-semibold  text-gray-700  whitespace-nowrap">
                      Experience Required
                    </span>

                    <Select
                      className="w-full md:w-1/2 my-4"
                      value={experience}
                      onChange={handleChange}
                      options={options}
                      placeholder="Select Experience"
                    />
                  </div>
                </div>

                <div className="mt-5"></div>
              </form>
            </div>

            <div>
              {selectedSetId ? (
                <div className="my-5">
                  <div className="text-xl font-spline font-semibold text-gray-700">
                    Selected Question Set
                  </div>
                  {/* <div>Your Selected Id Of Question Set: {selectedSetId}</div> */}
                  {questionSet && (
                    <div className="flex flex-wrap max-lg:justify-center max-lg:align-center gap-2 px-5 py-10  cursor-pointer">
                      <div
                        key={questionSet.id}
                        className="flex justify-between px-3 py-6 font-light rounded-md border border-sky-500 border-solid text-neutral-500 bg-blue-100"
                      >
                        <div className="flex flex-col lg:flex-row gap-2">
                          <div className="flex justify-center">
                            <img
                              loading="lazy"
                              src={codingDev}
                              alt={questionSet.title}
                              className="w-20 h-20"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex gap-1 self-start py-1.5 text-xs leading-4 whitespace-nowrap rounded-sm shadow-sm">
                              <img
                                loading="lazy"
                                alt="star"
                                src={star}
                                className="shrink-0 aspect-[1.09] fill-amber-400 w-[17px] h-[17px]"
                              />
                              <div className="flex-auto">
                                {questionSet.rating}/5
                              </div>
                            </div>
                            <div className="flex mt-2.5 w-72 text-lg leading-4 text-slate-800">
                              <div className="flex">
                                <div>{questionSet.title}</div>
                                <img
                                  loading="lazy"
                                  alt="java"
                                  src={java}
                                  className="shrink-0 aspect-[1.09] ml-5 w-[30px] h-[30px]"
                                />
                              </div>
                            </div>
                            <div className="flex gap-5 mt-3 justify-around items-center px-0.5 text-sm leading-5">
                              <div className="flex flex-col gap-1 lg:flex-row">
                                <div className="flex gap-1">
                                  <div className="flex justify-center items-center">
                                    <CiClock2 size={14} color="#01AFF4" />
                                  </div>
                                  <div>{questionSet.duration} Min</div>
                                </div>
                                <div className="flex gap-1">
                                  <div className="flex justify-center items-center">
                                    <IoHelpCircleOutline
                                      size={14}
                                      color="#01AFF4"
                                    />
                                  </div>
                                  <div>
                                    {questionSet.questions_count} Questions
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center items-center self-stretch px-2.5 py-1 text-xs leading-4 whitespace-nowrap bg-sky-50 rounded-md border border-solid border-neutral-500">
                                Frontend
                              </div>
                              <div className="block lg:hidden justify-center items-center">
                                <Popup
                                  trigger={
                                    <button className="text-gray-500 hover:text-gray-600">
                                      <HiDotsVertical size={25} />
                                    </button>
                                  }
                                  z-Index={1000}
                                  position="left center"
                                >
                                  <div className="py-1">
                                    <button
                                      className="flex gap-3 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                                      onClick={() => navigate("selectset")}
                                    >
                                      <FaEdit
                                        size={20}
                                        className="text-gray-600"
                                      />
                                      <span className="ml-2">Edit</span>
                                    </button>
                                    <button
                                      className="flex gap-3 items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                                      onClick={openQuestionSetModal}
                                    >
                                      <FaEye
                                        size={20}
                                        className="text-gray-600"
                                      />
                                      <span className="ml-2">View</span>
                                    </button>
                                    {/* <button className="flex gap-3 items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900">
                                        <RiDeleteBinFill
                                          size={20}
                                          className="text-gray-600"
                                        />
                                        <span className="ml-2">Delete</span>
                                      </button> */}
                                  </div>
                                </Popup>
                              </div>
                            </div>
                          </div>
                          <div className="hidden lg:block my-auto justify-center items-center">
                            <Popup
                              trigger={
                                <button className="text-gray-500 hover:text-gray-600">
                                  <HiDotsVertical size={25} />
                                </button>
                              }
                              z-Index={1000}
                              position="bottom center"
                            >
                              <div className="py-1">
                                <button
                                  className="flex gap-3 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                                  onClick={() => navigate("selectset")}
                                >
                                  <FaEdit size={20} className="text-gray-600" />
                                  <span className="ml-2">Edit</span>
                                </button>
                                <button
                                  className="flex gap-3 items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                                  onClick={openQuestionSetModal}
                                >
                                  <FaEye size={20} className="text-gray-600" />
                                  <span className="ml-2">View</span>
                                </button>
                                {/* <button className="flex gap-3 items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900">
                                    <RiDeleteBinFill
                                      size={20}
                                      className="text-gray-600"
                                    />
                                    <span className="ml-2">Delete</span>
                                  </button> */}
                              </div>
                            </Popup>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div
                    className="border-[3px]  flex border-dashed rounded-md border-gray-400 p-5 justify-center cursor-pointer hover:border-gray-500 "
                    onClick={() => navigate("selectset")}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <svg
                        fill="none"
                        stroke="gray"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                        className="gx np rs axv"
                        width="60" // Adjust the width as needed
                        height="60" // Adjust the height as needed
                      >
                        <path
                          d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>

                      <span className="py-2 text-gray-600 font-spline text-md font-semibold">
                        Select Question Set
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="font-semibold  mt-5 text-lg font-spline text-slate-700">
              Scheduled AI Interview
            </div>
            <div className="flex gap-5 my-5 text-lg leading-6 max-md:flex-wrap">
              <div className="flex flex-col flex-1 grow shrink-0  basis-0 w-fit">
                <div className="font-medium text-md font-spline text-slate-700">
                  Start Date{" "}
                </div>
                <DatePicker
                  className="flex gap-2.5 justify-between px-4 py-5 mt-4 bg-white rounded-md border border-solid border-neutral-500 text-neutral-500"
                  selected={startDate}
                  onChange={(date) => setStartDate(date as Date)}
                />
              </div>
              <div className="flex flex-col flex-1 grow shrink-0  basis-0 w-fit">
                <div className="font-medium text-md font-spline text-slate-700">
                  End Date{" "}
                </div>
                <DatePicker
                  className="flex gap-2.5 justify-between px-4 py-5 mt-4 bg-white rounded-md border border-solid border-neutral-500 text-neutral-500"
                  selected={endDate}
                  onChange={(date) => setEndDate(date as Date)}
                />
              </div>
            </div>
          <div>
          <div className="flex justify-center my-4">
              <FaArrowsDownToPeople size={80} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Send Invitation
            </h2>
            <p className="text-center text-gray-600 mb-4">
              You haven’t added any candidates for the interview yet. As the
              owner of this project, you can send invitations for interviews
              with AI.
            </p>
            <ReactMultiEmail
              emails={emailsList}
              onChange={setEmailsList}
              validateEmail={(email) => isEmail(email)}
              getLabel={(email, index, removeEmail) => (
                <div data-tag key={index}>
                  {email}
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              )}
             placeholder="Ex: abc@gmail.com"
              className="w-full p-2 border rounded mb-4 h-20 border-gray-500"
            />

          </div>
            
            <button
              className="flex justify-center items-center sticky bottom-0  self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full sm:w-2/3 max-md:px-5"
              onClick={handleSaveAndPublish}
            >
              <div className="flex gap-2.5">
                <div className="flex items-center gap-3">
                  {" "}
                  <span>Save & Publish This Job </span>
                  <span>
                    <MdArrowOutward />
                  </span>
                </div>
              </div>
            </button>
            {/* <button
              className="flex justify-center items-center sticky bottom-0  self-stretch mx-auto px-4 py-5 mt-10 text-base text-red-500 bg-white-500 rounded-md border border-red-500 border-solid w-full sm:w-2/3 max-md:px-5"
              onClick={handleDelete}
            >
              <div className="flex gap-2.5">
                <div className="flex items-center gap-3">
                  {" "}
                  <span>Cancel </span>
                  <span>
                  x
                  </span>
                </div>
              </div>
            </button>  */}
          </div>

          <div className="flex justify-center items-start  mt-5 lg:pt-20 order-1 lg:order-2 lg:w-1/3 px-4">
            <img loading="lazy" alt="coding" src={Coding} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isQuestionModel}
        onRequestClose={() => setIsQuestionModel(false)}
        contentLabel="Question Page Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Add an overlay with some transparency
            zIndex: 1000, // Set a higher z-index for the overlay
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            zIndex: 21, // Set a higher z-index for the modal content
            position: "absolute",
            maxHeight: "80%", // Set a maximum height for the modal content
            overflowY: "auto", // Enable vertical scrolling when content exceeds the height
            transform: "translate(-50%, -50%)",
            width: "80%", // Set width as needed
            // maxWidth: '500px', // Set maximum width if needed
          },
        }}
      >
        <QuestionView cardId={selectedSetId} />
      </Modal>
    </div>
  );
};

export default CreateJobs;
