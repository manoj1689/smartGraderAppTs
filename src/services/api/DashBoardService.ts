import { useState, useEffect } from 'react';
import { API_BASE_URL ,INDIVIDAUL_USER_TYPE,ORGANIZATION_USER_TYPE,EDUCATIONAL_USER_TYPE} from "../../constants/constants";
import { getToken } from '../../utils/tokenUtils';
// Define a custom hook


export const DashboardService = () => {
  const [dashboardKey, setDashboardKey] = useState<string | null>(null);
  const [individualData, setIndividualData] = useState<any>(null);
  const [organizationData, setOrganizationData] = useState<any>(null);
  const [educationalData, setEducationalData] = useState<any>(null);

  useEffect(() => {
    // Retrieve access token from local storage
    const accessToken = getToken();

    // Make sure accessToken is not null or undefined
    if (accessToken) {
      // Fetch user data using access token
      fetch(`${API_BASE_URL}/users/me?jwt=` + accessToken, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user_type === INDIVIDAUL_USER_TYPE) {
            setIndividualData(data);
          } else if (data.user_type ===ORGANIZATION_USER_TYPE ) {
            setOrganizationData(data);
          } else if (data.user_type === EDUCATIONAL_USER_TYPE) {
            setEducationalData(data);
          }
          setDashboardKey(data.user_type);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("Access token not found in local storage");
    }
  }, []);

  return { dashboardKey, individualData, organizationData, educationalData };
};
