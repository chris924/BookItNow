import {Button} from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import "../../styles/userLoginForm.css"
import confetti from "canvas-confetti";

interface LoginFormProps{
    onBackButtonClick: () => void;
}

const handleConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    
  });
};


export default function UserLoginForm({ onBackButtonClick}: LoginFormProps): JSX.Element
{
    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[350px] space-y-4">
      <div className="w-full flex flex-row flex-wrap gap-5 justify-center items-center ">
        <Input
          key="danger"
          type="name"
          color="primary"
          label="Name"
          placeholder="Enter your name"
          className="max-w-[220px]"
        />
        <Input
          key="danger"
          type="name"
          color="primary"
          label="Username"
          placeholder="Enter your username"
          className="max-w-[220px]"
        />
         <Input
          key="danger"
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          className="max-w-[220px]"
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
            />
            <Input
              key="danger"
              type="password"
              color="primary"
              label="Retype Password"
              placeholder="Retype your password"
              className="max-w-[280px]"
            />
          </div>
        
     
      <div className="flex justify-center gap-8 items-center">
      <Button color="danger" onClick={() => onBackButtonClick()}>
       Go Back
      </Button>
      <Button color="secondary" onPress={handleConfetti}>
       Register
      </Button>
      </div>
    </div>
  </div>
    )
}


