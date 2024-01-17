import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import UserDataFetch from '../services/user/UserDataFetch';
import LoadingCircle from "../components/LoadingCircle";
import { UserDataResult } from "../lib/constants/interfaces/UserInterfaces";
import UserTable from "../features/user/table/UserTable";

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
        <UserTable/>
      </>
    );
}