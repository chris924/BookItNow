import { BASE_URL, USER_INPUT_DUPLICATE_ENDPOINT } from "../../lib/constants/apiURL";
import { UserDuplicateResponse } from "../../lib/constants/interfaces/userInterface/UserInterfaces";





export default async function UserInputDuplicateFetch(username?: string, email?: string): Promise<UserDuplicateResponse>
{
    const duplicateData = {
        "username": username,
        "email": email
    }

        try{
                console.log("SENDING", duplicateData);
            const response = await fetch(`${BASE_URL}${USER_INPUT_DUPLICATE_ENDPOINT}`,{
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
                const data: UserDuplicateResponse = await response.json();
                return {duplicate: true, username: data.username, email: data.email};
            }


        }catch(err)
        {
            console.error(err);

            return { duplicate: true, erorrMessage: "An error occured during UserInputDuplicateFetch"}
        }



}