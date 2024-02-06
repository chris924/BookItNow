import { useEffect, useState } from "react"
import { CompanyAppointmentData, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces"
import CompanyAppointmentDataFetch from "../../services/company/CompanyAppointmentDataFetch";


interface CompanyLoggedInFormProps
{
    CompanyData: CompanyDataResult['data'];
    companyAppointments: CompanyAppointmentData[];
    bookedAppointments: CompanyAppointmentData[];
}



export default function CompanyLoggedInForm({CompanyData, companyAppointments, bookedAppointments}: CompanyLoggedInFormProps): JSX.Element
{
  

    return (
        <>
          <div className="container mx-auto px-6 py-20 text-4xl">
             <div className="py-6">Welcome back, {CompanyData?.companyName}</div>
            <div className="py-3">You currently have {companyAppointments?.length} created appointments,</div>
            <div>from which {bookedAppointments?.length} is booked!</div>
         </div>
        </>
      );




}