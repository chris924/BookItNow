

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