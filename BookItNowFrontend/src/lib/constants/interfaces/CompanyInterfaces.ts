

export interface CompanyLoginResponse {
    success: boolean,
    jwt?:string;
    errorMessage?: string
}

export interface CompanyLoginFormProps{
    onBackButtonClick: () => void;
    onLoginClick: (email: string, password: string) => void;
    onWrongCredentials: boolean;
}


export interface CompanyLoggedInLayoutProps {
    CompanyData: CompanyDataResult['data'];
    
  }

  export interface CompanyAppointmentCreateProps {
    CompanyData: CompanyDataResult['data'];
    CompanyAppointments: CompanyAppointmentFetchResponse['data'];
  }



export interface CompanyDataResponse {
    
    id: number;
    companyName: string;
    email: string;
    description: string;
    createdAt: Date;
    serviceName: string;
    serviceDescription: string;
    authorities: {
        id: number;
        authority: string;
        roleId: number;
    }[];
    enabled: boolean;
    username: string;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    

}

export interface CompanyDataResult {
success: boolean;
data?: CompanyDataResponse;
errorMessage?: string;
}

export interface CompanyRegisterResponse {
    success: boolean;
    companyName?: string;
    email?: string;
    errorMessage?: string;
}

export interface CompanyRegisterFormProps{
    onBackButtonClick: () => void;
    onRegisterClick: (companyName: string, email:string, password:string, appServiceName:string, appServiceDescription:string, description:string) => void;
    registerResult: boolean;
}

export interface CompanyDuplicateResponse {
    duplicate: boolean;
    companyName?: string;
    email?: string;
    erorrMessage?: string;
}


export interface CompanyCreateAppointmentResponseData {
    appointmentId: number;
    dateAndTime: Date;
}


export interface CompanyCreateAppointmentResponse {
    success: boolean,
    data?: CompanyCreateAppointmentResponseData
    errorMessage?: string;
}

export interface CompanyAppointmentData {
    appointmentId: number;
    companyId: number;
    dateAndTime: Date;
  }
  
  export interface CompanyAppointmentFetchResponse {
    success: boolean;
    data?: CompanyAppointmentData[];
    errorMessage?: string;
  }

  export interface CompanyAppointmentDeleteFetchResult {
    success: boolean;
    errorMessage?: string;
  }