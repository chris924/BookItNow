import { useEffect, useState } from "react";
import { GetCookie } from "../utils/cookies/SetCookie";


function CheckForCookie() {

  const [foundCookie, setFoundCookie] = useState(false);

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const cookie = await GetCookie("authToken");

        if (cookie && cookie.success === true) {
          console.log("FOUND COOKIE, REDIRECTING TO MAIN PAGE");
          setFoundCookie(true);
        }
      } catch (error) {
        console.error("Error checking for cookie:", error);
      }
    };

    checkCookie();
  }, []); 

  return foundCookie;
}

export default CheckForCookie;
      
    
   





