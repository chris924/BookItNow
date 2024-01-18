import * as apiURL from "../../lib/constants/apiURL";
import { CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export default async function CompanyDataFetch(endpoint: string): Promise<CompanyDataResult> {

    const authToken  = await GetCookie("authToken");
    
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${endpoint}`, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const data: CompanyDataResponse = await response.json();
            console.log("DATA IN COMPANY DATA FETCH:", data);
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch company data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching company data." };
    }
}