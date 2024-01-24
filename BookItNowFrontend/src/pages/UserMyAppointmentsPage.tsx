import { useEffect, useState } from "react";
import UserMyAppointmentsForm from "../features/user/UserMyAppointmentsForm";
import { UserDataResult } from "../lib/constants/interfaces/UserInterfaces";
import UserDataFetch from "../services/user/UserDataFetch";
import LoadingCircle from "../components/LoadingCircle";
import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { GetCookie } from "../utils/cookies/SetCookie";
import UseNavigation from "../hooks/UseNavigation";




export default function UserMyAppointmentsPage(): JSX.Element
{

    const [userData, setUserData] = useState<UserDataResult>();
    const [loading, setLoading] = useState(false);
    const [cancelClickFlag, setCancelClickFlag] = useState(false);

    const {navigateToMainPage} = UseNavigation();

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const userDataResponse = await UserDataFetch();
            
                setUserData(userDataResponse);
                setLoading(false);
            
        }
        
        fetchData();

    }, [cancelClickFlag])

    
       
        if(userData === null || userData === undefined || loading)
        {
           return <LoadingCircle/>
        }


        if (userData?.success === false) {

            return navigateToMainPage();
          }
          

    return(
        <>
        <UserLoggedInLayout  UserData={userData.data}/>
        <UserMyAppointmentsForm userData={userData.data}  onAppointmentCancel={() => setCancelClickFlag((prevFlag) => !prevFlag)}/>
        </>
    )
}