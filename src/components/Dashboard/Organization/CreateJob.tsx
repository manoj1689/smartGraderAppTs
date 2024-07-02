import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationBar from "../../common/Notification/NotificationBar";
import { FaLaptopCode } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdSaveAlt } from "react-icons/md";
import codingDev from "../../../assets/images/Individual/codingdeveloper.png";
import star from "../../../assets/images/Individual/Star.png";
import java from "../../../assets/images/Individual/javaLogo.png";
import Coding from "../../../assets/images/Organisation/coding.png";
import DatePicker from "react-datepicker";
import { MdArrowOutward } from "react-icons/md";
import { CreateJobService } from "../../../services/api/CreateJobService";
import SelectSet from "../../../assets/images/Organisation/selectSet.gif";
import { fetchSetDetail } from "../../../services/api/SetService";
import { Card } from "../../../types/interfaces/interface";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import QuestionView from "./QuestionView";
import Modal from "react-modal";

const CreateJobs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSetId = location.state?.selectedSetId || null;
  const [isedited, setIsedited] = useState(true);
  const [isQuestionModel, setIsQuestionModel] = useState(false);
  const [questionSet, setQuestionSet] = useState<Card>();
  const {
    emails,
    currentEmail,
    jobData,
    startDate,
    endDate,
    setJobData,
    setStartDate,
    setEndDate,
    handleInputChange,
    handleKeyPress,
    getJobInitial,
    handleSaveAndPublish,
    handleDelete,
  } = CreateJobService(selectedSetId);

  const canSave = jobData.title && jobData.experience;
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
    <div className="container lg:w-5/6 mx-auto w-full h-full">
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
         
          

            <div>
              <div>
                {selectedSetId ? (
                  <div className="my-5">
                    <div className="text-xl font-spline font-semibold text-gray-700">Selected Question Set</div>
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
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <img
                      src={SelectSet}
                      alt="Select-Set"
                      className="w-2/3 sm:w-1/3"
                    />
                    <span className="my-5 text-xl text-gray-400 font-spline font-semibold ml-5">
                      Select Set Please !
                    </span>
                    <button
                      className="flex justify-center items-center w-full sm:w-1/2 self-stretch px-4 py-3 my-5 text-base  text-white bg-gray-500 hover:bg-gray-700 rounded border border-gray-500 border-solid max-md:px-5"
                      onClick={() => navigate("selectset")}
                    >
                      <div className="flex gap-2.5">
                        <div>Select your Question Sets</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {isedited ? (
              <div className="bg-white my-5  rounded-lg">
                <form>
                  <h2 className="text-xl font-spline font-semibold text-gray-600 mb-4">
                    Add Job
                  </h2>

                  <div className="flex flex-col sm:flex-row gap-3 ">
                    <span className="block mt-5 text-lg font-spline font-medium text-gray-700 whitespace-nowrap">
                      Job Title
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Post "
                      value={jobData.title}
                      onChange={(e) =>
                        setJobData({ ...jobData, title: e.target.value })
                      }
                      className="justify-center items-start mt-5 p-4 leading-4 rounded  w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 ">
                    <span className="block mt-5 text-lg font-spline font-medium text-gray-700 whitespace-nowrap">
                      Experience Required
                    </span>

                    <input
                      type="text"
                      value={jobData.experience}
                      placeholder="Enter Experience"
                      onChange={(e) =>
                        setJobData({ ...jobData, experience: e.target.value })
                      }
                      className="justify-center items-start mt-5 p-4 leading-4 rounded  w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      onClick={() => setIsedited(false)}
                      className={`flex justify-center w-full sm:w-1/2 items-center px-4 py-3 my-5 text-base text-white bg-sky-500 rounded border border-sky-500 border-solid max-md:px-5 ${
                        !canSave && "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!canSave}
                    >
                      <div className="flex gap-2.5">
                        <div className="flex items-center gap-3">
                          <span>Save</span>
                          <span>
                            <MdSaveAlt size={20} />
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="w-full my-5 text-lg font-semibold text-gray-700 font-spline leading-6 max-md:max-w-full">
                  Job Title
                </div>
                <div className="flex gap-2.5 justify-between items-start px-3.5 pt-3.5 pb-5 mt-6 w-full bg-sky-50 rounded-md border border-sky-500 border-solid max-md:flex-wrap max-md:max-w-full">
                  <div className="flex flex-col mt-2">
                    <div className="text-lg font-semibold font-spline text-gray-700 leading-6">
                      Name-{" "}
                      <span className="font-medium font-spline text-gray-700">
                        {jobData.title}
                      </span>
                    </div>
                    <div className="mt-3 text-md text-base font-spline font-semibold text-gray-700 leading-6">
                      Experience required -
                      <span className="font-medium font-spline text-gray-700">
                        {jobData.experience}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="shrink-0 aspect-square w-[30px] bg-sky-500 text-white flex items-center justify-center rounded-full">
                      {getJobInitial(jobData.title)}
                    </div>

                    <FaEdit size={30} onClick={() => setIsedited(true)} className="cursor-pointer" />
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-5 my-5 text-lg leading-6 max-md:flex-wrap">
              <div className="flex flex-col flex-1 grow shrink-0  basis-0 w-fit">
                <div className="font-semibold text-lg font-spline text-slate-700">
                  Interview Start Date{" "}
                </div>
                <DatePicker
                  className="flex gap-2.5 justify-between px-4 py-5 mt-4 bg-white rounded-md border border-solid border-neutral-500 text-neutral-500"
                  selected={startDate}
                  onChange={(date) => setStartDate(date as Date)}
                />
              </div>
              <div className="flex flex-col flex-1 grow shrink-0 px-5 basis-0 w-fit">
                <div className="font-semibold text-lg font-spline text-slate-700">
                  Interview End Date{" "}
                </div>
                <DatePicker
                  className="flex gap-2.5 justify-between px-4 py-5 mt-4 bg-white rounded-md border border-solid border-neutral-500 text-neutral-500"
                  selected={endDate}
                  onChange={(date) => setEndDate(date as Date)}
                />
              </div>
            </div>

            <div className=" my-5 font-semibold text-lg font-spline text-slate-700">
              Send Job Invites
            </div>
            <div className="rounded-md border min-h-32 border-gray-500 border-solid p-4">
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {emails.map((email, index) => (
                    <div
                      key={index}
                      className="justify-center px-5 py-2.5 text-xs leading-4 text-sky-500 whitespace-nowrap bg-sky-50 border border-sky-500 w-auto border-solid rounded-[30px]"
                    >
                      {email}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={currentEmail}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter email..."
                  className="mt-4 px-4 py-2 focus:outline-none focus:ring-0 focus:border-transparent w-full"
                />
              </div>
            </div>

            <button
              className="flex justify-center items-center self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full sm:w-2/3 max-md:px-5"
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
            <button
              className="flex justify-center items-center mx-auto self-stretch px-4 py-5 my-10 text-red-500 bg-white rounded-md border border-gray-400 w-full sm:w-2/3 max-md:px-5"
              onClick={handleDelete}
            >
              <div className="flex gap-2.5">
                <div>Delete</div>
              </div>
            </button>
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
