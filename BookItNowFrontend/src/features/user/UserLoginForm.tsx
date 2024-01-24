import { useEffect, useState } from "react";
import {Button} from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import "../../styles/userLoginForm.css"
import BadCredentials from "../../components/BadCredentials";
import { UserLoginFormProps } from "../../lib/constants/interfaces/UserInterfaces";
import 'animate.css';
import { useNavigation } from "react-router-dom";
import UseNavigation from "../../hooks/UseNavigation";



export default function UserLoginForm({ onBackButtonClick, onLoginClick, onWrongCredentials}: UserLoginFormProps): JSX.Element
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);


  const {navigateToCompanyLoginPage} = UseNavigation();


  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


    return (
        <div className="flex justify-center items-center h-screen overflow-hidden">
    <div className="w-full max-w-[200px] space-y-4">
    <div className="flex justify-center text-xl font-semibold text-blue-600/75 dark:text-blue-500/75 animate__animated animate__backInDown">Login</div>
    {onWrongCredentials && (
      <div className="flex justify-center">
      <BadCredentials/>
     </div>
     )}
      <div className="w-full flex flex-row flex-wrap gap-5">  
        <Input
          key="emailInput"
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          className="max-w-[220px]"
          onChange={(e) => setEmail(e.target.value)}
        />
         <Input
          key="passwordInput"
          type="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          className="max-w-[220px]"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="flex justify-center gap-8 items-center">
      <Button color="danger" className="animate__animated animate__backInLeft" onClick={() => onBackButtonClick()} >
       Go Back
      </Button>
      <Button color="secondary" className="animate__animated animate__backInRight" onClick={() => onLoginClick(email, password)}>
       Log In
      </Button >
     
      </div>
      <div className="flex justify-center">
      {isSmallDevice && (
            <Button color="secondary" onClick={() => navigateToCompanyLoginPage()}>
              Company Login
            </Button>
          )}
      </div>
    </div>
  </div>
    )
}