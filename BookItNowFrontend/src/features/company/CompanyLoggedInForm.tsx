import { useEffect, useState } from "react"
import { CompanyAppointmentData, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces"
import CompanyAppointmentDataFetch from "../../services/company/CompanyAppointmentDataFetch";
import FloatingArrow from "../../components/FloatingArrow";


interface CompanyLoggedInFormProps
{
    CompanyData: CompanyDataResult['data'];
    companyAppointments: CompanyAppointmentData[];
    bookedAppointments: CompanyAppointmentData[];
}



export default function CompanyLoggedInForm({CompanyData, companyAppointments, bookedAppointments}: CompanyLoggedInFormProps): JSX.Element
{
  const [arrowRight, setArrowRight] = useState("");
  const [arrowTop, setArrowTop] = useState("");
  const [arrowWidth, setArrowWidth] =useState("");


  useEffect(() => {
      const handleResize = async () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;      
        
          if(screenWidth < 700)
          {
             setArrowRight("11%");
             setArrowTop("8%");
             setArrowWidth("20%");
          }
          else
          {
              setArrowRight("25%");
              setArrowTop("7%");
              setArrowWidth("6%");
          }

      };
  
     
   handleResize();
  
     
      window.addEventListener('resize', handleResize);
  
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 

const gradientStyle = {
  background: 'linear-gradient(90deg, #8E2DE2 0%, #800080 100%)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
};

const containerStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 700,
  display: 'flex', 
  alignItems: 'center',

};




    return (
        <>

        {companyAppointments?.length === 0 && <FloatingArrow arrowRight={arrowRight} arrowTop={arrowTop} arrowWidth={arrowWidth}/>}

         <div className="container mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-1 items-center space-between">
      <div className="lg:pr-8 py-10  lg:col-span-2 text-4xl animate__animated animate__fadeInDown" style={containerStyle}>
      <span>Welcome back,&nbsp;</span>
        <span style={gradientStyle}>{CompanyData?.companyName}</span>
        
      </div>
      
      <div className="lg:pr-8  lg:col-span-2 text-3xl font-mono animate__animated animate__fadeInDown">
        You currently have {companyAppointments.length !== undefined && companyAppointments.length > 0
          ? companyAppointments.length + " created appointment"
          : "no created appointments."}
        {companyAppointments.length === 0 && (
          <div className="lg:pr-8 py-10 lg:col-span-2 text-3xl font-mono animate__animated animate__fadeInDown">
            Create some at the "Create Appointments" Page!
          </div>
        )}
      </div>
    </div>


        </>
      );




}