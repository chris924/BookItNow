import * as apiURL from "../../lib/constants/apiURL";
import { CompanyDataResponse, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export interface AppointmentUpdate {
success: boolean;
errorMessage?: string;
}

export default async function AppointmentAddUserFetch(appointmentId: number, userId: number): Promise<AppointmentUpdate> {

    const authToken  = await GetCookie("authToken");

    const updateBody = {

        appointmentId: appointmentId,
        userId: userId,
    }

    
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.APPOINTMENT_ADD_USER_TO_APPOINTMENT_ENDPOINT}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(updateBody)
        });

        if (response.ok) {
            return { success: true, };
        } else {
            return { success: false, errorMessage: "Failed to fetch update appointment with user." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching appointment update." };
    }
}