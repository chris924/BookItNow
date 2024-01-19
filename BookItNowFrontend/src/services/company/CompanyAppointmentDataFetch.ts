import * as apiURL from "../../lib/constants/apiURL";
import { CompanyAppointmentData, CompanyAppointmentFetchResponse, CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export default async function CompanyAppointmentDataFetch(id: number): Promise<CompanyAppointmentFetchResponse> {

    const authToken  = await GetCookie("authToken");
    
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_APPOINTMENT_DATA_BY_COMPANY_ID_ENDPOINT}${id}`, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const data: CompanyAppointmentData[] = await response.json();
            console.log("DATA IN COMPANY APPOINTMENTS DATA a FETCH:", data);
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch company data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching company data." };
    }
}