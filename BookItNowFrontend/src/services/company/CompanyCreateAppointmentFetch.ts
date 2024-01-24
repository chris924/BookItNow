import * as apiURL from "../../lib/constants/apiURL";
import { CompanyCreateAppointmentResponse, CompanyCreateAppointmentResponseData, CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export default async function CompanyCreateAppointmentFetch(id: number, dateAndTime: Date): Promise<CompanyCreateAppointmentResponse> {

    const authToken  = await GetCookie("authToken");

    const appointmentForm = {
        "companyId": id,
        "dateAndTime": dateAndTime
    };

    
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_CREATE_APPOINTMENT_ENDPOINT}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(appointmentForm)
        });

        if (response.ok) {
            const data: CompanyCreateAppointmentResponseData = await response.json();
            
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch company data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching company data." };
    }
}