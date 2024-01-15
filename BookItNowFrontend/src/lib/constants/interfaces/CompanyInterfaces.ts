

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