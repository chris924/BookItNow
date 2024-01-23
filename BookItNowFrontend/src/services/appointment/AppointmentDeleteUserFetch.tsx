import * as apiURL from "../../lib/constants/apiURL";
import { CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export interface AppointmentDeleteUser {
success: boolean;
errorMessage?: string;
}

export default async function AppointmentDeleteuserFetch(appointmentId: number): Promise<AppointmentDeleteUser> {

    const authToken  = await GetCookie("authToken");


    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.APPOINTMENT_DELETE_USER_FROM_APPOINTMENT_ENDPOINT}${appointmentId}`, {
            method: "PUT",
            headers: headers,
        });

        if (response.ok) {
            return { success: true, };
        } else {
            return { success: false, errorMessage: "Failed to fetch delete user from appointment." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while deleting user from appointment." };
    }
}