import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";

interface UserLoggedInFormProps{
    
    UserData: UserDataResult['data'];

}


export default function UserLoggedInForm({UserData}: UserLoggedInFormProps): JSX.Element
{



    return(
        <div className="container mx-auto px-6 py-20 text-4xl">
             <div className="py-6">Welcome back, {UserData?.name}</div>
            <div className="py-3">You currently have {UserData?.appointments.length} active appointments,</div>
           
         </div>
    )

}