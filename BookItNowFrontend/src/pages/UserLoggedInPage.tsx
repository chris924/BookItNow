import { Navigate } from "react-router-dom";
import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { user } from "@nextui-org/theme";
import { useEffect, useState } from "react";
import UserDataFetch, { DataResponse, UserDataResult } from '../services/userData/UserDataFetch';

export default function UserLoggedInPage(): JSX.Element
{
  const [userData, setUserData] = useState<UserDataResult>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserDataFetch();
          setUserData(result);
        
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, []);

  if (userData === null || userData === undefined) {
    return <div>Loading...</div>;
  }
  
  if (userData?.success === false) {
    console.log("ASD");
    return <Navigate to="/user/login" />;
  }
  
    return (
      <>
        <UserLoggedInLayout  UserData={userData.data}/>
       
      </>
    );
}