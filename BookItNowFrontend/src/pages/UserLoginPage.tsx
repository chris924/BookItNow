import { useState } from "react";
import UserLoginForm from "../features/user/UserLoginForm";
import UseNavigation from "../hooks/UseNavigation";
import UserLoginFetch from "../services/user/UserLoginFetch";
import { SetCookie } from "../utils/cookies/SetCookie";
import { useCheckCookie } from "../hooks/UseEffect";
import LoadingCircle from "../components/LoadingCircle";

export default function UserLoginPage(): JSX.Element
{
   const { navigateToMainPage } = UseNavigation();
   
   const {navigateToUserLoggedInPage} = UseNavigation();



   const [showBadCredentials, setShowBadCredentials] = useState(false);

    const handleLogin = async (email: string, password: string) =>{

  

        const result = await UserLoginFetch(email, password);

      console.log("RESULT:", result);

        const token = result.jwt;

        if (result.success === true && token !== undefined) {
            console.log("User logged in successfully!");
            SetCookie("authToken", token);
          
            navigateToUserLoggedInPage();
        } else {
      
           setShowBadCredentials(true);
           setTimeout(() => {
            setShowBadCredentials(false);
           }, 5000);
           
        }
    }

    useCheckCookie(navigateToMainPage);



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