import {Button} from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import "../../styles/userLoginForm.css"


interface LoginFormProps{
    onBackButtonClick: () => void;
}


export default function UserLoginForm({ onBackButtonClick}: LoginFormProps): JSX.Element
{
    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-[200px] space-y-2">
      <div className="w-full flex flex-row flex-wrap gap-4">
        <Input
          key="danger"
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          className="max-w-[220px]"
        />
      </div>
      <div className="w-full flex flex-row flex-wrap gap-4">
        <Input
          key="danger"
          type="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          className="max-w-[220px]"
        />
      </div>
      <div className="flex justify-center gap-8 items-center">
      <Button color="danger" onClick={() => onBackButtonClick()}>
       Go Back
      </Button>
      <Button color="secondary">
       Log In
      </Button>
      </div>
    </div>
  </div>
    )
}