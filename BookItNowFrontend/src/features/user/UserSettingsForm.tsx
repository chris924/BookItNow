import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import UserAvatarUploadFetch from "../../services/user/UserAvatarUploadFetch";
import UseNavigation from "../../hooks/UseNavigation";
import { useNavigate } from "react-router-dom";

interface UserSettingsFormProps {
  UserData: UserDataResult['data'];
  onAvatarChange: () => void;
}

const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ UserData, onAvatarChange }) => {

  
  const navigate = useNavigate();

  const AvatarUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
      if(UserData !== undefined && selectedFile !== null)
       await UserAvatarUploadFetch(UserData?.userId, selectedFile)
       onAvatarChange();
    };

    return (
        <div className="container mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-1 items-center lg:gap-12 lg:space-x-5">
          <Card>
        <CardHeader className="flex justify-center">
          <p className="text-center">Change Your Email:</p>
        </CardHeader>
        <CardBody>    
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="email" label="Current Email" placeholder="Enter your current email" />
        <Input type="email" label="New Email" placeholder="Enter your new email" />
         </div>
          <Button className="my-2" >Update Email</Button>
        
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

  return <AvatarUpload />;
};

export default UserSettingsForm;