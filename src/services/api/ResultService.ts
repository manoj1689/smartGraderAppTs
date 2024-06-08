// services/resultService.ts

import axios from "axios";
import { RESULT_BASE_URL } from "../../constants/Constants";
 const fetchResultData = async () => {
  try {
    const response = await axios.get(RESULT_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the user data!", error);
    throw error;
  }
};

export default fetchResultData;