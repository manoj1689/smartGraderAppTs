import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { FaLaptopCode, FaEye } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { TbListDetails } from "react-icons/tb";
import { RiDeleteBinFill } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { SearchItem, Option } from '../../../types/interfaces/interface';
import { fetchSearchResults } from '../../../services/api/CurrentJobService';
import { JobList } from "../../../types/interfaces/interface";
import { fetchJobList } from '../../../services/api/JobService';
import ResponsivePagination from 'react-responsive-pagination';
import Popup from 'reactjs-popup';
import "react-responsive-pagination/themes/classic.css";
import 'reactjs-popup/dist/index.css';
import Search from "../../../assets/logos/Search.png"
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
  const [randomNumberInterviews, setRandomNumberInterviews] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);
  const [jobStatus, setJobStatus] = useState<string>("")
  const options: Option[] = [
    { value: 'nodeJs', label: 'nodeJs' },
    { value: 'frontend', label: 'frontend' },
    { value: 'backend', label: 'backend' },
  ];

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: '4px',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 4px',
    }),
  };

  const itemsPerPage = 3;

  const customStylesModel = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ADD8E6',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const jobListData = await fetchJobList();
      setJobs(jobListData);
      setFilteredJobs(jobListData);
      const searchItems = jobListData.map((job) => ({ id: job.id, name: job.title }));
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

  const currentItems = filteredJobs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleOnSearch = (string: string) => {
    setQuery(string);
    const filtered = jobs.filter((job) => job.title.toLowerCase().includes(string.toLowerCase()));
    setFilteredJobs(filtered);
  };

  const handleOnSelect = (item: SearchItem) => {
    const filtered = jobs.filter((job) => job.id === item.id);
    setFilteredJobs(filtered);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item: SearchItem) => (
    <>
      <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}>{item.name}</span>
    </>
  );

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div>
      <div className="rounded-md bg-white border border-solid px-5 my-10 border-black border-opacity-10">
        <div className='mb-10'></div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-row items-center max-lg:my-5 space-x-4">
            <FaLaptopCode size={30} color="5E676B" />
            <span className='text-lg lg:text-xl font-spline font-semibold text-gray-700'>Current Job Opening</span>
            <IoMdAddCircle size={40} color="01AFF4" className="cursor-pointer" onClick={() => navigate('createjobs')} />
          </div>

          <div className="flex flex-col justify-center md:flex-row">
            <div className="md:mb-0 md:px-5 md:w-[350px] max-md:w-full">
              <ReactSearchAutocomplete
                items={searchList}
                onSearch={handleOnSearch}
                onHover={() => {}}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
                styling={{ border: '1.5px solid #C0C0C0', borderRadius: '5px' }}
              />
            </div>
            <div className="flex justify-end my-5 md:my-0">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder="Filters"
                options={options}
                className="w-60"
                styles={customStyles}
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <h1 className="text-md lg:text-lg font-spline font-semibold mb-4">Job Listings</h1>

          <Modal isOpen={isDetailModalOpen} onRequestClose={closeDetailModal} style={{
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
          }}>
            {selectedJob && (
              <div className='w-80 sm:w-96'>
                <span className='text-xl text-gray-600 font-spline font-semibold py-2 '>Job Details</span>
                <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
                <div className='gap-2 py-5'>
                  <p><span className='text-lg text-gray-600 font-spline font-semibold'>Title:</span> {selectedJob.title}</p>
                  <p><span className='text-lg text-gray-600 font-spline font-semibold'>Description:</span> {selectedJob.description}</p>
                  <p><span className='text-lg text-gray-600 font-spline font-semibold'>Experience:</span> {selectedJob.experience}</p>
                  <p><span className='text-lg text-gray-600 font-spline font-semibold'>Status:</span> {selectedJob.status === 1 ? "Hiring" : "Closed"}</p>
                  <p><span className='text-lg text-gray-600 font-spline font-semibold'>Interview Start Date:</span> {selectedJob.start_date}</p>
                  <p><span className='text-lg text-gray-600 font-spline font-semibold'>Interview End Date </span>{selectedJob.end_date}</p>
                  <button onClick={closeDetailModal} className="bg-red-500 w-full mx-auto mt-5 text-white p-2 rounded">
                    Close
                  </button>
                </div>
              </div>
            )}
          </Modal>

          <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} style={{
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
          }}>
            <div className='w-80 sm:w-96'>
              <span className='text-xl text-gray-600 font-spline font-semibold py-2 '>Confirm Delete</span>
              <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
              <p className='font-sans text-gray-600 py-5'>Are you sure you want to delete this job?</p>
              <div className='flex flex-col sm:flex-row gap-3'>
                <button onClick={handleDelete} className="bg-red-500 w-full text-white p-2 rounded">
                  Delete
                </button>
                <button onClick={closeDeleteModal} className="bg-gray-500 w-full text-white p-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </Modal>

          <div>
          {filteredJobs.length === 0 && query && (
  <div className="text-center text-gray-500 mt-4">
    <div className='flex flex-col my-5 w-full justify-center items-center'>
      <img src={Search} alt="Search"  width={100}/>
      <span className='my-2'> No matches found.</span>
    </div>
    
   
  </div>
)}

            {currentItems.map((job) => (
              <div key={job.id} className="flex flex-col lg:flex-row gap-5 justify-between w-full max-md:flex-wrap mb-4 border p-4 rounded">
                <div className="flex lg:w-2/5 gap-3">
                  <div className="flex flex-col sm:px-5 my-auto">
                    <div className="text-lg leading-6 text-slate-800">{job.title}</div>
                    <div className="mt-1.5 text-sm font-light leading-5 text-neutral-500">{job.description}</div>
                  </div>
                </div>
                <div className="flex flex-row lg:w-2/5 gap-5 justify-between items-start sm:px-5 my-auto">
                  <div className="flex flex-col whitespace-nowrap">
                    <div className="text-sm font-light leading-5 text-neutral-500">Status</div>
                    <div className="mt-2.5 text-lg leading-6 text-red-500">{job.status === 1 ? "Hiring" : "Closed"}</div>
                  </div>
                  <div className="flex flex-col self-stretch">
                    <div className="text-sm font-light leading-5 text-neutral-500">Experience</div>
                    <div className="mt-2 text-lg leading-6 text-slate-800">{job.experience}</div>
                  </div>
                  <div className="flex flex-col whitespace-nowrap">
                    <div className="text-sm font-light leading-5 text-neutral-500">Interview</div>
                    <div className="mt-3 text-lg leading-6 text-slate-800">{randomNumberInterviews}</div>
                  </div>
                </div>
                <div className='flex lg:w-1/5 flex-col gap-2 justify-center items-center'>
                  <Popup
                    trigger={<button className="text-gray-500 hover:text-gray-600"><HiDotsHorizontal size={30} /></button>}
                    position="bottom center"
                    on="click"
                    closeOnDocumentClick
                    arrow={true}
                  >
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                        onClick={() => {
                          navigate('viewjobs', { state: { jobId: job.id } });
                        }}
                      >
                        <FaEye size={20} className="text-gray-600" />
                        <span className="ml-2">View</span>
                      </button>
                      <button
                        className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                        onClick={() => handleViewDetails(job)}
                      >
                        <TbListDetails  size={20} className="text-gray-600"/>
                        <span className="ml-2">Detail</span>
                      </button>
                      <button
                        className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                        onClick={() => handleDeleteClick(job)}
                      >
                        <RiDeleteBinFill size={20} className="text-gray-600" />
                        <span className="ml-2">Delete</span>
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
            maxWidth={400}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentJobs;
