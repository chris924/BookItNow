import { useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { GetCookie, RemoveCookie, decodeJwt } from "../utils/cookies/SetCookie";
import UseNavigation from "../hooks/UseNavigation";

export default function HomePage() {
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined);
  const { navigateToMainPage, navigateToUserLoggedInPage } = UseNavigation();
  const [validAuthToken, setValidAuthToken] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await GetCookie("authToken");

        if (!authToken.success) {
          console.log("No auth token");
          setValidAuthToken(false);
          return;
        }

        const decodedJwt = await decodeJwt("authToken");
        if (!decodedJwt.success || !decodedJwt.decoded) {
          console.log("Invalid decodedJwt");
          setValidAuthToken(false);
          return;
        }

        const expTimestamp = decodedJwt.decoded.exp;
        if (expTimestamp === undefined) {
          console.log("Invalid expTimestamp");
          setValidAuthToken(false);
          return;
        }

        const expirationDateValue = new Date(expTimestamp * 1000);
        setExpirationDate(expirationDateValue);

        const currentDate = new Date();

        if (expirationDateValue > currentDate) {
          setValidAuthToken(true);
        } else {
          console.log("Token expired or not found");
          RemoveCookie("authToken");
          setValidAuthToken(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <>{validAuthToken ? navigateToUserLoggedInPage() : <RootLayout />}</>;
};