import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../common/Notification/NotificationBar";
import { IoSettingsOutline } from "react-icons/io5";
import Switch from "react-switch";
import { MdArrowOutward } from "react-icons/md";
import Select, { SingleValue } from "react-select";
import { LuImagePlus } from "react-icons/lu";
// @ts-ignore
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const EditSetting: React.FC = () => {
  const navigate = useNavigate();
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: '4px',
      borderColor: 'rgb(163 163 163)'
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 4px',
    }),
  };
  const options: { value: string; label: string }[] = [
    { value: 'nodeJs', label: 'nodeJs' },
    { value: 'frontend', label: 'frontend' },
    { value: 'backend', label: 'backend' },
  ];
  const [selectedOption, setSelectedOption] = useState<SingleValue<{ value: string; label: string }>>(null);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    specialisationCategory: "",
    location: "",
    notifications: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, notifications: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      specialisationCategory: selectedOption ? selectedOption.value : "",
      location: countryid, // Assuming you want the country ID for location
    });
    navigate('/dashboard/settings'); 
  };

  return (
    <div className="container mx-auto">
      <div>
        <NotificationBar />
      </div>
      <div className="flex gap-3 px-4 py-4">
        <span>
          <IoSettingsOutline size={20} color="#5E676B" />
        </span>
        <span className="text-md font-spline font-semibold">Settings</span>
      </div>
      <form className="flex flex-col md:flex-row mt-10" onSubmit={handleSubmit}>
        <div className="flex  md:w-1/6 justify-center align-top">
        <div className="flex flex-col   ">
        <div className="flex  w-[150px] h-[150px] justify-center items-center bg-slate-200 rounded-full">
            <LuImagePlus size={40} color="#5E676B" />
            
          </div>
          <div className="mx-auto mt-3 font-spline text-blue-400 cursor-pointer">
            Edit
          </div>

        </div>
         
        </div>
        <div className="flex flex-col md:w-5/6">
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col px-5 pt-5 justify-center md:w-1/2">
              <div className="w-full text-base font-light leading-6 text-neutral-500">Name</div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="justify-center items-start p-3 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full md:w-2/3 pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none" />
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">Email Address</div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="justify-center items-start p-3 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full md:w-2/3 pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none" />
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">Phone</div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="justify-center items-start p-3 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full md:w-2/3 pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col px-5 pt-5 justify-center md:w-1/2">
              <div className="w-full text-base font-light leading-6 text-neutral-500">Specialisation Category</div>
              <div className="mt-3 w-full text-sm sm:text-lg leading-6 text-slate-800">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Select Category"
                  options={options}
                  className="w-full md:w-2/3"
                  styles={customStyles}
                />
              </div>
              <div className="mt-5 sm:mt-10 mb-3 w-full text-base font-light leading-6 text-neutral-500">Location</div>
              <div className="mt-2 w-full md:w-2/3 text-sm sm:text-lg leading-6 text-slate-800">
                <CountrySelect
                  onChange={(e: any) => {
                    setCountryid(e.id);
                  }}
                  placeHolder="Select Country"
                />
              </div>
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">Notifications</div>
              <div className="mt-2 pt-2 items-baseline">
                <Switch onChange={handleSwitchChange} checked={formData.notifications} checkedIcon={false} uncheckedIcon={false} />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-5 gap-3 sm:flex-row">
            <div className="flex flex-col md:w-1/2">
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">Old Password</div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} className="justify-center items-start p-3 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full sm:w-4/5 md:w-2/3 pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col md:w-1/2">
              <div className="mt-5 sm:mt-10 w-full text-base font-light leading-6 text-neutral-500">New Password</div>
              <div className="mt-2 w-full text-sm sm:text-lg leading-6 text-slate-800">
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="justify-center items-start p-3 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full sm:w-4/5 md:w-2/3 pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none" />
              </div>
            </div>
          </div>
          <button type="submit" className="flex justify-center sm:mx-4 my-10 max-md:mx-auto w-5/6 sm:w-2/3 items-center self-stretch px-4 py-5 text-base text-white whitespace-nowrap bg-sky-500 rounded-md border border-sky-500 border-solid max-md:px-5">
            <div className="flex gap-2.5">
              <span>Update</span>
              <MdArrowOutward size={20} />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSetting;
``


