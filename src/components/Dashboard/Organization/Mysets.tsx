import React, { useState, useEffect } from "react";
import { fetchMySets, editMySet } from "../../../services/api/SetService";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
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
import { dropEllipsis, dropNav, combine } from "react-responsive-pagination/narrowBehaviour";
import { useNavigate } from "react-router-dom";
import QuestionView from "./QuestionView";
import Modal from "react-modal";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FiArrowUpRight } from "react-icons/fi";
Modal.setAppElement("#root");

const MySets: React.FC = () => {
  const navigate = useNavigate();
  const [mySets, setMySets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [selectedSetId, setSelectedSetId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

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
    <div>
      <div className="rounded-md border border-solid my-5 p-4 border-black border-opacity-10">
        <ToastContainer />
        <div >
          <div className="flex flex-col sm:flex-row gap-8 justify-start">
            <div className="flex gap-3 items-center">
              <span>
                <MdOutlineDataset size={24} color="#01AFF4" />
              </span>
              <span className="text-xl lg:text-2xl font-spline font-semibold text-gray-700">
               My AI Sets
              </span>
            </div>
            <span>
              <button
                className="flex justify-center items-center px-4 py-3 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid max-md:px-5"
                onClick={() => navigate("createset")}
              >
                <div className="flex gap-2.5">
                  <div className="flex items-center gap-3">
                    <span>Upload Own Question Set</span>
                    <span>
                      <MdArrowOutward />
                    </span>
                  </div>
                </div>
              </button>
            </span>
          </div>
        </div>
        <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
        {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 ">
            {currentItems.map((card) => (
              <div
                key={card.id}
                className={`flex flex-col my-3 p-4 mx-auto  rounded-md border border-solid border-black border-opacity-10 shadow-md hover:shadow-lg hover:border-slate-800 transition duration-300 max-sm:w-80 max-lg:w-72 min-w-60  2xl:min-w-64 bg-white font-light text-neutral-500 cursor-pointer  ${
                  selectedSetId === card.id.toString() ? "bg-blue-200" : ""
                }`}
              >
                 <div className="flex flex-col gap-2">
                  <div className="flex justify-center">
                    <img
                      loading="lazy"
                      src={codingDev}
                      alt={card.title}
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="flex justify-between">
                      <div className="flex relative gap-1 py-1.5 mt-3 bg-white rounded-sm shadow-sm">
                        <img
                          loading="lazy"
                          alt="star"
                          src={star}
                          className="shrink-0 aspect-[1.09] fill-amber-400 w-[17px] h-[17px]"
                        />

                        <div className="flex-auto">{card.rating}/5</div>
                      </div>
                      <div>
                        <img
                          loading="lazy"
                          src={java}
                          alt={card.image_url}
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between mt-4">
                  <div className="flex gap-1 bg-sky-200 rounded-xl px-2 py-1 text-sm leading-4">
                    <img
                      loading="lazy"
                      alt="grader"
                      src={graderLogo}
                      className="shrink-0 aspect-[1.27] w-[30px]"
                    />
                    <div className="my-auto">SmartGrader</div>
                  </div>
                  
                  <div className="justify-center px-2 py-1 my-auto text-xs leading-4 whitespace-nowrap bg-sky-50 rounded-md border border-solid border-neutral-500">
                    {/* {card.level} */}
                    frontend
                  </div>
                </div>
                <div className=" text-sm leading-6 text-slate-800">
                  {card.title}
                  {/* {card.description} */}
                </div>
                    <div className="flex flex-row justify-between   px-0.5 text-sm leading-2">
                    <div className="flex gap-2 self-start mt-2 text-xs items-center leading-5">
                  <div className="flex gap-1">
                    <div className="flex justify-center items-center ">
                      <CiClock2 size={14} color="#01AFF4" />
                    </div>
                    <div>{card.duration} Min</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex justify-center items-center ">
                      <IoHelpCircleOutline size={14} color="#01AFF4" />
                    </div>
                    <div>{card.questions_count} Questions</div>
                  </div>
                </div>
                    
                      <div>
                        <Popup
                          trigger={<button className="text-gray-500 hover:text-gray-600"><HiDotsVertical size={25} /></button>}
                          z-Index={1000}
                          position="left center"
                        >
                          <div className="py-1">
                            <button
                              className="flex gap-3  items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                              onClick={() =>
                                handleEditClick(card.id, card.title, card.description)
                              }
                            >
                              <FaEdit size={20} className="text-gray-600" />
                              <span className="ml-2">Edit</span>
                            </button>
                            <button
                              className="flex gap-3  items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
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
                      </div>
                    </div>
                    <button
                  className="flex items-center justify-center px-4 py-3 mt-4 text-xs text-white bg-sky-500 rounded border border-sky-500 border-solid hover:bg-slate-800 hover:border-slate-800"
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
              width:"auto",
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

