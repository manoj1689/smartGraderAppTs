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
import { GiHamburgerMenu } from 'react-icons/gi';
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
    window.location.href = "https://smart-grader-landing-web.vercel.app/";
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
    <div className="w-full h-full">
      <div className="flex flex-row w-full fixed z-50 items-center justify-between px-4 py-5 border-b bg-sky-100 border-gray-200">
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
          className="flex fixed z-50 flex-col mt-[72px] w-56 flex-grow shadow-md bg-sky-100 overflow-y-auto h-full"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex flex-col flex-grow">
        <div className="flex flex-col items-center justify-center mt-4 space-y-4">
          {/* Menu items */}
          {/* Dashboard */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Dashboard' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={() => {
              handleItemClick('Dashboard');
              navigate('/dashboard');
            }}
          > 
            <MdOutlineDashboardCustomize className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem === 'Dashboard' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Dashboard</span>
          </div>
          {/* Mock Interviews */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Mock Interviews' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={() => {
              handleItemClick('Mock Interviews');
              navigate('mockinterview');
            }}
          >
            <FaLaptopMedical className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem === 'Mock Interviews' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Mock Interviews</span>
          </div>
          {/* Progress Tracker */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Progress Tracker' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={() => {
              handleItemClick('Progress Tracker');
              navigate('progresstracker');
            }}
          >
            <GiProgression className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem === 'Progress Tracker' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Progress Tracker</span>
          </div>
          {/* Quick Access */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Quick Access' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={() => {
              handleItemClick('Quick Access');
              navigate('result');
            }}
          >
            <BsGraphUpArrow className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem === 'Quick Access' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Quick Access</span>
          </div>
          {/* Settings */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Settings' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={() => {
              handleItemClick('Settings');
              navigate('settings');
            }}
          >
            <IoSettingsOutline className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem === 'Settings' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Settings</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-40  md:mt-40 mb-20">
          {/* Help & Support */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Help & Support' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={() => {
              handleItemClick('Help & Support');
              navigate('help&support');
            }}
          >
            <TfiHelpAlt className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem === 'Help & Support' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Help & Support</span>
          </div>
          {/* Logout */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
              activeItem === 'Logout' ? 'text-[#0190C3]' : 'text-neutral-500'
            }`}
            onClick={handleLogoutClick}
          >
            <AiOutlineLogout className="w-6 h-6" />
            <span className={`ml-4 ${
              activeItem ===  'Logout' ? 'text-slate-800' : 'text-neutral-500'
            }`}>Logout</span>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}

export default MobileBar;
