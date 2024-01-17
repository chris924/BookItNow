import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import CompanyDataFetch from "../services/company/CompanyDataFetch";
import LoadingCircle from "../components/LoadingCircle";
import { CompanyDataResult } from "../lib/constants/interfaces/CompanyInterfaces";
import CompanyLoggedInLayout from "../layouts/CompanyLoggedInLayout";
import { COMPANY_DATA_ENDPOINT } from "../lib/constants/apiURL";

export default function CompanyLoggedInPage(): JSX.Element
{
  const [companyData, setCompanyData] = useState<CompanyDataResult>();
  const [loading, setLoading] = useState(false);
  
  const {navigateToMainPage} = UseNavigation();


  useEffect(() => {

    const fetchData = async () => { 
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await CompanyDataFetch(COMPANY_DATA_ENDPOINT);
          setCompanyData(result);

       
        
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (companyData === null || companyData === undefined || loading) {
    return <LoadingCircle/>;
  }
  
  if (companyData?.success === false) {

    return navigateToMainPage();
  }
  
    return (
      <>
     
      <CompanyLoggedInLayout  CompanyData={companyData.data}/>
      
        
      </>
    );
}