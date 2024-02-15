import * as apiURL from "../../lib/constants/apiURL"
import { UserLoginResponse } from "../../lib/constants/interfaces/UserInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";

interface UserChangeEmailResponse{
    success: boolean;
    errorMessage?: string;
}


export default async function UserChangeEmailtch(userId:Number, newEmail:string): Promise<UserChangeEmailResponse>
{
    const authToken  = await GetCookie("authToken");
   
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken.jwt}`,
    });

    const emailChangeData = {
        userId: userId, 
        newEmail: newEmail,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.USER_CHANGE_EMAIL_ENDPOINT}`,{
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