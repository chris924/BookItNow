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
        navigate('/user/home')
    }


    return{
        navigateToMainPage,
        navigateToUserLoggedInPage
    }

    

}