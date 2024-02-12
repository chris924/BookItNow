import { GITHUB_PROFILE_ENDPOINT } from "../lib/constants/apiURL";


export interface GitHubFetchResponse{
    success: boolean;
    data?: GitHubData;
    errorMessage?: string;
}



export interface GitHubData{
    name: string;
    login: string;
    avatar_url: string;
    followers: number;
    following: number;
    html_url: string;
    
}




export default async function GitHubFetch(): Promise<GitHubFetchResponse> {

    
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    try {
        const response = await fetch(`${GITHUB_PROFILE_ENDPOINT}`, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const data: GitHubData = await response.json();
            console.log("DATA:", data);
            return { success: true, data };
        } else {
            return { success: false, errorMessage: "Failed to fetch github user data." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errorMessage: "An error occurred while fetching github user data." };
    }
}