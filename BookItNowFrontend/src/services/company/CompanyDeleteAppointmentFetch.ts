import * as apiURL from "../../lib/constants/apiURL";
import {CompanyAppointmentDeleteFetchResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";


export default async function CompanyDeleteAppointmentFetch(id: number): Promise<CompanyAppointmentDeleteFetchResult>
{

    const authToken  = await GetCookie("authToken");

    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });



    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_DELETE_APPOINTEMNT_ENDPOINT}${id}`, {
            method: "DELETE",
            headers: headers,
        });

        if (response.ok) {
            console.log("COMPANY APPOINTMENT DELETED ID:", id);
            return { success: true };
        } else {
            return { success: false, errorMessage: "Failed to fetch company data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching company data." };
    }
}