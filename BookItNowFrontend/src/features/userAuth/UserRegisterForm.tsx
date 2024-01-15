import {Button} from "@nextui-org/button";
import { Input, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";
import "../../styles/userLoginForm.css"
import { registerConfetti } from "../../components/Confetti";
import { useState } from "react";
import { RegisterFormProps } from "../../lib/constants/interfaces/userInterface/UserInterfaces";
import { useRegistrationValidation } from "../../hooks/UseEffect";
import UserInputDuplicateFetch from "../../services/userAuth/UserInputDuplicateFetch";





export default function UserRegisterForm({ onBackButtonClick , onRegisterClick, registerResult }: RegisterFormProps): JSX.Element
{
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);


  useRegistrationValidation(
    name,
    username,
    email,
    password,
    rePassword,
    usernameInvalid,
    emailInvalid,
    setRegisterButtonDisabled
  );


  const handleRegisterClick = () => {
    if (!registerButtonDisabled) {
      setRegisterButtonDisabled(true); 
      onRegisterClick(name, username, email, password);
    }
  };

  const handleUsernameEmailBlur = async () => {
  

    const data = await UserInputDuplicateFetch(username, email);
    console.log(data);

    if(data.duplicate === true && data.username !== null && data.email !== null)
    {
      setUsernameInvalid(true);
      setEmailInvalid(true);
      setRegisterButtonDisabled(true);
    }
    else if(data.duplicate === true && data.username !== null && data.email === null)
    {
      setUsernameInvalid(true);
      setEmailInvalid(false);
      setRegisterButtonDisabled(true);
    }
    else if(data.duplicate === true && data.email !== null && data.username === null)
    {
      setEmailInvalid(true);
      setUsernameInvalid(false);
      setRegisterButtonDisabled(true);
    }
    else
    {
      setUsernameInvalid(false);
      setEmailInvalid(false);
    }

  }




    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[450px] space-y-4">
    <div className="flex justify-center text-xl font-semibold text-blue-600/75 dark:text-blue-500/75">Register</div>
      {registerResult && (<>
      <div className="flex justify-center">
      <Button color="success">Succesfully Registered</Button>
      {registerConfetti()}
     </div>
     </>
      )}
      <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center ">
        <Input
          key="danger"
          type="name"
          color="primary"
          label="Name"
          placeholder="Enter your name"
          className="max-w-[220px]"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center ">
        <Tooltip 
      showArrow
      placement="left"
      content="Username already exists!"
      isOpen={usernameInvalid}
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
          key="danger"
          type="name"
          color="primary"
          label="Username"
          placeholder="Enter your username"
          className="max-w-[220px]"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameEmailBlur}
        />
    </Tooltip>
        </div>

        <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center ">
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
          key="danger"
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          className="max-w-[220px]"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleUsernameEmailBlur}
        />
      </Tooltip>
        </div>
      </div>
      <div className="flex flex-row gap-5">
            <Input
              key="danger"
              type="password"
              color="primary"
              label="Password"
              placeholder="Enter your password"
              className="max-w-[220px]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              key="danger"
              type="password"
              color="primary"
              label="Retype Password"
              placeholder="Retype your password"
              className="max-w-[280px]"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
        
     
      <div className="flex justify-center gap-8 items-center">
      <Button color="danger" onClick={() => onBackButtonClick()}>
       Go Back
      </Button>
      <Button isDisabled={registerButtonDisabled} color="secondary" onClick={() => handleRegisterClick()}>
       Register
      </Button>
      </div>
    </div>
  </div>
    )
}


