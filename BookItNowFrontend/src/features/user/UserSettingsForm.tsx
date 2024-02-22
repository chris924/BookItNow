import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import UserAvatarUploadFetch from "../../services/user/UserAvatarUploadFetch";
import UseNavigation from "../../hooks/UseNavigation";
import { useNavigate } from "react-router-dom";
import UserChangeEmailetch from "../../services/user/UserChangeEmailFetch";
import UserChangePasswordfetch from "../../services/user/UserChangePasswordFetch";

interface UserSettingsFormProps {
  UserData: UserDataResult['data'];
  onDataChange: () => void;
}

const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ UserData, onDataChange }) => {

  const [newEmail, setNewEmail] = useState("");
  const [newReEmail, setReNewEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");


  const [emailButtonEnabled, setEmailButtonEnabled] = useState(true);
  const [passwordButtonEnabled, setPasswordButtonEnabled] = useState(true);
  const [avatarButtonEnabled, setAvatarButtonEnabled] = useState(true);

  const [emailChangeResult, setEmailChangeResult] = useState(false);
  const [passwordChangeResult, setPasswordChangeResult] = useState(false);
  const [avatarChangeResult,  setAvatarChangeResult] = useState(false);

  const [avatarSizeTooBig, setAvatarSizeTooBig] = useState(false);
  
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
  
    const maxSizeInBytes = 1024 * 1024; // 1 MB 
  
      
    const file = event.target.files[0] as File;

    if (file.size > maxSizeInBytes) {
      setAvatarSizeTooBig(true);
    }
    else{
      setAvatarSizeTooBig(false);
      setSelectedFile(event.target.files[0]);
    }



  };


  const handleUpload = async () => {
    if (UserData !== undefined && selectedFile !== null && avatarSizeTooBig === false) {
     
        await UserAvatarUploadFetch(UserData?.userId, selectedFile);
        onDataChange();
        setAvatarChangeResult(true);
        setTimeout(() => setAvatarChangeResult(false), 2000);
      }
  
       
    
  };


    const handleEmailChange = async () => {

      if(UserData?.id)
      {
        const response = await UserChangeEmailetch(UserData?.id, newEmail);

        if(response.success)
        {
          onDataChange();
          setEmailChangeResult(true);
          setTimeout(() => setEmailChangeResult(false), 2000);
        }
      }
      
    }

    const handlePasswordChange = async () => {

      if(UserData?.id)
      {
        const response = await UserChangePasswordfetch(UserData.id, newPassword);

        if(response.success)
        {
          onDataChange();
          setPasswordChangeResult(true);
          setTimeout(() => setPasswordChangeResult(false), 2000)
        }
      }

    }



    useEffect(() => {
      
      if(newEmail !== newReEmail || newEmail.length === 0 || newReEmail.length === 0)
      {
        setEmailButtonEnabled(true);
      }
      else
      {
        setEmailButtonEnabled(false);
      }

      if(newPassword !== reNewPassword || newPassword.length === 0 || reNewPassword.length === 0)
      {
        setPasswordButtonEnabled(true);
      }
      else
      {
        setPasswordButtonEnabled(false);
      }

      if(selectedFile !== null && avatarSizeTooBig === false)
      {
        setAvatarButtonEnabled(false);
      }
      else
      {
        setAvatarButtonEnabled(true);
      }
      

    }, [newEmail, newReEmail, handleEmailChange, newPassword, reNewPassword, handleFileChange])


    return (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-1 items-center lg:gap-12 lg:space-x-5">
        <div className=" mx-auto">

        <Card className="my-5">
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Email:</p>
        </CardHeader>
        <CardBody>    
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input maxLength={30} key="currentEmailField" type="email" label="New Email" placeholder="Enter your new email" onChange={(e) => setNewEmail(e.target.value)} />
        <Input maxLength={30} type="email" label="New Email" placeholder="Retype your new email" onChange={(e) => setReNewEmail(e.target.value)}/>
         </div>
          <Button className="my-2" isDisabled={emailButtonEnabled} onClick={() => handleEmailChange()} onTouchStart={() => handleEmailChange()}>Update Email</Button>
          {emailButtonEnabled && newEmail.length > 0 && newReEmail.length > 0 && <Card><CardBody className="text-center">The two email is not the same!</CardBody></Card>}
          {emailChangeResult && <Button color="success">Successfully changed Email!</Button>}
        </CardBody>
      </Card>

     


      <Card className="my-5">
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Password:</p>
        </CardHeader>
        <CardBody>    
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input maxLength={30} type="password" label="New Password" placeholder="Enter your new password" onChange={(e) => setNewPassword(e.target.value)} />
        <Input maxLength={30} type="password" label="New Password" placeholder="Retype your new password" onChange={(e) => setReNewPassword(e.target.value)} />
         </div>
          <Button className="my-2" isDisabled={passwordButtonEnabled}  onClick={() => handlePasswordChange()} onTouchStart={() => handlePasswordChange()}>Update Password</Button>
          {passwordButtonEnabled && newPassword.length > 0 && reNewPassword.length > 0 && <Card><CardBody className="text-center">The two password is not the same!</CardBody></Card>}
          {passwordChangeResult && <Button color="success">Successfully changed Password!</Button>}
        </CardBody>
      </Card>

     
      <Card className="my-5">
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Profile Picture:</p>
        </CardHeader>
        <CardBody>    
        <input className="flex justify-center text-center" type="file" onChange={handleFileChange} accept="image/*" />
          <Button className="my-2" onClick={handleUpload} onTouchStart={handleUpload} isDisabled={avatarButtonEnabled}>Upload Avatar</Button>
          {avatarChangeResult && <Button color="success">Successfully changed Avatar!</Button>}
          {avatarButtonEnabled && <Button color="danger">Avatar size too big!</Button>}
        </CardBody>
      </Card>
      </div>
      </div>
    );

};

export default UserSettingsForm;