import React, { useState } from 'react';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { FaLaptopMedical } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { TfiHelpAlt } from 'react-icons/tfi';
import { GiHamburgerMenu } from 'react-icons/gi';
import serviceLogout from '../../../services/api/LogoutService';
import { useNavigate } from 'react-router-dom';
import SmartGrader from '../../../assets/logos/smartGrader.png';

function SideBar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleLogoutClick = () => {
    serviceLogout();
    window.location.href = 'https://smart-grader-landing-web.vercel.app/';
  };

  return (
    <div className="flex flex-col shadow-md bg-sky-100 px-2 xl:px-4 py-4 border border-solid  border-black border-opacity-10 h-full fixed lg:w-64">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <img src={SmartGrader} alt="Smart Grader" width={140} />
      </div>
      <div className="flex flex-col flex-grow overflow-auto">
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

        <div className="flex flex-col items-center justify-center mt-64 md:mt-40 mb-6">
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
  );
}

export default SideBar;
