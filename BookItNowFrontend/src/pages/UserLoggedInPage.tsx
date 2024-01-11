import { Navigate } from "react-router-dom";
import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { user } from "@nextui-org/theme";
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import UserDataFetch, { DataResponse, UserDataResult } from '../services/userData/UserDataFetch';
import LoadingCircle from "../components/LoadingCircle";

export default function UserLoggedInPage(): JSX.Element
{
  const [userData, setUserData] = useState<UserDataResult>();
  const [loading, setLoading] = useState(false);
  
  const {navigateToMainPage} = UseNavigation();


  useEffect(() => {

    

    const fetchData = async () => { 
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await UserDataFetch();
          setUserData(result);
        
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (userData === null || userData === undefined || loading) {
    return <LoadingCircle/>;
  }
  
  if (userData?.success === false) {

    return navigateToMainPage();
  }
  
    return (
      <>
        <UserLoggedInLayout  UserData={userData.data}/>
       
      </>
    );
}