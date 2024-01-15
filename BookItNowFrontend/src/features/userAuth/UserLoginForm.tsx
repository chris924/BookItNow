import { useState } from "react";
import {Button} from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import "../../styles/userLoginForm.css"
import BadCredentials from "./BadCredentials";
import { LoginFormProps } from "../../lib/constants/interfaces/userInterface/UserInterfaces";


export default function UserLoginForm({ onBackButtonClick, onLoginClick, onWrongCredentials}: LoginFormProps): JSX.Element
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[200px] space-y-4">
    <div className="flex justify-center text-xl font-semibold text-blue-600/75 dark:text-blue-500/75">Login</div>
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
      <Button color="danger" onClick={() => onBackButtonClick()}>
       Go Back
      </Button>
      <Button color="secondary" onClick={() => onLoginClick(email, password)}>
       Log In
      </Button >
      </div>
    </div>
  </div>
    )
}