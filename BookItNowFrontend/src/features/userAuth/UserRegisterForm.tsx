import {Button} from "@nextui-org/button";
import { Input, Tooltip } from "@nextui-org/react";
import "../../styles/userLoginForm.css"
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

interface LoginFormProps{
    onBackButtonClick: () => void;
    onRegisterClick: (name: string, username:string, email:string, password:string) => void;
    registerResult: boolean;
}


const handleConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    
  });
};


export default function UserLoginForm({ onBackButtonClick , onRegisterClick, registerResult }: LoginFormProps): JSX.Element
{
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);


  useEffect(() => {

    if(password !== rePassword || password.length == 0 || rePassword.length == 0 || name.length == 0 || username.length == 0 || email.length == 0)
    {
      setRegisterButtonDisabled(true);
    }
    else
    {
      setRegisterButtonDisabled(false);
    }

  }, [password, rePassword, email, username, name])



    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[350px] space-y-4">
    <div className="flex justify-center text-xl font-semibold text-blue-600/75 dark:text-blue-500/75">Register</div>
      {registerResult && (
      <div className="flex justify-center">
      <Button color="success">Succesfully Registered</Button>
     </div>
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
        <Input
          key="danger"
          type="name"
          color="primary"
          label="Username"
          placeholder="Enter your username"
          className="max-w-[220px]"
          onChange={(e) => setUsername(e.target.value)}
        />
         <Input
          key="danger"
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          className="max-w-[220px]"
          onChange={(e) => setEmail(e.target.value)}
        />
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
      <Button isDisabled={registerButtonDisabled} color="secondary" onPress={handleConfetti} onClick={() => onRegisterClick(name, username, email, password)}>
       Register
      </Button>
      </div>
    </div>
  </div>
    )
}


