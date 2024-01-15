import UseNavigation from "../hooks/UseNavigation";
import UserRegisterForm from "../features/userAuth/UserRegisterForm";
import UserRegisterFetch from "../services/user/UserRegisterFetch";
import { useState } from "react";


export default function userRegisterPage(): JSX.Element
{
        const { navigateToMainPage } = UseNavigation();

        const { navigateToLoginPage } = UseNavigation();

        const [registerResult, setRegisterResult] = useState(false);

        const handleRegister = async (name: string, username: string, email: string, password: string) =>
        {

        
            const result = await UserRegisterFetch(name, username, email, password);

            if (result.success === true) {
                setTimeout(() => {
                  navigateToLoginPage();
                }, 3000);
          
                setRegisterResult(true);
              } else {
                
                  setRegisterResult(false);
              }
        }

        return(
            <UserRegisterForm onBackButtonClick={navigateToMainPage} onRegisterClick={handleRegister} registerResult={registerResult}/>
        )
}