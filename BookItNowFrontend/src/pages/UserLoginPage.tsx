import { useState } from "react";
import BadCredentials from "../components/BadCredentials";
import UserLoginForm from "../features/userAuth/UserLoginForm";
import UseNavigation from "../hooks/UseNavigation";
import UserLoginFetch from "../services/userAuth/UserLoginFetch";
import SetCookie from "../utils/cookies/SetCookie";

export default function UserLoginPage(): JSX.Element
{
   const { navigateToMainPage } = UseNavigation();
   const {navigateToUserLoggedInPage} = UseNavigation();

   const [showBadCredentials, setShowBadCredentials] = useState(false);

    const handleLogin = async (email: string, password: string) =>{

        const result = await UserLoginFetch(email, password);

        const token = result.jwt;

        if (result.success === true && token !== undefined) {
            console.log("User logged in successfully!");
            SetCookie("authToken", token, 1);
            navigateToUserLoggedInPage();
        } else {
           setShowBadCredentials(true);
           setTimeout(() => {
            setShowBadCredentials(false);
           }, 5000);
           
        }
    }


    return (
        <>
          <UserLoginForm
            onBackButtonClick={navigateToMainPage}
            onLoginClick={handleLogin}
            onWrongCredentials={showBadCredentials}

          />
        </>
      );
}