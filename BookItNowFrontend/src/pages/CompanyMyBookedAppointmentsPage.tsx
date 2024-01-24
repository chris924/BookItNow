
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import CompanyDataFetch from "../services/company/CompanyDataFetch";
import LoadingCircle from "../components/LoadingCircle";
import { CompanyAppointmentFetchResponse, CompanyDataResult } from "../lib/constants/interfaces/CompanyInterfaces";
import CompanyLoggedInLayout from "../layouts/CompanyLoggedInLayout";
import { COMPANY_DATA_ENDPOINT } from "../lib/constants/apiURL";
import CompanyMyAppointmentsForm from "../features/company/CompanyMyBookedAppointmentsForm";
import CompanyAppointmentDataFetch from "../services/company/CompanyAppointmentDataFetch";
import CompanyMyBookedAppointmentsForm from "../features/company/CompanyMyBookedAppointmentsForm";

export default function CompanyMyBookedAppointmentsPage(): JSX.Element
{
  const [companyData, setCompanyData] = useState<CompanyDataResult>();
  const [companyAppointments, setCompanyAppointments] = useState<CompanyAppointmentFetchResponse>();
  const [loading, setLoading] = useState(false);
  const [cancelClickFlag, setCancelClickFlag] = useState(false);
  
  
  const {navigateToMainPage} = UseNavigation();


  useEffect(() => {

    const fetchData = async () => { 
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await CompanyDataFetch(COMPANY_DATA_ENDPOINT);
          setCompanyData(result);

       if(result.success === true && result.data)
       {
        const appointments = await CompanyAppointmentDataFetch(result.data?.id);

        if(appointments.success === true && appointments)
        {
            setCompanyAppointments(appointments);
        }
        
       }
        
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [cancelClickFlag]);

  if (companyData === null || companyData === undefined || companyAppointments === undefined || companyAppointments === null || loading) {
    return <LoadingCircle/>;
  }
  
  if (companyData?.success === false) {

    return navigateToMainPage();
  }
  
    return (
      <>    
      <CompanyLoggedInLayout  CompanyData={companyData.data}/>
      <CompanyMyBookedAppointmentsForm companyAppointments={companyAppointments.data} onAppointmentCancel={() => setCancelClickFlag((prevFlag) => !prevFlag)} />   
      </>
    );
}