import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../common/Notification/NotificationBar";
import UserImg from "../../assets/images/Setting/userImg.png";
import { IoSettingsOutline } from "react-icons/io5";
import Switch from "react-switch";
import { MdArrowOutward } from "react-icons/md";
const Setting: React.FC = () => {

  interface Settings {
    name: string;
    email: string;
    phone: string;
    password: string;
    specialisationCategory: string;
    location: string;
    notifications: boolean;
  }
  interface SettingsData {
    settings: Settings;
  }

  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <div className="container lg:w-5/6 mx-auto w-full h-full">
      <div>
        <NotificationBar />
      </div>
      <div className="flex gap-3 px-4 py-4">
        {" "}
        <span>
          <IoSettingsOutline size={20} color="#5E676B" />{" "}
        </span>{" "}
        <span className="text-md font-spline font-semibold">Settings</span>{" "}
      </div>
      <div className="flex  flex-col md:flex-row mt-10 ">
        <div className="flex md:w-1/6 justify-center align-top ">
          <img
            loading="lazy"
            src={UserImg}
            className="shrink-0 aspect-square  w-[150px] h-[150px] "
          />
        </div>
        <div className="flex flex-col md:w-5/6 ">
          <div className="flex flex-col sm:flex-row ">
            <div className="flex flex-col  px-5  py-5  justify-center   md:w-1/2">
              <div className="w-full text-base font-light leading-6 text-neutral-500">
                Name
              </div>
              <div className="mt-2 w-full text-sm sm:text-lg  leading-6 text-slate-800">
                Jane Cooper
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">
                Email Address
              </div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                jane.cooper0786@gmail.com
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">
                Phone
              </div>
              <div className="mt-2 w-full text-sm sm:text-lg  leading-6 text-slate-800">
                0 123 456 7890
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">
                Password
              </div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                XXXXXXXXXXXX
              </div>
              <div className="mt-2 text-base font-light leading-4 text-sky-500 ">
                Update Password
              </div>
            </div>
            <div className="flex flex-col px-5  py-5   md:w-1/2">
              <div className="w-full text-base font-light leading-6 text-neutral-500">
                Specialisation Category{" "}
              </div>
              <div className="mt-2 w-full text-sm sm:text-lg  leading-6 text-slate-800">
                IT Technology
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">
                Location
              </div>
              <div className="mt-2 w-full text-sm sm:text-lg  leading-6 text-slate-800">
                Australia{" "}
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">
                Notifications
              </div>
              <div className="mt-2">
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  checkedIcon={false}
                  uncheckedIcon={false}
                />
              </div>
            </div>
          </div>

          <button className="flex justify-center mx-4  my-10 max-md:mx-auto w-5/6 sm:w-2/3 sm: items-center self-stretch px-4 py-5 text-base text-white whitespace-nowrap bg-sky-500 rounded-md border border-sky-500 border-solid   max-md:px-5"  onClick={() => navigate("/dashboard/editsettings")}>
            <div className="flex gap-2.5">
              <span>Edit</span>
              <span>
                <MdArrowOutward size={20} />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
