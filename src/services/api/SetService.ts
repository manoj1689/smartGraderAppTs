import axiosInstance from "../axios/axiosInstance";
import { getToken } from "../../utils/tokenUtils";
import { API_BASE_URL } from "../../constants/Constants";
import { SetData, Card, updatedSetData } from "../../types/interfaces/interface";

type setId = any;

export const handleSetSubmit = async (
  newSet: SetData,
  navigate: (path: string, setId: any) => void,
  toast: { error: (msg: string) => void }
) => {
  const token = getToken();

  // Log selectedSets before making the POST request
  console.log("Selected sets before POST:", newSet.sub_category_id);
 const subCatId=newSet.sub_category_id
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/sets/add`,
      newSet,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    console.log("Response from API:", response.data.set_id); // Log response from API
    if (response.data.status === 1 && response.data.msg === "success") {
      const setId = response.data.set_id;
      console.log("Set ID from response:", setId); // Log set_id from the response
      console.log("Proceeding with selected sets:", newSet);

      // Navigate to the dashboard and pass the setId in state
      navigate("/dashboard/generatequestion", { state: { setId,subCatId } });

      return response.data.set_id;
    } else {
      toast.error("Failed to save selected sets.");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    toast.error("An error occurred while submitting your selection.");
  }
};

export const fetchMySets = async (subCategoryId: number): Promise<Card[]> => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(
      `/sets/my?sub_category_id=${subCategoryId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching my sets:", error);
    return [];
  }
};

export const editMySet = async (
  editSetData: updatedSetData,
  navigate: (path: string) => void,
  toast: { error: (msg: string) => void }
) => {
  const token = getToken();

  // Log editSetData before making the POST request
  console.log("Edit set data before POST:", editSetData);

  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/sets/edit`,
      editSetData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    console.log("Response from API:", response.data.set_id); // Log response from API
    if (response.data.status === 1 && response.data.msg === "success") {
      const setId = response.data.set_id;
      console.log("Set ID from response:", setId); // Log set_id from the response
      console.log("Proceeding with edited sets:", editSetData);

      // Navigate to the dashboard and pass the setId in state
      navigate("/dashboard");

      return;
    } else {
      toast.error("Failed to edit the set.");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    toast.error("An error occurred while editing your set.");
  }
};

// New function to fetch set details
export const fetchSetDetail = async (setId: number): Promise<Card[] | null> => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(
      `/sets/detail?set_id=${setId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log("the response at the service page of fetchDetails",response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching set detail:", error);
    return null;
  }
};

