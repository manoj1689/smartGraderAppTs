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
        <div className="py-3">
          <div className="flex flex-col sm:flex-row gap-8 justify-start">
            <div className="flex gap-3 items-center">
              <span>
                <MdOutlineDataset size={30} color="gray" />
              </span>
              <span className="text-xl lg:text-2xl font-spline font-semibold text-gray-700">
                Question Sets
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
          <div className="flex flex-wrap max-lg:justify-start max-lg:align-center gap-5 px-5 py-10 mt-10 cursor-pointer">
            {currentItems.map((card) => (
              <div
                key={card.id}
                className={`flex justify-between px-3 py-6 font-light rounded-md border border-sky-500 border-solid text-neutral-500 ${
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
                  <div className="flex flex-col">
                    <div className="flex gap-1 self-start py-1.5 text-xs leading-4 whitespace-nowrap rounded-sm shadow-sm">
                      <img
                        loading="lazy"
                        alt="star"
                        src={star}
                        className="shrink-0 aspect-[1.09] fill-amber-400 w-[17px] h-[17px]"
                      />
                      <div className="flex-auto">{card.rating}/5</div>
                    </div>
                    <div className="flex mt-2.5 w-72 text-lg leading-4 text-slate-800">
                      <div className="flex">
                        <div>{card.title}</div>
                        <img
                          loading="lazy"
                          alt="java"
                          src={java}
                          className="shrink-0 aspect-[1.09] ml-5 w-[30px] h-[30px]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row  mt-3 justify-around items-center px-0.5 text-sm leading-2">
                      <div className="flex flex-col  ">
                        <div className="flex gap-1">
                          <div className="flex justify-center items-center">
                            <CiClock2 size={14} color="#01AFF4" />
                          </div>
                          <div>{card.duration} Min</div>
                        </div>
                        <div className="flex gap-1 ">
                          <div className="flex justify-center items-center">
                            <IoHelpCircleOutline size={14} color="#01AFF4" />
                          </div>
                          <div>{card.questions_count} Questions</div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center self-stretch px-2.5 py-1 text-xs leading-4 whitespace-nowrap bg-sky-50 rounded-md border border-solid border-neutral-500">
                        Frontend
                      </div>
                      <div className=" justify-center items-center">
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

