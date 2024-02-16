import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import CompanyAvatarUploadFetch from "../../services/company/CompanyAvatarUploadFetch";
import { CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import CompanyChangeEmailFetch from "../../services/company/CompanyChangeEmailFetch";
import CompanyChangePasswordFetch from "../../services/company/CompanyChangePasswordFetch";

interface CompanySettingsFormProps {
  companyData: CompanyDataResult['data'];
  onAvatarChange: () => void;
}

const CompanySettingsForm: React.FC<CompanySettingsFormProps> = ({ companyData, onAvatarChange }) => {

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



  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handleUpload = async () => {
    if(companyData !== undefined && selectedFile !== null)
     await CompanyAvatarUploadFetch(companyData.id, selectedFile)
     onAvatarChange();
     setAvatarChangeResult(true);
     setTimeout(() => setAvatarChangeResult(false), 2000);
  };

 
  const handleEmailChange = async () => {

    if(companyData?.id)
    {
      const response = await CompanyChangeEmailFetch(companyData?.id, newEmail);

      if(response.success)
      {
        setEmailChangeResult(true);
        setTimeout(() => setEmailChangeResult(false), 2000);
      }
    }
    
  }

  const handlePasswordChange = async () => {

    if(companyData?.id)
    {
      const response = await CompanyChangePasswordFetch(companyData?.id, newPassword);

      if(response.success)
      {
        
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

    if(selectedFile !== null)
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
      {emailButtonEnabled && newEmail.length > 0 && newReEmail.length > 0 && <Card><CardBody className="text-center">The two email is not the same</CardBody></Card>}
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
      {passwordButtonEnabled && newPassword.length > 0 && reNewPassword.length > 0 && <Card><CardBody className="text-center">The two password is not the same</CardBody></Card>}
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
    </CardBody>
  </Card>
  </div>
  </div>
);


  };


export default CompanySettingsForm;