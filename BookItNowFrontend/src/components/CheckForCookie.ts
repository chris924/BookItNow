import { useEffect, useState } from "react";
import { GetCookie } from "../utils/cookies/SetCookie";
import UseNavigation from "../hooks/UseNavigation";

function CheckForCookie() {
  const { navigateToMainPage } = UseNavigation();
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
  }, []); // Make sure to add any dependencies for useEffect

  return foundCookie;
}

export default CheckForCookie;
      
    
   





