import { useEffect, useState } from "react";
import UserLoginForm from "../features/userAuth/UserLoginForm";
import UseNavigation from "../hooks/UseNavigation";
import UserLoginFetch from "../services/user/UserLoginFetch";
import { GetCookie, SetCookie } from "../utils/cookies/SetCookie";
import CompanyLoginForm from "../features/companyAuth/CompanyLoginForm";
import CompanyLoginFetch from "../services/company/CompanyLoginFetch";
import { useCheckCookie } from "../hooks/UseEffect";


export default function CompanyLoginPage(): JSX.Element
{
   const { navigateToMainPage, navigateToCompanyLoggedInPage } = UseNavigation();
   

   const [showBadCredentials, setShowBadCredentials] = useState(false);

    const handleLogin = async (email: string, password: string) =>{

        const result = await CompanyLoginFetch(email, password);

        const token = result.jwt;   

        if (result.success === true && token !== undefined) {
            console.log("Company logged in successfully!");
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