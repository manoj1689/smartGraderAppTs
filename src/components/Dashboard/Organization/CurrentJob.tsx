import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FaLaptopCode, FaEye } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import Select, { SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
import { SearchItem, Option } from "../../../types/interfaces/interface";
import { JobList } from "../../../types/interfaces/interface";
import { fetchJobList } from "../../../services/api/JobService";
import ResponsivePagination from "react-responsive-pagination";
import Popup from "reactjs-popup";
import "react-responsive-pagination/themes/classic.css";
import "reactjs-popup/dist/index.css";
import Search from "../../../assets/logos/Search.png";
const CurrentJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobList[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobList[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobList | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [randomNumberApplicant, setRandomNumberApplicant] = useState<number>(0);
  const [randomNumberInterviews, setRandomNumberInterviews] =
    useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option>>(null);
  const [jobStatus, setJobStatus] = useState<string>("");
  const options: Option[] = [
    { value: "nodeJs", label: "nodeJs" },
    { value: "frontend", label: "frontend" },
    { value: "backend", label: "backend" },
  ];

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "4px",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0 4px",
    }),
  };

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      const jobListData = await fetchJobList();
      setJobs(jobListData.reverse());
      setFilteredJobs(jobListData);
      const searchItems = jobListData.map((job) => ({
        id: job.id,
        name: job.title,
      }));
      setSearchList(searchItems);
    };

    fetchData();
  }, []);

  const handleDelete = () => {
    if (selectedJob) {
      deleteJobManually(selectedJob.id);
    }
  };

  const deleteJobManually = (jobId: number) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
    closeDeleteModal();
  };

  const handleViewDetails = (job: JobList) => {
    setSelectedJob(job);
    openDetailModal();
  };

  const handleDeleteClick = (job: JobList) => {
    setSelectedJob(job);
    openDeleteModal();
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page - 1);
  };

  const currentItems = filteredJobs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleOnSearch = (string: string) => {
    setQuery(string);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(string.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleOnSelect = (item: SearchItem) => {
    const filtered = jobs.filter((job) => job.id === item.id);
    setFilteredJobs(filtered);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: SearchItem) => (
    <>
      <span style={{ display: "block", textAlign: "left", cursor: "pointer" }}>
        {item.name}
      </span>
    </>
  );

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div>
      <div className="rounded-md mx-2 bg-white border border-solid px-5 my-10 border-black border-opacity-10 shadow-lg">
        <div className="flex flex-col md:flex-row my-3 gap-3 justify-between">
          <div className="flex flex-row items-center space-x-5 bg-sky-100 p-4 rounded-lg shadow-md">
            <div className="flex ">
              <FaLaptopCode size={30} className="text-sky-500" />
              <span className="text-lg md:text-xl font-semibold pl-4 text-slate-800">
                AI-Optimized Job Listings
              </span>
            </div>
            <div
              className="relative flex items-center justify-center w-12 h-12   md:w-12 md:h-12 bg-whitw border border-gray-300 rounded-full shadow-md cursor-pointer transition-colors duration-200 hover:bg-sky-300"
              onClick={() => navigate("createjobs")}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-sky-400 to-sky-200 rounded-full opacity-75"></div>
              <span className="text-2xl md:text-3xl font-bold text-sky-600 z-10">
                +
              </span>
            </div>
          </div>

          <div className="">
            <div className=" md:w-[350px] max-md:w-full">
              <ReactSearchAutocomplete
                items={searchList}
                onSearch={handleOnSearch}
                onHover={() => {}}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
                styling={{ border: "1.5px solid #C0C0C0", borderRadius: "5px" }}
              />
            </div>
            {/* <div className="flex justify-end my-5 md:my-0">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder="Filters"
                options={options}
                className="w-60"
                styles={customStyles}
              />
            </div> */}
          </div>
        </div>
        <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
        <div className=" mx-auto p-4">
          <Modal
            isOpen={isDetailModalOpen}
            onRequestClose={closeDetailModal}
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
            {selectedJob && (
              <div className="w-80 sm:w-96">
                <span className="text-xl text-gray-600 font-spline font-semibold py-2 ">
                  Job Details
                </span>
                <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
                <div className="gap-2 py-5">
                  <p>
                    <span className="text-lg text-gray-600 font-spline font-semibold">
                      Title:
                    </span>{" "}
                    {selectedJob.title}
                  </p>
                  <p>
                    <span className="text-lg text-gray-600 font-spline font-semibold">
                      Description:
                    </span>{" "}
                    {selectedJob.description}
                  </p>
                  <p>
                    <span className="text-lg text-gray-600 font-spline font-semibold">
                      Experience:
                    </span>{" "}
                    {selectedJob.experience}
                  </p>
                  <p>
                    <span className="text-lg text-gray-600 font-spline font-semibold">
                      Status:
                    </span>{" "}
                    {selectedJob.status === 1 ? "Hiring" : "Closed"}
                  </p>
                  <p>
                    <span className="text-lg text-gray-600 font-spline font-semibold">
                      Interview Start Date:
                    </span>{" "}
                    {selectedJob.start_date}
                  </p>
                  <p>
                    <span className="text-lg text-gray-600 font-spline font-semibold">
                      Interview End Date{" "}
                    </span>
                    {selectedJob.end_date}
                  </p>
                  <button
                    onClick={closeDetailModal}
                    className="bg-red-500 w-full mx-auto mt-5 text-white p-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Modal>

          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
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
            <div className="w-80 sm:w-96">
              <span className="text-xl text-gray-600 font-spline font-semibold py-2 ">
                Confirm Delete
              </span>
              <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
              <p className="font-sans text-gray-600 py-5">
                Are you sure you want to delete this job?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 w-full text-white p-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-500 w-full text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>

          <div>
            {filteredJobs.length === 0 && query && (
              <div className="text-center text-gray-500 mt-4">
                <div className="flex flex-col my-5 w-full justify-center items-center">
                  <img src={Search} alt="Search" width={100} />
                  <span className="my-2"> No matches found.</span>
                </div>
              </div>
            )}

            {currentItems.map((job) => (
              <div
                key={job.id}
                className="flex flex-col bg-slate-100  lg:flex-row gap-6 justify-between w-full max-md:flex-wrap mb-4 border border-gray-300 p-4 rounded-lg  shadow-sm hover:bg-sky-200 "
              >
                <div className="flex w-full lg:w-5/12 gap-4">
                  <div className="flex flex-col my-auto">
                    <div className="sm:text-lg text-xl font-bold font-spline leading-7 text-gray-700">
                      {job.title}
                    </div>
                    <div className="mt-2  text-md font-normal leading-6 text-gray-600">
                      {job.description}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full lg:w-6/12 max-sm:gap-2 gap-6 justify-between items-start sm:px-6 my-auto">
                  <div className="flex flex-col whitespace-nowrap">
                    <div className="max-sm:text-sm text-lg font-medium leading-6 text-slate-800">
                      Status
                    </div>
                    <div
                      className={`mt-3 max-sm:text-sm text-lg font-light leading-7 text-center ${
                        job.status === 1 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {job.status === 1 ? "Hiring" : "Closed"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="max-sm:text-sm text-lg font-medium leading-6 text-slate-800">
                      Experience
                    </div>
                    <div className="mt-3 max-sm:text-sm text-lg font-light leading-7 text-center text-gray-600">
                      {job.experience}
                    </div>
                  </div>
                  <div className="flex flex-col whitespace-nowrap">
                    <div className=" max-sm:text-sm text-lg font-medium leading-6 text-gray-600">
                      Interview
                    </div>
                    <div className="mt-3 max-sm:text-sm text-lg font-medium leading-7 text-center text-sky-500">
                      {randomNumberInterviews}
                    </div>
                  </div>
                </div>
                <div className="flex lg:w-1/12 flex-col gap-2 justify-center items-center">
                  <Popup
                    trigger={
                      <button className="text-gray-500 hover:text-gray-700">
                        <HiDotsHorizontal size={28} />
                      </button>
                    }
                    position="bottom center"
                    on="click"
                    closeOnDocumentClick
                    arrow={true}
                  >
                    <div className="py-2">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        onClick={() => {
                          navigate("viewjobs", { state: { jobId: job.id } });
                        }}
                      >
                        <FaEye size={18} className="text-gray-600" />
                        <span className="ml-3">View</span>
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        onClick={() => handleViewDetails(job)}
                      >
                        <TbListDetails size={18} className="text-gray-600" />
                        <span className="ml-3">Detail</span>
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        onClick={() => handleDeleteClick(job)}
                      >
                        <RiDeleteBinFill size={18} className="text-gray-600" />
                        <span className="ml-3">Delete</span>
                      </button>
                    </div>
                  </Popup>
                </div>
              </div>
            ))}
          </div>
          <ResponsivePagination
            current={currentPage + 1}
            total={Math.ceil(jobs.length / itemsPerPage)}
            onPageChange={handlePageClick}
            // maxWidth={400}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentJobs;
