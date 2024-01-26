import { BASE_URL, COMPANY_UPDATE_AVATAR_ENDPOINT } from "../../lib/constants/apiURL";
import { GetCookie } from "../../utils/cookies/SetCookie";

export interface CompanyAvatarInterface{
    success: boolean;
    errorMessage?: string;
}




export default async function CompanyAvatarUploadFetch(companyId: number, avatar: Blob)
{

    const authToken  = await GetCookie("authToken");
   
    const headers = new Headers({
        "Authorization": `Bearer ${authToken.jwt}`,
    });
    
        const formData = new FormData();
        formData.append("avatar", avatar);
    


    try{
        
        const response = await fetch(`${BASE_URL}${COMPANY_UPDATE_AVATAR_ENDPOINT}${companyId}`,{
            method: "POST",
            headers: headers,
            body: formData
        })

        if(response.ok)
        {
            console.log("AVATAR UPDATED")
        }
        else
        {
            console.log("ERROR DURING AVATAR UPDATE")
        }

    }catch(err)
    {
        console.error(err);
    }
        
}