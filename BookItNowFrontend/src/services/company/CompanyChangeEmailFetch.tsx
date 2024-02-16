import * as apiURL from "../../lib/constants/apiURL"
import { UserLoginResponse } from "../../lib/constants/interfaces/UserInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";

interface CompanyChangeEmailResponse{
    success: boolean;
    errorMessage?: string;
}


export default async function CompanyChangeEmailFetch(companyId:Number, newEmail:string): Promise<CompanyChangeEmailResponse>
{
    const authToken  = await GetCookie("authToken");
   
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken.jwt}`,
    });

    const emailChangeData = {
        companyId: companyId, 
        newEmail: newEmail,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_CHANGE_EMAIL_ENDPOINT}`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(emailChangeData)
        });
        
        if(response.ok)
        {
                    console.log("Successfully changed email!");
                    return {success: true };
               
        }else {
        return {success: false, errorMessage: "Failed to change email"};
        }

   }catch(err)
   {
    console.error(err);
    return {success: false, errorMessage: "An error occured while changing email"};
   }


}