import React, { useState } from 'react';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { FaLaptopMedical } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { TfiHelpAlt } from 'react-icons/tfi';
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
    window.location.href = 'https://smart-grader-landing-last.vercel.app/';
  };

  return (
    <div className="flex flex-col shadow-lg bg-sky-100 px-4 py-6 border-r border-gray-200 h-full fixed lg:w-56 xl:w-64">
      <div className="flex flex-col items-center mb-4">
        <img src={SmartGrader} alt="Smart Grader" className="w-36 mb-8" />
        <div className="w-full border-b border-gray-300 mb-4"></div>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <div className="flex flex-col flex-grow space-y-8">
          {/* Dashboard */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
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
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
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
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
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
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
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
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
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
        <div className="w-full border-t border-gray-300 my-4"></div>
        <div className="flex flex-col space-y-4 mb-4">
          {/* Help & Support */}
          <div
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
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
            className={`flex items-center w-full p-4 text-base cursor-pointer transition-all duration-300 ${
              activeItem === 'Logout'
                ? 'bg-sky-800 text-white shadow-md hover:bg-sky-800'
                : 'text-gray-700 hover:bg-sky-200 hover:text-sky-600 shadow-md hover:shadow-lg'
            }`}
            onClick={handleLogoutClick}
          >
            <AiOutlineLogout
              className={`w-6 h-6 ${activeItem === 'Logout' ? 'text-white' : 'text-gray-700'}`}
            />
            <span className="ml-4">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
