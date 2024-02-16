import { useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import { SetCookie } from "../utils/cookies/SetCookie";
import CompanyLoginForm from "../features/company/CompanyLoginForm";
import CompanyLoginFetch from "../services/company/CompanyLoginFetch";
import { useCheckCookie } from "../hooks/UseEffect";


export default function CompanyLoginPage(): JSX.Element
{
   const { navigateToMainPage, navigateToCompanyLoggedInPage } = UseNavigation();
   

   const [showBadCredentials, setShowBadCredentials] = useState(false);

    const handleLogin = async (email: string, password: string) =>{

        const result = await CompanyLoginFetch(email, password);

      console.log("RESULT:", result);


        const token = result.jwt;   

        if (result.success === true && token !== undefined) {
            console.log("Company logged in successfully!");
            console.log("TOKEN:", token);
            SetCookie("authToken", token);
            navigateToCompanyLoggedInPage();
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
          <CompanyLoginForm
            onBackButtonClick={navigateToMainPage}
            onLoginClick={handleLogin}
            onWrongCredentials={showBadCredentials}

          />
        </>
      );
}