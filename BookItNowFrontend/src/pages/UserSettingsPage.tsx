import { useEffect, useState } from "react";
import LoadingCircle from "../components/LoadingCircle";
import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import UserDataFetch from "../services/user/UserDataFetch";
import { GetCookie } from "../utils/cookies/SetCookie";
import UseNavigation from "../hooks/UseNavigation";
import { UserDataResult } from "../lib/constants/interfaces/UserInterfaces";
import UserSettingsForm from "../features/user/UserSettingsForm";



export default function UserSettingsPage(): JSX.Element
{
    const [userData, setUserData] = useState<UserDataResult>();
    const [loading, setLoading] = useState(false);
    const [avatarUploadFlag, setAvatarUploadFlag] = useState(false);
    
    const {navigateToMainPage} = UseNavigation();


    useEffect(() => {

    


        const fetchData = async () => { 
          try {
    
            const cookie = await GetCookie("authToken");
            if(cookie.success === false)
            {
              navigateToMainPage();
            }
    
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
      }, [avatarUploadFlag]);
    
      if (userData === null || userData === undefined || loading) {
        return <LoadingCircle />;
      }
      
      if (!userData || userData.success === false ) {
        return navigateToMainPage();
      }
      
      return (
        <>
          <UserLoggedInLayout UserData={userData.data} />
          <UserSettingsForm UserData={userData.data} onAvatarChange={() => setAvatarUploadFlag((prevFlag) => !prevFlag)}/>
        </>
      );
}