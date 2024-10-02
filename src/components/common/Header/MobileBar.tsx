import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { FaLaptopMedical } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsQuestionCircle } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import serviceLogout from '../../../services/api/LogoutService';
import { TfiHelpAlt } from 'react-icons/tfi'; 
import smartGrader from "../../../assets/logos/smartGrader.png"
import { ImMenu } from "react-icons/im";

const MobileBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    serviceLogout();
    window.location.href = "https://smartgrader.in/";
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="w-full">
      <div className="flex flex-row w-full  fixed z-50 items-center justify-between px-4 py-5 border-b bg-white border-gray-200" >
        <div className='flex items-center gap-4 '>
          <ImMenu
            size={30}
            color={`${isSidebarOpen ? '#01AFF4' : '#5E676B'}`}
            onClick={toggleSidebar}
          />
          <img src={smartGrader} alt="smart Grader" className='w-24 '/>
        </div>
        <div>
          <FaBell className="w-6 h-8" color="#5E676B" />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="flex fixed z-50 flex-col mt-[72px] w-56  flex-grow shadow-md bg-white "
          style={{ height: 'calc(100vh - 72px)', scrollBehavior: 'smooth' }}
        >
          <div className="flex flex-col w-full p-2 pb-16 flex-grow overflow-y-auto">
        <div className="flex flex-col flex-grow space-y-8">
          {/* Dashboard */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Dashboard'
                ? 'bg-sky-700 text-white shadow-md hover:bg-sky-900'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={() => {
              handleItemClick('Dashboard');
              navigate('/dashboard');
            }}
          >
            <MdOutlineDashboardCustomize
              className={`w-6 h-6 ${activeItem === 'Dashboard' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Dashboard</span>
          </div>
          {/* Mock Interviews */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Mock Interviews'
                ? 'bg-sky-700 text-white shadow-md hover:bg-sky-900'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={() => {
              handleItemClick('Mock Interviews');
              navigate('mockinterview');
            }}
          >
            <FaLaptopMedical
              className={`w-6 h-6 ${activeItem === 'Mock Interviews' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Mock Interviews</span>
          </div>
          {/* Progress Tracker */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Progress Tracker'
                ? 'bg-sky-700 text-white shadow-md hover:bg-sky-900'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={() => {
              handleItemClick('Progress Tracker');
              navigate('progresstracker');
            }}
          >
            <GiProgression
              className={`w-6 h-6 ${activeItem === 'Progress Tracker' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Progress Tracker</span>
          </div>
          {/* Quick Access */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Quick Access'
                ? 'bg-sky-700 text-white shadow-md hover:bg-sky-900'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={() => {
              handleItemClick('Quick Access');
              navigate('result');
            }}
          >
            <BsGraphUpArrow
              className={`w-6 h-6 ${activeItem === 'Quick Access' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Quick Access</span>
          </div>
          {/* Settings */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Settings'
                ? 'bg-sky-700 text-white shadow-md hover:bg-sky-900'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={() => {
              handleItemClick('Settings');
              navigate('settings');
            }}
          >
            <IoSettingsOutline
              className={`w-6 h-6 ${activeItem === 'Settings' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Settings</span>
          </div>
        </div>
        <div className="w-full border-t border-gray-400 my-4"></div>
        <div className="flex flex-col space-y-4 mb-4">
          {/* Help & Support */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Help & Support'
                ? 'bg-sky-800 text-white shadow-md hover:bg-sky-800'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={() => {
              handleItemClick('Help & Support');
              navigate('help&support');
            }}
          >
            <TfiHelpAlt
              className={`w-6 h-6 ${activeItem === 'Help & Support' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Help & Support</span>
          </div>
          {/* Logout */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer rounded  transition-all duration-300 ${
              activeItem === 'Logout'
                ? 'bg-sky-800 text-white shadow-md hover:bg-sky-800'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={handleLogoutClick}
          >
            <AiOutlineLogout
              className={`w-6 h-6 ${activeItem === 'Logout' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4 ">Logout</span>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}

export default MobileBar;
