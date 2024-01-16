import * as apiURL from "../../lib/constants/apiURL";
import { CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export default async function CompanyDataFetch(): Promise<CompanyDataResult> {

    const authToken  = await GetCookie("authToken");
    console.log("AUTH TOKEN IN COMPANY DATA FETCH", authToken);
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_DATA_ENDPOINT}`, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const data: CompanyDataResponse = await response.json();
            console.log("DATA IN COMPANY DATA FETCH:", data);
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch user data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching user data." };
    }
}