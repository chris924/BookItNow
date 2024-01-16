import { useNavigate } from "react-router-dom";

export default function UseNavigation()
{
    const navigate = useNavigate();

    function navigateToMainPage()
    {
        navigate('/');
        return <div>Redirecting to the main page...</div>;
    }

    function navigateToUserLoggedInPage()
    {
        navigate('/user/home');
    }

    function navigateToUserLoginPage()
    {
        navigate('/user/login');
    }

    function navigateToUserRegisterPage()
    {
        navigate('/user/register');
    }

    function navigateToCompanyLoginPage()
    {
        navigate('/company/login');
    }

    function navigateToCompanyLoggedInPage()
    {
        navigate('/company/home')
    }

    function navigateToCompanyRegisterPage()
    {
        navigate('/company/register')
    }

    function navigateToFAQPage()
    {
        navigate('/faq')
    }

    


    return{
        navigateToMainPage,
        navigateToUserLoggedInPage,
        navigateToUserLoginPage,
        navigateToUserRegisterPage,
        navigateToCompanyLoginPage,
        navigateToCompanyLoggedInPage,
        navigateToCompanyRegisterPage,
        navigateToFAQPage
    }

    

}