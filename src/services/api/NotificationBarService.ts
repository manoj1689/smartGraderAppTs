// handleNotification.ts
import { API_BASE_URL } from "../../constants/Constants";
export const fetchUserData = async (accessToken: string): Promise<{ name: string, is_verified: number } | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me?jwt=${accessToken}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  