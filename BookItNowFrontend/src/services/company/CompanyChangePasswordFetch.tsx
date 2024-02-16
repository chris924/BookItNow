import * as apiURL from "../../lib/constants/apiURL"
import { UserLoginResponse } from "../../lib/constants/interfaces/UserInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";

interface CompanyChangePasswordResponse{
    success: boolean;
    errorMessage?: string;
}


export default async function CompanyChangePasswordFetch(companyId:Number, newPassword:string): Promise<CompanyChangePasswordResponse>
{
    const authToken  = await GetCookie("authToken");
   
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken.jwt}`,
    });

    const passwordChangeData = {
        companyId: companyId, 
        newPassword: newPassword,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_CHANGE_PASSWORD_ENDPOINT}`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(passwordChangeData)
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