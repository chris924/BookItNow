import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import UserDataFetch from '../services/user/UserDataFetch';
import LoadingCircle from "../components/LoadingCircle";
import { UserDataResult } from "../lib/constants/interfaces/UserInterfaces";
import UserTable from "../features/user/table/UserTable";
import { USER_COMPANY_DATA_ENDPOINT } from "../lib/constants/apiURL";
import CompanyDataFetch from "../services/company/CompanyDataFetch";
import { CompanyDataResult } from "../lib/constants/interfaces/CompanyInterfaces";

export default function UserLoggedInPage(): JSX.Element
{
  const [userData, setUserData] = useState<UserDataResult>();
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyDataResult>();
  
  const {navigateToMainPage} = UseNavigation();


  useEffect(() => {

    const fetchData = async () => { 
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await UserDataFetch();
          setUserData(result);
          
        const companyResult = await CompanyDataFetch(USER_COMPANY_DATA_ENDPOINT);
        setCompanyData(companyResult);
        
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (userData === null || userData === undefined || companyData === null || companyData === undefined || loading) {
    return <LoadingCircle/>;
  }
  
  if (userData?.success === false) {

    return navigateToMainPage();
  }
  
    return (
      <>
        <UserLoggedInLayout  UserData={userData.data}/>
        <UserTable companyData={companyData.data}/>
      </>
    );
}