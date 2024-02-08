import { useAnimation } from "framer-motion";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import rightarrow from "../../styles/images/rightarrow.png";
import FloatingArrow from "../../components/FloatingArrow";

interface UserLoggedInFormProps {
  UserData: UserDataResult['data'];
}

export default function UserLoggedInForm({ UserData }: UserLoggedInFormProps): JSX.Element {

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
     <FloatingArrow/> 
     


    <div className="container mx-auto px-10 py-3 grid grid-cols-1 lg:grid-cols-2 items-center space-between">
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