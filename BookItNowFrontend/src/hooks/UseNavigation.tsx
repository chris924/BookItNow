import { useNavigate } from "react-router-dom";

export default function UseNavigation()
{
    const navigate = useNavigate();

    function navigateToMainPage()
    {
        navigate('/');
    }

    function navigateToUserLoggedInPage()
    {
        navigate('/user/home');
    }

    function navigateToLoginPage()
    {
        navigate('/user/login');
    }

    function navigateToRegisterPage()
    {
        navigate('/user/register');
    }


    return{
        navigateToMainPage,
        navigateToUserLoggedInPage,
        navigateToLoginPage,
        navigateToRegisterPage,
    }

    

}