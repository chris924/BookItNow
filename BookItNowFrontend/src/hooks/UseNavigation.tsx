import { useNavigate } from "react-router-dom";

export default function UseNavigation()
{
    const navigate = useNavigate();

    function navigateToMainPage()
    {
        navigate('/');
    }

    return{
        navigateToMainPage
    }

    

}