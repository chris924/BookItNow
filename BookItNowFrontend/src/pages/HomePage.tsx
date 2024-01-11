
import { useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import SetCookie, { GetCookie, RemoveCookie } from "../utils/cookies/SetCookie";
import UseNavigation from "../hooks/UseNavigation";
import { useNavigation } from "react-router-dom";

export default function HomePage() {
    const [authTokenCookie, setAuthTokenCookie] = useState("");
    const { navigateToUserLoggedInPage } = UseNavigation();
  
    useEffect(() => {
      const authToken = GetCookie("authToken");
  
      if (authToken) {
        const expirationDate = parseCookieExpiration(authToken);
        const currentDate = new Date();
  
        if (expirationDate && expirationDate > currentDate) {
          // Token is not expired
          setAuthTokenCookie(authToken);
          navigateToUserLoggedInPage();
        } else {
          RemoveCookie("authToken");
          setAuthTokenCookie("");
        }
      }
    }, [navigateToUserLoggedInPage]);
  
    const parseCookieExpiration = (cookie: string) => {
      const matches = /expires=([^;]+)/.exec(cookie);
      if (matches && matches[1]) {
        return new Date(matches[1]);
      }
      return null;
    };
  
    return <>{!authTokenCookie && <RootLayout />}</>;
  }