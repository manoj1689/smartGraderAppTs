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
          console.log(data)
        }
      });
    } else {
      console.error("Access token not found in local storage");
    }
  }, []);

  return (
    <div>
      <div className="flex gap-5 my-16 mb-10 justify-between">
        <div className="flex flex-col lg:flex-row gap-5 px-5">
          <div className="flex text-gray-500">
            <span className="block text-base font-spline md:text-xl lg:text-2xl xl:text-3xl">
              Hello!
            </span>
            {"  "}
            <span className="block text-base font-spline md:text-xl lg:text-2xl xl:text-3xl pl-1 md:pl-3 text-sky-500">
              {username}
            </span>
          </div>
          <div className="flex-auto my-auto text-sm font-spline sm:text-base md:text-lg font-light leading-4 text-neutral-600">
            Here's the current status for today!
          </div>
        </div>

        <div className="max-lg:hidden">
          <FaBell size={30} color="#01AFF4" />
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
