import UserLoggedInLayout from "../layouts/UserLoggedInLayout";
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import UserDataFetch from '../services/user/UserDataFetch';
import LoadingCircle from "../components/LoadingCircle";
import { UserDataResult } from "../lib/constants/interfaces/UserInterfaces";
import UserTable from "../features/user/table/UserTable";
import CompanyGetAllCompanyDataFetch, { CompanyAllDataResult } from "../services/company/CompanyGetAllCompanyDataFetch";
import { GetCookie} from "../utils/cookies/SetCookie";
import AppointmentGetAllFetch, { AppointmentGetAllResult } from "../services/appointment/AppointmentGetAllFetch";

export default function UserLoggedInPage(): JSX.Element
{
  const [userData, setUserData] = useState<UserDataResult>();
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyAllDataResult>();
  const [companyAppointments, setCompanyAppointments] = useState<AppointmentGetAllResult>();
  
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
          
        

       const companyResult = await CompanyGetAllCompanyDataFetch();
        
          setCompanyData(companyResult);
        
         
      
        if(companyResult.data !== undefined)
        {
         

        const appointments = await AppointmentGetAllFetch();
        setCompanyAppointments(appointments);
 
        }
        
        
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (userData === null || userData === undefined || companyData === null || companyData === undefined || companyAppointments === undefined ||companyAppointments === null || loading) {
    return <LoadingCircle/>;
  }
  
  if (userData?.success === false || companyData.success === false || companyAppointments.success === false) {

    return navigateToMainPage();
  }
  
    return (
      <>
        <UserLoggedInLayout  UserData={userData.data}/>
        <UserTable companyData={companyData.data} companyAppointments={companyAppointments} userData={userData}/>
      </>
    );
}