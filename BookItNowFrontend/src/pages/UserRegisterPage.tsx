import UseNavigation from "../hooks/UseNavigation";
import UserRegisterForm from "../features/userAuth/UserRegisterForm";


export default function userRegisterPage(): JSX.Element
{
        const { navigateToMainPage } = UseNavigation();

        return(
            <UserRegisterForm onBackButtonClick={navigateToMainPage}/>
        )
}