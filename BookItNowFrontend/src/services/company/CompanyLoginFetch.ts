import * as apiURL from "../../lib/constants/apiURL"
import { CompanyLoginResponse } from "../../lib/constants/interfaces/CompanyInterfaces";




export default async function CompanyLoginFetch(email:string, password:string): Promise<CompanyLoginResponse>
{

    const LoginData = {
        email: email, 
        password: password,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_LOGIN_ENDPONT}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData)
        });
        
        if(response.ok)
        {
                const data: CompanyLoginResponse = await response.json();
                console.log("DATA IN FETCH RESPONSE:", data);
                    const token = data.jwt;
                    
                    return {success: true, jwt: token};
               
        }else {
        
        return {success: false, errorMessage: "Failed to fetch company login."};
        }

   }catch(err)
   {
    console.error(err);
    return {success: false, errorMessage: "An error occured while fetching company login"};
   }


}