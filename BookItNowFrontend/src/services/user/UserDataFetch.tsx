import * as apiURL from "../../lib/constants/apiURL";
import { UserDataResponse, UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";



export default async function UserDataFetch(): Promise<UserDataResult> {

    const authToken  = await GetCookie("authToken");
   
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.USER_DATA_ENDPOINT}`, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const data: UserDataResponse = await response.json();
            console.log("XDDDDDDDDDDDDDDD:", data);
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch user data." };
        }
    } catch (err) {
        console.error("ERROR:", err);
        return { success: false, errorMessage: "An error occurred while fetching user data." };
    }
}
