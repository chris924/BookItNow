import { useEffect, useState } from "react";
import UserMyAppointmentsForm from "../features/user/UserMyAppointmentsForm";
import { UserDataResult } from "../lib/constants/interfaces/UserInterfaces";
import UserDataFetch from "../services/user/UserDataFetch";
import LoadingCircle from "../components/LoadingCircle";
import UserLoggedInLayout from "../layouts/UserLoggedInLayout";




export default function UserMyAppointmentsPage(): JSX.Element
{

    const [userData, setUserData] = useState<UserDataResult>();
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);

            const userDataResponse = await UserDataFetch();
            if(userDataResponse.success)
            {
                setUserData(userDataResponse);
                setLoading(false);
            }
        }
        
        fetchData();

    }, [])

    
       
        if(userData === null || userData === undefined || loading)
        {
           return <LoadingCircle/>
        }


    return(
        <>
        <UserLoggedInLayout  UserData={userData.data}/>
        <UserMyAppointmentsForm userData={userData.data}/>
        </>
    )
}