import UseNavigation from "../hooks/UseNavigation";
import { useState } from "react";
import { useCheckCookie } from "../hooks/UseEffect";
import CompanyRegisterFetch from "../services/company/CompanyRegisterFetch";
import CompanyRegisterForm from "../features/company/CompanyRegisterForm";


export default function CompanyRegisterPage(): JSX.Element
{
        const { navigateToMainPage } = UseNavigation();

        const { navigateToCompanyLoginPage } = UseNavigation();

        const [registerResult, setRegisterResult] = useState(false);

        const handleRegister = async (companyName: string, email: string, password: string, appServiceName:string, appServiceDescription:string, description: string) =>
        {

            const result = await CompanyRegisterFetch(companyName, email, password, appServiceName, appServiceDescription, description);

            if (result.success === true) {
                setTimeout(() => {
                  navigateToCompanyLoginPage();
                }, 3000);
          
                setRegisterResult(true);
              } else {
                
                  setRegisterResult(false);
              }
        }

        useCheckCookie(navigateToMainPage);

        return(
            <CompanyRegisterForm onBackButtonClick={navigateToMainPage} onRegisterClick={handleRegister} registerResult={registerResult}/>
        )
}