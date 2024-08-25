import React, { useState, useEffect } from "react";
import { fetchMySets, editMySet } from "../../../services/api/SetService";
import ResponsivePagination from "react-responsive-pagination";
// import 'react-responsive-pagination/themes/bootstrap.css'
import "../../../pagination.css";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineDataset, MdArrowOutward } from "react-icons/md";
import graderLogo from "../../../assets/images/Individual/graderIcon.png";
import codingDev from "../../../assets/images/Individual/codingdeveloper.png";
import star from "../../../assets/images/Individual/Star.png";
import java from "../../../assets/images/Individual/javaLogo.png";
import noRecordFound from "../../../assets/images/Individual/NoRecordFound.png";
import { Card, updatedSetData } from "../../../types/interfaces/interface";
import { ToastContainer, toast } from "react-toastify";
import {
  dropEllipsis,
  dropNav,
  combine,
} from "react-responsive-pagination/narrowBehaviour";
import { useNavigate } from "react-router-dom";
import QuestionView from "./QuestionView";
import Modal from "react-modal";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FiArrowUpRight } from "react-icons/fi";
Modal.setAppElement("#root");

const MySets: React.FC = () => {
  const navigate = useNavigate();
  const [mySets, setMySets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 5;
  const [selectedSetId, setSelectedSetId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const getItemsPerPage = (width: number): number => {
    if (width < 640) return 2; // For sm screens
    if (width < 768) return 2; // For md screens
    if (width < 1024) return 4; // For lg screens
    if (width < 1280) return 6; // For xl screens
    if (width < 1520) return 8; // For 2xl screens

    return 10; // Default for large screens
  };

  const [itemsPerPage, setItemsPerPage] = useState<number>(
    getItemsPerPage(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMySets = async () => {
    const SetsList = await fetchMySets(0);
    setMySets(SetsList);
  };

  useEffect(() => {
    loadMySets();
  }, []);

  const handleViewDetailsClick = (setId: string) => {
    setSelectedSetId(setId);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: number, title: string, description: string) => {
    setSelectedSetId(id.toString());
    setEditTitle(title);
    setEditDescription(description);
    setIsEditModalOpen(true);
  };
  const continueWithSet = (card: Card) => {
    setSelectedSetId(card.id.toString());
    console.log("Selected Question Set ID:", card.id);
    navigate("/dashboard/createjobs", {
      state: { selectedSetId: card.id.toString() },
    });
  };

  const handleEditSave = async () => {
    const updatedSetData: updatedSetData = {
      title: editTitle,
      description: editDescription,
      set_id: selectedSetId,
    };

    try {
      await editMySet(updatedSetData, navigate, toast);
      setIsEditModalOpen(false);
      loadMySets(); // Refresh sets after edit
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  const handleDeleteClick = (id: number) => {
    console.log("Delete Clicked for ID:", id);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = mySets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(mySets.length / itemsPerPage);

  return (
    <div className="mx-2">
      <div className="bg-sky-100 p-4 rounded-md shadow-lg">
        <ToastContainer />
        <div className="">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 ">
  <div className="flex items-center gap-4 p-4 bg-sky-200 rounded-lg shadow-md">
    <span>
      <MdOutlineDataset size={32} color="#01AFF4" />
    </span>
    <span className="text-xl font-bold text-gray-900">
      AI Sets by Our Team
    </span>
  </div>
  <button
    className="flex items-center gap-3 px-6 py-3 text-base text-white bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg shadow-md hover:from-sky-600 hover:to-sky-700 transition-all duration-300 ease-in-out"
    onClick={() => navigate("/dashboard/generatequestion")}
  >
    <span className="font-medium">Upload Own Question Set</span>
    <MdArrowOutward size={22} />
  </button>
</div>

          <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
        </div>

        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 ">
            {currentItems.map((card) => (
              <div
                key={card.id}
                className={`className="flex flex-col my-5 p-4 mx-auto max-lg:w-72 w-full rounded-md border border-solid border-black border-opacity-10 shadow-md hover:shadow-lg hover:border-slate-800 transition duration-300   bg-white font-light text-neutral-500 cursor-pointer" ${
                  selectedSetId === card.id.toString() ? "bg-blue-200" : ""
                }`}
              >
                <div>
                  <div className="flex flex-col justify-center items-center   rounded-lg shadow-sm">
                    <div className="flex bg-sky-200 w-full p-2 justify-center rounded ">
                      <img
                        loading="lazy"
                        alt="Coding"
                        src={codingDev}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex w-full  justify-between items-center gap-2  px-3 ">
                      <div className="flex  justify-center items-center py-2 gap-2">
                        <img
                          loading="lazy"
                          alt="star"
                          src={star}
                          className="w-5 h-5 text-yellow-500"
                        />
                        <span className="text-base pt-1 font-medium text-gray-800">
                          {card.rating}/5
                        </span>
                      </div>
                      <div className="px-3 py-1 text-sm text-sky-800 bg-sky-200 rounded-md">
                        Frontend
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center ">
                    <div className="flex items-center  gap-2">
                      <img
                        loading="lazy"
                        alt="grader"
                        src={graderLogo}
                        className="w-10 h-10 rounded-md border border-gray-300  shadow-sm"
                      />
                      <div className="text-md font-medium text-gray-500 bg-sky-200 p-2 rounded">
                        SmartGrader
                      </div>
                    </div>
                    <div className="">
                      <img
                        loading="lazy"
                        alt="java"
                        src={java}
                        className="w-12 h-12"
                      />
                    </div>
                  </div>

                  <h3 className="py-2 text-lg font-medium font-spline text-slate-700">
                    {card.title}
                  </h3>

                  <div className="flex justify-between items-center ">
                    <div className="flex justify-between items-center gap-4  text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CiClock2 size={18} color="#01AFF4" />
                        <span>{card.duration} Min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoHelpCircleOutline size={18} color="#01AFF4" />
                        <span>{card.questions_count} Questions</span>
                      </div>
                    </div>

                    <div>
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
                            className="flex gap-3  items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                            onClick={() =>
                              handleEditClick(
                                card.id,
                                card.title,
                                card.description
                              )
                            }
                          >
                            <FaEdit size={20} className="text-gray-600" />
                            <span className="ml-2">Edit</span>
                          </button>
                          <button
                            className="flex gap-3  items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                            onClick={() =>
                              handleViewDetailsClick(card.id.toString())
                            }
                          >
                            <FaEye size={20} className="text-gray-600" />
                            <span className="ml-2">View</span>
                          </button>
                          <button
                            className="flex gap-3  items-center px-4 py-2 w-full  text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                            onClick={() => handleDeleteClick(card.id)}
                          >
                            <RiDeleteBinFill
                              size={20}
                              className="text-gray-600"
                            />
                            <span className="ml-2">Delete</span>
                          </button>
                        </div>
                      </Popup>
                    </div>
                  </div>
                  <button
                    className="w-full flex items-center justify-center px-4 py-3 mt-4 text-xs text-white bg-sky-500 rounded border border-sky-500 border-solid hover:bg-slate-800 hover:border-slate-800"
                    onClick={() => continueWithSet(card)}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div>Assign Job</div>
                      <div>
                        <FiArrowUpRight size={15} />
                      </div>
                    </div>
                  </button>
                </div>
                {/* <div className="hidden lg:block my-auto justify-center items-center">
                    <Popup
                      trigger={<button className="text-gray-500 hover:text-gray-600"><HiDotsVertical size={25} /></button>}
                      z-Index={1000}
                      position="bottom center"
                      
                    >
                      <div className="py-1 ">
                        <button
                          className="flex gap-3 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                          onClick={() =>
                            handleEditClick(card.id, card.title, card.description)
                          }
                        >
                          <FaEdit size={20} className="text-gray-600" />
                          <span className="ml-2">Edit</span>
                        </button>
                        <button
                          className="flex gap-3 items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                          onClick={() => handleViewDetailsClick(card.id.toString())}
                        >
                          <FaEye size={20} className="text-gray-600" />
                          <span className="ml-2">View</span>
                        </button>
                        <button
                          className="flex gap-3  items-center px-4 py-2 w-full  text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                          onClick={() => handleDeleteClick(card.id)}
                        >
                          <RiDeleteBinFill size={20} className="text-gray-600" />
                          <span className="ml-2">Delete</span>
                        </button>
                      </div>
                    </Popup>
                  </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <img
              src={noRecordFound}
              className="mx-auto w-96"
              alt="No Matching Data"
            />
          </div>
        )}
        <div className="mt-5 sm:w-3/5 mx-auto">
          <ResponsivePagination
            narrowBehaviour={combine(dropNav, dropEllipsis)}
            current={currentPage + 1}
            total={pageCount}
            onPageChange={(page) => setCurrentPage(page - 1)}
          />
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setSelectedSetId("");
          }}
          contentLabel="Question Page Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              zIndex: 21,
              position: "absolute",
              maxHeight: "80%",
              overflowY: "auto",
              transform: "translate(-50%, -50%)",
              width: "80%",
            },
          }}
        >
          <QuestionView cardId={selectedSetId} />
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => {
            setIsEditModalOpen(false);
          }}
          contentLabel="Edit Set Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              zIndex: 21,
              position: "absolute",
              maxHeight: "80%",
              overflowY: "auto",
              width: "auto",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <div className="flex text-gray-700 w-80 sm:w-96 font-bold text-xl sm:text-2xl font-spline my-5 gap-3 items-center">
            <span>
              <FaEdit size={25} />
            </span>
            <span>Edit Set</span>
          </div>
          <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
          <form>
            <div className="flex flex-col gap-3 my-3">
              <label
                htmlFor="title"
                className="text-gray-700 font-semibold text-lg font-spline"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={editTitle}
                className="justify-center items-start p-5 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 my-3">
              <label
                htmlFor="description"
                className="text-gray-700 font-semibold text-lg font-spline"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                className="justify-center items-start p-5 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex justify-center w-full items-center px-4 py-3 my-5 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid max-md:px-5"
              onClick={handleEditSave}
            >
              <div className="flex gap-2.5">
                <div className="flex items-center gap-3">
                  <span>Save</span>
                  <span>
                    <MdArrowOutward />
                  </span>
                </div>
              </div>
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MySets;
