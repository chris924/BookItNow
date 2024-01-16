import UseNavigation from "../hooks/UseNavigation";
import UserRegisterForm from "../features/user/UserRegisterForm";
import UserRegisterFetch from "../services/user/UserRegisterFetch";
import { useState } from "react";
import { useCheckCookie } from "../hooks/UseEffect";


export default function userRegisterPage(): JSX.Element
{
        const { navigateToMainPage } = UseNavigation();

        const { navigateToUserLoginPage } = UseNavigation();

        const [registerResult, setRegisterResult] = useState(false);

        const handleRegister = async (name: string, username: string, email: string, password: string) =>
        {

        
            const result = await UserRegisterFetch(name, username, email, password);

            if (result.success === true) {
                setTimeout(() => {
                  navigateToUserLoginPage();
                }, 3000);
          
                setRegisterResult(true);
              } else {
                
                  setRegisterResult(false);
              }
        }

        useCheckCookie(navigateToMainPage);

        return(
            <UserRegisterForm onBackButtonClick={navigateToMainPage} onRegisterClick={handleRegister} registerResult={registerResult}/>
        )
}