import UserLoginForm from "../features/userAuth/UserLoginForm";
import UseNavigation from "../hooks/UseNavigation";

export default function UserLoginPage(): JSX.Element
{
   const { navigateToMainPage } = UseNavigation();

    return(
        <UserLoginForm onBackButtonClick={navigateToMainPage}/>
    )
}