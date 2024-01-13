import { UserDataResult } from "../../../services/userData/UserDataFetch";



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

export interface GetCookieInterface{
    success: boolean;
    jwt?: string;
    errorMessage?: string;

  }

export interface DecodeJwtInterface{
    success: boolean;
    decoded?: {
        exp?: number;
    };
    errorMessage?: string;
}