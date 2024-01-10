import UserLoginAuth from "../features/userAuth/UserLoginAuth";
import UserLoginForm from "../features/userAuth/UserLoginForm";
import UseNavigation from "../hooks/UseNavigation";

export default function UserLoginPage(): JSX.Element
{
   const { navigateToMainPage } = UseNavigation();
   const {navigateToUserLoggedInPage} = UseNavigation();

    const handleLogin = async (email: string, password: string) =>{

        const result = await UserLoginAuth(email, password);

        if (result) {
            console.log("User logged in successfully!");
           
           navigateToUserLoggedInPage();
        } else {
           return(

            <h2>Bad Credentials!</h2>
            
           )
           
        }
    }



    return(
        <UserLoginForm onBackButtonClick={navigateToMainPage} onLoginClick={handleLogin}/>
    )
}