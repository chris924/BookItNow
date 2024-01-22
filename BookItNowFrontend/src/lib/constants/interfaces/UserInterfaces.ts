
export interface UserLoginFormProps{
    onBackButtonClick: () => void;
    onLoginClick: (email: string, password: string) => void;
    onWrongCredentials: boolean;
}

export interface UserRegisterFormProps{
    onBackButtonClick: () => void;
    onRegisterClick: (name: string, username:string, email:string, password:string) => void;
    registerResult: boolean;
}

export interface UserLoggedInLayoutProps {
    UserData: UserDataResult['data'];
  }



export interface UserLoginResponse {
    success: boolean,
    jwt?:string;
    errorMessage?: string
}

export interface UserRegisterResponse {
    success: boolean,
    name?: string,
    username?: string,
    email?: string
    errorMessage?: string
}


export interface UserDataResponse {
    
    id: number;
    name: string;
    username: string;
    email: string;
    createdAt: Date;
    appointments: any[];
    authorities: {
        id: number;
        authority: string;
        roleId: number;
    }[];
    enabled: boolean;
    userId: number;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;

}

export interface UserDataResult {
success: boolean;
data?: UserDataResponse;
errorMessage?: string;
}

export interface UserDuplicateResponse {
    duplicate: boolean;
    username?: string;
    email?: string;
    erorrMessage?: string;
}
