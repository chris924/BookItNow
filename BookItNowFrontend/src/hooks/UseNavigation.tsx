import { useNavigate } from "react-router-dom";

export default function UseNavigation()
{
    const navigate = useNavigate();

    function navigateToMainPage()
    {
        navigate('/');
        return <div>Redirecting to the main page...</div>;
    }

    function navigateToHomePage()
    {
        navigate('/');
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

    function navigateToFeaturesPage()
    {
        navigate('/features')
    }

    function navigateToCreateAppointment()
    {
        navigate('/company/create-appointment')
    }

    function navigateToMyUserAppointments()
    {
        navigate('/user/my-appointments')
    }

    function navigateToCompanyMyBookedAppointmentsPage()
    {
        navigate('/company/my-booked-appointments')
    }

    function navigateToCompanyAppointmentsHistoryPage()
    {
        navigate('/company/appointment-history');
    }

    function navigateToUserSettings()
    {
        navigate('/user/settings');
    }

    function navigateToCompanySettings()
    {
        navigate('/company/settings');
    }

    function navigateToGitHubRepository()
    {
        window.open('https://github.com/chris924/BookItNow', '_blank');
    }
    

    


    return{
        navigateToMainPage,
        navigateToHomePage,
        navigateToUserLoggedInPage,
        navigateToUserLoginPage,
        navigateToUserRegisterPage,
        navigateToCompanyLoginPage,
        navigateToCompanyLoggedInPage,
        navigateToCompanyRegisterPage,
        navigateToFAQPage,
        navigateToCreateAppointment,
        navigateToMyUserAppointments,
        navigateToCompanyMyBookedAppointmentsPage,
        navigateToCompanyAppointmentsHistoryPage,
        navigateToFeaturesPage,
        navigateToUserSettings,
        navigateToCompanySettings,
        navigateToGitHubRepository
    }

    

}