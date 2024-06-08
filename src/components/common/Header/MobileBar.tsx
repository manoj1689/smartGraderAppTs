import React, { useState } from 'react';
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

const MobileBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    serviceLogout();
    navigate('/SignIn');
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full fixed z-50 items-center justify-between px-4 py-3 border-b bg-sky-100 border-gray-200">
        <div>
          <GiHamburgerMenu
            className="w-6 h-6"
            color={`${isSidebarOpen ? '#01AFF4' : '#5E676B'}`}
            onClick={toggleSidebar}
          />
        </div>
        <div>
          <FaBell className="w-6 h-6" color="#5E676B" />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="flex fixed z-50 flex-col mt-12 flex-grow shadow-md bg-sky-100 overflow-y-auto h-full"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex flex-col items-center justify-center mt-6 space-y-4">
            {/* Menu items */}
            <div
              className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
                activeItem === 'Dashboard' ? 'text-[#0190C3]' : 'text-neutral-500'
              }`}
              onClick={() => handleItemClick('Dashboard')}
            >
              <MdOutlineDashboardCustomize className="w-6 h-6" />
              <span className="ml-4">Dashboard</span>
            </div>
            <div
              className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
                activeItem === 'Mock Interviews' ? 'text-[#0190C3]' : 'text-neutral-500'
              }`}
              onClick={() => handleItemClick('Mock Interviews')}
            >
              <FaLaptopMedical className="w-6 h-6" />
              <span className="ml-4">Mock Interviews</span>
            </div>
            <div
              className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
                activeItem === 'Progress Tracker' ? 'text-[#0190C3]' : 'text-neutral-500'
              }`}
              onClick={() => handleItemClick('Progress Tracker')}
            >
              <GiProgression className="w-6 h-6" />
              <span className="ml-4">Progress Tracker</span>
            </div>
            <div
              className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
                activeItem === 'Quick Access' ? 'text-[#0190C3]' : 'text-neutral-500'
              }`}
              onClick={() => handleItemClick('Quick Access')}
            >
              <BsGraphUpArrow className="w-6 h-6" />
              <span className="ml-4">Quick Access</span>
            </div>
            <div
              className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
                activeItem === 'Settings' ? 'text-[#0190C3]' : 'text-neutral-500'
              }`}
              onClick={() => handleItemClick('Settings')}
            >
              <IoSettingsOutline className="w-6 h-6" />
              <span className="ml-4">Settings</span>
            </div>
            <div
              className={`flex items-center w-full p-4 text-base cursor-pointer transition duration-300 ${
                activeItem === 'Help & Support' ? 'text-[#0190C3]' : 'text-neutral-500'
              }`}
              onClick={() => handleItemClick('Help & Support')}
            >
              <BsQuestionCircle className="w-6 h-6" />
              <span className="ml-4">Help & Support</span>
            </div>
          </div>
          {/* Logout */}
          <div className="flex items-center justify-center mt-60 md:mt-40 mb-20">
            <div
              className="flex items-center w-full p-4 text-base cursor-pointer transition duration-300 text-neutral-500"
              onClick={handleLogoutClick}
            >
              <AiOutlineLogout className="w-6 h-6" />
              <span className="ml-4">Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileBar;

