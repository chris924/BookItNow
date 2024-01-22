import * as apiURL from "../../lib/constants/apiURL";
import { CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";

export interface CompanyAllDataResponse {
    
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

export interface CompanyAllDataResult {
success: boolean;
data?: CompanyAllDataResponse[];
errorMessage?: string;
}

export default async function CompanyGetAllCompanyDataFetch(): Promise<CompanyAllDataResult> {

    const authToken  = await GetCookie("authToken");
    
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.USER_COMPANY_DATA_ENDPOINT}`, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const data: CompanyAllDataResponse[] = await response.json();
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch company data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching company data." };
    }
}