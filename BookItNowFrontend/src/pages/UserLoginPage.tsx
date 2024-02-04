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


   const [loading, setLoading] = useState(false);
   const [showBadCredentials, setShowBadCredentials] = useState(false);

    const handleLogin = async (email: string, password: string) =>{

      setLoading(true);

        const result = await UserLoginFetch(email, password);

        const token = result.jwt;

        if (result.success === true && token !== undefined) {
            console.log("User logged in successfully!");
            SetCookie("authToken", token);
            setLoading(false);
            navigateToUserLoggedInPage();
        } else {
          setLoading(false);
           setShowBadCredentials(true);
           setTimeout(() => {
            setShowBadCredentials(false);
           }, 5000);
           
        }
    }

    useCheckCookie(navigateToMainPage);

    if (loading) {
      return <LoadingCircle/>;
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