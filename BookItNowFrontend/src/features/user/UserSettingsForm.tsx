import React, { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
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
        <div className="flex justify-center">
      <Card>
        <CardBody>
        <input type="file" onChange={handleFileChange} accept="image/*" />
          <Button onClick={handleUpload} onTouchStart={handleUpload}>Upload Avatar</Button>
          
        </CardBody>
      </Card>
      </div>
    );
  };

  return <AvatarUpload />;
};

export default UserSettingsForm;