

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



export interface CompanyDataResponse {
    
    id: bigint;
    companyName: string;
    email: string;
    description: string;
    createdAt: Date;
    services: any[];
    authorities: {
        id: number;
        authority: string;
        roleId: number;
    }[];
    username: string;
    userId: number;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;

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
