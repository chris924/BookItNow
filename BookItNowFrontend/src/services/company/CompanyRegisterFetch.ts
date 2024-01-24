import * as apiURL from "../../lib/constants/apiURL"
import { CompanyRegisterResponse } from "../../lib/constants/interfaces/CompanyInterfaces";





export default async function CompanyRegisterFetch(companyName: string, email: string, password: string, appServiceName:string, appServiceDescription:string, description: string): Promise<CompanyRegisterResponse>
{
    const RegisterData = {
        companyName: companyName,
        email: email,
        password: password,
        appServiceName: appServiceName,
        appServiceDescription: appServiceDescription,
        description: description,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.COMPANY_REGISTER_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RegisterData)
        });

        if(response.ok)
        {
          


            const data: CompanyRegisterResponse = await response.json();
           
            return { success: true, companyName: data.companyName, email: data.email}
            
        }
        else{
            return {success: false, errorMessage: "Response is not OK during user registration"};
        }

    }catch(err)
    {
        return {success: false, errorMessage: "An error occured during user registration"};
    }

}