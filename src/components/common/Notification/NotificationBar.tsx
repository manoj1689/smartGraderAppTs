import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa";
import { fetchUserData } from '../../../services/api/NotificationBarService';
import { getToken } from '../../../utils/tokenUtils';
const NotificationBar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      fetchUserData(accessToken).then((data) => {
        if (data && data.is_verified === 1) {
          setUsername(data.name);
          //console.log(data)
        }
      });
    } else {
      console.error("Access token not found in local storage");
    }
  }, []);

  return (
    <div className="max-sm:pt-16 max-lg:pt-20">
      <div className="flex  px-2 my-4 sm:mb-8 justify-between">
        <div className="flex flex-col lg:flex-row  lg:gap-4 px-4">
          <div className="flex gap-2 text-sky-500">
            <span className="block text-base font-spline  md:text-xl lg:text-2xl xl:text-3xl">
              Hello!
            </span>
            {"  "}
            <span className="block text-base font-spline md:text-xl lg:text-2xl xl:text-3xl  ">
              {username}
            </span>
          </div>
          <div className="flex-auto my-auto text-sm font-spline sm:text-base md:text-lg font-light text-neutral-500">
            Here's the current status for today!
          </div>
        </div>

        <div className="max-lg:hidden mr-10">
          <FaBell size={30} color="#01AFF4" />
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
