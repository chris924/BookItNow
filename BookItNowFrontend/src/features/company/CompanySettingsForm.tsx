import React, { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import CompanyAvatarUploadFetch from "../../services/company/CompanyAvatarUploadFetch";
import { CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";

interface CompanySettingsFormProps {
  companyData: CompanyDataResult['data'];
  onAvatarChange: () => void;
}

const CompanySettingsForm: React.FC<CompanySettingsFormProps> = ({ companyData, onAvatarChange }) => {

  
  const navigate = useNavigate();

  const AvatarUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
      if(companyData !== undefined && selectedFile !== null)
       await CompanyAvatarUploadFetch(companyData.id, selectedFile)
       onAvatarChange();
    };

    return (
        <div className="flex justify-center">
      <Card>
        <CardBody>
        <input type="file" onChange={handleFileChange} accept="image/*" />
          <Button onClick={handleUpload}>Upload Avatar</Button>
          
        </CardBody>
      </Card>
      </div>
    );
  };

  return <AvatarUpload />;
};

export default CompanySettingsForm;