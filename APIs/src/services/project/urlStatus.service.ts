import axios from "axios";
export async function checkUrlStatus(url: string): Promise<string> {
    try {
      const response = await axios.head(url);
      return response.status >= 200 && response.status < 400
        ? "online"
        : "offline";
    } catch (error) {
      console.error(`Error checking URL status for ${url}:`, error);
      return "offline";
    }
  }