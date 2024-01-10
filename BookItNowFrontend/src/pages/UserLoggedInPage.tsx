import { Navigate } from "react-router-dom";
import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { user } from "@nextui-org/theme";
import { useEffect, useState } from "react";
import UserDataFetch, { DataResponse, UserDataResult } from '../services/userData/UserDataFetch';

export default function UserLoggedInPage(): JSX.Element
{
  const [userData, setUserData] = useState<UserDataResult | null>(null);
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

  if (userData === null) {
    // Loading state or handle the error
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <Navigate to="/user/login" />;
  }
  
    return (
      <>
        <UserLoggedInLayout  userData={userData.data}/>
       
      </>
    );
}