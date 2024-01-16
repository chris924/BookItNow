import { BASE_URL, COMPANY_INPUT_DUPLICATE_ENDPOINT } from "../../lib/constants/apiURL";
import { CompanyDuplicateResponse } from "../../lib/constants/interfaces/CompanyInterfaces";


export default async function CompanyInputDuplicateFetch(companyName?: string, email?: string): Promise<CompanyDuplicateResponse>
{
    const duplicateData = {
        "companyName": companyName,
        "email": email
    }

        try{
                console.log("SENDING", duplicateData);
            const response = await fetch(`${BASE_URL}${COMPANY_INPUT_DUPLICATE_ENDPOINT}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(duplicateData)
            });

            if(response.ok)
            {
                return {duplicate: false}
            }
            else
            {
                const data: CompanyDuplicateResponse = await response.json();
                return {duplicate: true, companyName: data.companyName, email: data.email};
            }

        }catch(err)
        {
            console.error(err);

            return { duplicate: true, erorrMessage: "An error occured during UserInputDuplicateFetch"}
        }



}