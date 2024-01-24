import { CompanyAppointmentData, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";

export interface CompanyMyAppointmentsFormProps {
    companyAppointments?: CompanyAppointmentData[];
    onAppointmentCancel: () => void;
}

export default function CompanyMyAppointmentsForm({companyAppointments, onAppointmentCancel}: CompanyMyAppointmentsFormProps)
{

    console.log("COMPANY APPOINTMENTS:", companyAppointments);

    return(
        <div></div>
    )
}