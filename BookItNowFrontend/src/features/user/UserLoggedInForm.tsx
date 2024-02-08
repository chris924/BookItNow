import { useAnimation } from "framer-motion";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import rightarrow from "../../styles/images/rightarrow.png";
import FloatingArrow from "../../components/FloatingArrow";
import { useEffect, useState } from "react";

interface UserLoggedInFormProps {
  UserData: UserDataResult['data'];
}

export default function UserLoggedInForm({ UserData }: UserLoggedInFormProps): JSX.Element {

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


  const arrowControls = useAnimation();

  return (
    <>
      
      
      
      <FloatingArrow arrowRight={arrowRight} arrowTop={arrowTop} arrowWidth={arrowWidth}/>



    <div className="container mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-1 items-center space-between">
      <div className="lg:pr-8 py-10  lg:col-span-2 text-4xl animate__animated animate__fadeInDown" style={containerStyle}>
      <span>Welcome back,&nbsp;</span>
        <span style={gradientStyle}>{UserData?.name}</span>
        
      </div>
      
      <div className="lg:pr-8  lg:col-span-2 text-3xl font-mono animate__animated animate__fadeInDown">
        You currently have {UserData?.appointments.length !== undefined && UserData?.appointments.length > 0
          ? UserData?.appointments.length + " active appointment"
          : "no active appointments."}
        {UserData?.appointments.length === 0 && (
          <div className="lg:pr-8 py-10 lg:col-span-2 text-3xl font-mono animate__animated animate__fadeInDown">
            Book some at the Search Companies Page!
          </div>
        )}
      </div>
    </div>
    </>
  );
}