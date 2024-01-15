import * as apiURL from "../../lib/constants/apiURL";
import { DataResponse, UserDataResult } from "../../lib/constants/interfaces/userInterface/UserInterfaces";
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
            const data: DataResponse = await response.json();
            console.log(data);
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch user data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching user data." };
    }
}
