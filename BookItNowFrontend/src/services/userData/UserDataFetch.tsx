import * as apiURL from "../../lib/constants/apiURL";
import { GetCookie } from "../../utils/cookies/SetCookie";

export interface DataResponse {
    
        id: bigint;
        name: string;
        username: string;
        email: string;
        createdAt: Date;
        appointments: any[];
        authorities: {
            id: number;
            authority: string;
            roleId: number;
        }[];
        enabled: boolean;
        userId: number;
        accountNonExpired: boolean;
        credentialsNonExpired: boolean;
        accountNonLocked: boolean;
    
}

export interface UserDataResult {
    success: boolean;
    data?: DataResponse;
    errorMessage?: string;
}

export default async function UserDataFetch(): Promise<UserDataResult> {
    const authToken = GetCookie("authToken");
    const headers = new Headers({
        "Authorization": `Bearer ${authToken}`,
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
