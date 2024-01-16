import { useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { GetCookie, RemoveCookie, decodeJwt } from "../utils/cookies/SetCookie";
import UseNavigation from "../hooks/UseNavigation";
import LoadingCircle from "../components/LoadingCircle";

export default function HomePage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { navigateToUserLoggedInPage, navigateToCompanyLoggedInPage } = UseNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await GetCookie("authToken");

        if (!authToken.success) {
          handleInvalidToken();
          return;
        }

        const decodedJwt = await decodeJwt("authToken");

        if (!decodedJwt.success || decodedJwt.decoded === undefined || decodedJwt.decoded.exp === undefined || decodedJwt.decoded.roles === undefined) {
          handleInvalidToken();
          return;
        }

        const expireTimestamp = decodedJwt.decoded.exp;
        const expirationDateValue = new Date(expireTimestamp * 1000);
        const currentDate = new Date();

        if (expirationDateValue <= currentDate) {
          console.log("Token expired or not found");
          handleInvalidToken();
          return;
        }

        setUserRole(decodedJwt.decoded.roles);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInvalidToken = () => {
    RemoveCookie("authToken");
    setUserRole("NONE");

  };


  if(userRole === null)
  {
    return <LoadingCircle/>
  }

  return (
    <>
      {userRole === "USER" && navigateToUserLoggedInPage()}
      {userRole === "COMPANY" && navigateToCompanyLoggedInPage()}
      {userRole === "NONE" && <RootLayout />}
    </>
  );
}