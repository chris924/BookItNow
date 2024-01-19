import { useState, useEffect } from "react";
import LoadingCircle from "../components/LoadingCircle";
import CompanyCreateAppointmentForm from "../features/company/CompanyCreateAppointmentForm";
import UseNavigation from "../hooks/UseNavigation";
import CompanyLoggedInLayout from "../layouts/CompanyLoggedInLayout";
import { COMPANY_DATA_ENDPOINT } from "../lib/constants/apiURL";
import { CompanyAppointmentFetchResponse, CompanyDataResult } from "../lib/constants/interfaces/CompanyInterfaces";
import CompanyDataFetch from "../services/company/CompanyDataFetch";
import CompanyLoggedInPage from "./CompanyLoggedInPage";
import CompanyAppointmentDataFetch from "../services/company/CompanyAppointmentDataFetch";



export default function CompanyCreateAppointmentPage()
{
    const [companyData, setCompanyData] = useState<CompanyDataResult>();
    const [companyAppointments, setCompanyAppointments] = useState<CompanyAppointmentFetchResponse>();

  const [loading, setLoading] = useState(false);

  
  
  const {navigateToMainPage} = UseNavigation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await CompanyDataFetch(COMPANY_DATA_ENDPOINT);
  
       setCompanyData(result);
  
            if(result.data !== undefined)
            {
                const appointmentResult = await CompanyAppointmentDataFetch(result.data?.id);
                setCompanyAppointments(appointmentResult);
               
            }   
        
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (companyData === null || companyData === undefined || companyAppointments === undefined || companyAppointments === null || loading) {
    return <LoadingCircle/>;
  }
  
  if (companyData?.success === false ) {

    return navigateToMainPage();
  }

    return(
        
       <>
       <CompanyLoggedInLayout  CompanyData={companyData.data}/>
       <CompanyCreateAppointmentForm CompanyData={companyData.data} CompanyAppointments={companyAppointments.data}/>   
       </>
       
    )
}