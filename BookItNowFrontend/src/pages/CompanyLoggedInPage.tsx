import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import CompanyDataFetch from "../services/company/CompanyDataFetch";
import LoadingCircle from "../components/LoadingCircle";
import { CompanyAppointmentData, CompanyAppointmentFetchResponse, CompanyDataResult } from "../lib/constants/interfaces/CompanyInterfaces";
import CompanyLoggedInLayout from "../layouts/CompanyLoggedInLayout";
import { COMPANY_DATA_ENDPOINT } from "../lib/constants/apiURL";
import CompanyAppointmentDataFetch from "../services/company/CompanyAppointmentDataFetch";
import CompanyLoggedInForm from "../features/company/CompanyLoggedInForm";

export default function CompanyLoggedInPage(): JSX.Element
{
  const [companyData, setCompanyData] = useState<CompanyDataResult>();
  const [companyAppointments, setCompanyAppointments] = useState<CompanyAppointmentData[]>();
  const [bookedAppointemnts, setBookedAppointments] = useState<CompanyAppointmentData[]>();

  const [loading, setLoading] = useState(false);

  
  
  const {navigateToMainPage} = UseNavigation();


  useEffect(() => {

    const fetchData = async () => { 
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await CompanyDataFetch(COMPANY_DATA_ENDPOINT);
          setCompanyData(result);
        if(result.data !== undefined)
        {
          const companyAppointments = await CompanyAppointmentDataFetch(result.data?.id)
          if(companyAppointments.success)
          {
            setCompanyAppointments(companyAppointments.data);
            checkBookedAppointments(companyAppointments);
          }
          
        }
                  
      } catch (error) {
        console.error("Error fetching company data", error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function checkBookedAppointments(companyApps: CompanyAppointmentFetchResponse)
  {
    setBookedAppointments(companyApps.data?.filter(x => x.userId !== null));
  }




  if (companyData === null || companyData === undefined || companyAppointments === undefined || bookedAppointemnts === undefined || loading) {
    return <LoadingCircle/>;
  }
  
  if (companyData?.success === false) {

    return navigateToMainPage();
  }
  
    return (
      <>    
      <CompanyLoggedInLayout  CompanyData={companyData.data}/>   
      <CompanyLoggedInForm CompanyData={companyData.data} companyAppointments={companyAppointments} bookedAppointments={bookedAppointemnts}/>
    
      </>
    );
}