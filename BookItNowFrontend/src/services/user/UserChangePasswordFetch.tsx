import * as apiURL from "../../lib/constants/apiURL"
import { UserLoginResponse } from "../../lib/constants/interfaces/UserInterfaces";
import { GetCookie } from "../../utils/cookies/SetCookie";

interface UserChangePasswordFetchResponse{
    success: boolean;
    errorMessage?: string;
}


export default async function UserChangePasswordfetch(userId:Number, newPassword:string): Promise<UserChangePasswordFetchResponse>
{
    const authToken  = await GetCookie("authToken");
   
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken.jwt}`,
    });

    const passwordChangeData = {
        userId: userId, 
        newEmail: newPassword,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.USER_CHANGE_EMAIL_ENDPOINT}`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(passwordChangeData)
        });
        
        if(response.ok)
        {
                    console.log("Successfully changed password!");
                    return {success: true };
               
        }else {
        return {success: false, errorMessage: "Failed to change password!"};
        }

   }catch(err)
   {
    console.error(err);
    return {success: false, errorMessage: "An error occured while changing password"};
   }


}