import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import UserAvatarUploadFetch from "../../services/user/UserAvatarUploadFetch";
import UseNavigation from "../../hooks/UseNavigation";
import { useNavigate } from "react-router-dom";
import UserChangeEmailetch from "../../services/user/UserChangeEmailFetch";

interface UserSettingsFormProps {
  UserData: UserDataResult['data'];
  onAvatarChange: () => void;
}

const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ UserData, onAvatarChange }) => {

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const [emailButtonEnabled, setEmailButtonEnabled] = useState(true);
  
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    if(UserData !== undefined && selectedFile !== null)
     await UserAvatarUploadFetch(UserData?.userId, selectedFile)
     onAvatarChange();
  };


    const handleEmailChange = async () => {

      if(UserData?.id)
      {
        const response = await UserChangeEmailetch(UserData?.id, newEmail)

        if(response.success)
        {
          console.log("EMAIL CHANGED SUCCESSFULLY!");
          onAvatarChange();
         
        }
      }
      
    }

    useEffect(() => {
      
      if(UserData?.email === currentEmail)
      {
        setEmailButtonEnabled(false);
      }
      else
      {
        setEmailButtonEnabled(true);
      }

    }, [currentEmail, handleEmailChange])





    return (
        <div className="container mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-1 items-center lg:gap-12 lg:space-x-5">
          <Card>
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Email:</p>
        </CardHeader>
        <CardBody>    
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input maxLength={30} key="currentEmailField" type="email" label="Current Email" placeholder="Enter your current email" onChange={(e) => setCurrentEmail(e.target.value)} />
        <Input maxLength={30} type="email" label="New Email" placeholder="Enter your new email" onChange={(e) => setNewEmail(e.target.value)}/>
         </div>
          <Button className="my-2" isDisabled={emailButtonEnabled} onClick={() => handleEmailChange()} onTouchStart={() => handleEmailChange()}>Update Email</Button>
          {emailButtonEnabled && currentEmail.length > 0 && <Card><CardBody className="text-center">Current Email is not correct!</CardBody></Card>}
        </CardBody>
      </Card>

     


      <Card>
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Password:</p>
        </CardHeader>
        <CardBody>    
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="password" label="Current Password" placeholder="Enter your current password" />
        <Input type="password" label="New Password" placeholder="Enter your new password" />
        <Input type="password" label="Retype New Password" placeholder="Retype your new password" />
         </div>
          <Button className="my-2" >Update Password</Button>
        
        </CardBody>
      </Card>


      <Card>
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Profile Picture:</p>
        </CardHeader>
        <CardBody>    
        <input className="flex justify-center text-center" type="file" onChange={handleFileChange} accept="image/*" />
          <Button className="my-2" onClick={handleUpload} onTouchStart={handleUpload}>Upload Avatar</Button>
        
        </CardBody>
      </Card>
      </div>
    );

};

export default UserSettingsForm;