import * as apiURL from "../../lib/constants/apiURL";
import { CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";

export interface AppointmentGetAllData {
    id: number;
    company: {
        id: number;
        companyName: string;
        email: string;
        description: string;
        createdAt: EpochTimeStamp;
        serviceName: string;
        serviceDescription: string;
        authorities: Object[];
        enabled: boolean;
        accountNonExpired: boolean;
        credentialsNonExpired: boolean;
        username: string;
        accountNonLocked: boolean;
    }
    dateAndTime: Date;
}


export interface AppointmentGetAllResult {
success: boolean;
data?: AppointmentGetAllData[];
errorMessage?: string;
}

export default async function AppointmentGetAllFetch(): Promise<AppointmentGetAllResult> {

    const authToken  = await GetCookie("authToken");

    

    
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.APPOINTMENT_GET_ALL_APPOINTMENT_ENDPOINT}`, {
            method: "GET",
            headers: headers,
           
        });

        if (response.ok) {
            const data: AppointmentGetAllData[] = await response.json();
            return { success: true, data: data};
        } else {
            return { success: false, errorMessage: "Failed to fetch update appointment with user." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching appointment update." };
    }
}