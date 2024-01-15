
export interface LoginFormProps{
    onBackButtonClick: () => void;
    onLoginClick: (email: string, password: string) => void;
    onWrongCredentials: boolean;
}

export interface RegisterFormProps{
    onBackButtonClick: () => void;
    onRegisterClick: (name: string, username:string, email:string, password:string) => void;
    registerResult: boolean;
}

export interface UserLoggedInLayoutProps {
    UserData: UserDataResult['data'];
  }



export interface LoginResponse {
    success: boolean,
    jwt?:string;
    errorMessage?: string
}

export interface RegisterResponse {
    success: boolean,
    name?: string,
    username?: string,
    email?: string
    errorMessage?: string
}


export interface DataResponse {
    
    id: bigint;
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
data?: DataResponse;
errorMessage?: string;
}

export interface UserDuplicateResponse {
    duplicate: boolean;
    username?: string;
    email?: string;
    erorrMessage?: string;
}
