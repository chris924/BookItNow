import {Button} from "@nextui-org/button";
import { Input, Textarea, Tooltip } from "@nextui-org/react";
import { registerConfetti } from "../../components/Confetti";
import { useState } from "react";
import { useCompanyRegistrationValidation } from "../../hooks/UseEffect";
import { CompanyRegisterFormProps } from "../../lib/constants/interfaces/CompanyInterfaces";
import CompanyInputDuplicateFetch from "../../services/company/CompanyInputDuplicateFetch";



export default function CompanyRegisterForm({ onBackButtonClick , onRegisterClick, registerResult }: CompanyRegisterFormProps): JSX.Element
{
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [appServiceName, setAppServiceName] = useState("");
  const [appServiceDescription, setAppServiceDescription] = useState("");
  const [description, setDescription] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [companyNameInvalid, setCompanyNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);


  useCompanyRegistrationValidation(
    companyName,
    email,
    password,
    appServiceName,
    appServiceDescription,
    description,
    rePassword,
    companyNameInvalid,
    emailInvalid,
    setRegisterButtonDisabled
  );


  const handleRegisterClick = () => {
    if (!registerButtonDisabled) {
      setRegisterButtonDisabled(true); 
      onRegisterClick(companyName, email, password, appServiceName, appServiceDescription, description);
    }
  };

  const handleCompanyNameEmailBlur = async () => {
  
    const data = await CompanyInputDuplicateFetch(companyName, email);
    console.log(data);

    if(data.duplicate === true && data.companyName !== null && data.email !== null)
    {
      setCompanyNameInvalid(true);
      setEmailInvalid(true);
      setRegisterButtonDisabled(true);
    }
    else if(data.duplicate === true && data.companyName !== null && data.email === null)
    {
      setCompanyNameInvalid(true);
      setEmailInvalid(false);
      setRegisterButtonDisabled(true);
    }
    else if(data.duplicate === true && data.email !== null && data.companyName === null)
    {
      setEmailInvalid(true);
      setCompanyNameInvalid(false);
      setRegisterButtonDisabled(true);
    }
    else
    {
      setCompanyNameInvalid(false);
      setEmailInvalid(false);
    }

  }




  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="w-full max-w-[450px] space-y-4">
        <div className="flex justify-center text-xl font-semibold text-blue-600/75 dark:text-blue-500/75 animate__animated animate__backInDown">
          Company Register
        </div>
  
        {registerResult && (
          <>
            <div className="flex justify-center">
              <Button color="success">Successfully Registered</Button>
              {registerConfetti()}
            </div>
          </>
        )}
  
        <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
          
            <Tooltip
              showArrow
              placement="left"
              content="Company name already exists!"
              isOpen={companyNameInvalid}
              classNames={{
                base: [
                  // arrow color
                  "before:bg-neutral-400 dark:before:bg-white",
                ],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <Input
                key="company name"
                type="name"
                color="primary"
                label="Company name"
                placeholder="Enter the Company name"
                className="max-w-[220px]"
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={handleCompanyNameEmailBlur}
                maxLength={30}
              />
            </Tooltip>
          </div>
  
          <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
            <Tooltip
              showArrow
              placement="left"
              content="Email already exists!"
              isOpen={emailInvalid}
              classNames={{
                base: [
                  // arrow color
                  "before:bg-neutral-400 dark:before:bg-white",
                ],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <Input
                key="email"
                type="email"
                color="primary"
                label="Email"
                placeholder="Enter your email"
                className="max-w-[220px]"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleCompanyNameEmailBlur}
                maxLength={30}
              />
            </Tooltip>
          </div>
        
  
        <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
          <Textarea
      label="Company Description"
      placeholder="Enter some basic information about your Company"
      className="max-w-xs"
      color="warning"
      maxLength={100}
      onChange={(e) => setDescription(e.target.value)}
    />
        </div>

        <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
          <Input
            key="appServiceName"
            type="name"
            color="warning"
            label="Service name"
            placeholder="Enter your service name"
            className="max-w-[220px]"
            maxLength={30}
            onChange={(e) => setAppServiceName(e.target.value)}
          />
        </div>


        <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
           <Textarea
      label="Service Description"
      placeholder="Enter your Service description"
      className="max-w-xs"
      color="warning"
      maxLength={100}
      onChange={(e) => setAppServiceDescription(e.target.value)}
    />
        </div>
       
  
        <div className="flex flex-row gap-5">
          <Input
            key="password"
            type="password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            className="max-w-[220px]"
            onChange={(e) => setPassword(e.target.value)}
            maxLength={30}
          />
          <Input
            key="repassword"
            type="password"
            color="primary"
            label="Retype Password"
            placeholder="Retype your password"
            className="max-w-[280px]"
            onChange={(e) => setRePassword(e.target.value)}
            maxLength={30}
          />
        </div>
  
        <div className="flex justify-center gap-8 items-center">
          <Button color="danger" className="animate__animated animate__backInLeft" onClick={() => onBackButtonClick()} onTouchStart={() => onBackButtonClick()}>
            Go Back
          </Button>
          <Button
            isDisabled={registerButtonDisabled}
            color="secondary"
            onClick={() => handleRegisterClick()}
            onTouchStart={()=> handleRegisterClick()}
            className="animate__animated animate__backInRight"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
