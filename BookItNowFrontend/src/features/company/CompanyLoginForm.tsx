import { useState } from "react";
import {Button} from "@nextui-org/button";
import { Input, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import "../../styles/userLoginForm.css"
import BadCredentials from "../../components/BadCredentials";
import { CompanyLoginFormProps } from "../../lib/constants/interfaces/CompanyInterfaces";
import UseNavigation from "../../hooks/UseNavigation";

export default function CompanyLoginForm({ onBackButtonClick, onLoginClick, onWrongCredentials}: CompanyLoginFormProps): JSX.Element
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {navigateToFAQPage, navigateToCompanyRegisterPage} = UseNavigation();


  const handleFAQClick = () => {

    navigateToFAQPage();
  }

  const handleSignUpClick = () => {

    navigateToCompanyRegisterPage();
  }



    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[200px] space-y-4">
    <div className="flex justify-center text-xl font-semibold text-blue-600/75 dark:text-blue-500/75 animate__animated animate__backInDown">Login</div>
    {onWrongCredentials && (
      <div className="flex justify-center">
      <BadCredentials/>
     </div>
     )}
      <div className="w-full flex flex-row flex-wrap gap-5">  
        <Input
          key="danger"
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          className="max-w-[220px]"
          onChange={(e) => setEmail(e.target.value)}
        />
         <Input
          key="danger"
          type="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          className="max-w-[220px]"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="flex justify-center gap-8 items-center">
      <Button color="danger" className="animate__animated animate__backInLeft" onClick={() => onBackButtonClick()}>
       Go Back
      </Button>
      <Button color="secondary" className="animate__animated animate__backInRight" onClick={() => onLoginClick(email, password)}>
       Log In
      </Button >
      
      </div>
      <div className="w-full flex flex-row justify-center gap-5 animate__animated animate__backInUp">
      <Popover
          key="as"
          showArrow
          offset={10}
          placement="bottom"
          backdrop="opaque"
        >
          <PopoverTrigger>
            <Button color="success" variant="flat" className="capitalize">
              Sign up Company
            </Button>
          </PopoverTrigger>
          <PopoverContent>
        <div className="px-1 py-2 ">
          <div className="">Make sure to read the  <Link href="#" color="primary" onClick={handleFAQClick}>FAQ</Link> and click  <Link href="#" onClick={handleSignUpClick} color="primary">here to sign up!</Link></div>
        </div>
      </PopoverContent>
        </Popover>

      </div>
    </div>
  </div>
    )
}