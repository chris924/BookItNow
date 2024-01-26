import { ScrollShadow, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { CompanyAppointmentData} from "../../lib/constants/interfaces/CompanyInterfaces";


export interface CompanyMyAppointmentsFormProps {
    companyAppointments?: CompanyAppointmentData[];
}

export default function CompanyAppointmentHistoryForm({companyAppointments}: CompanyMyAppointmentsFormProps)
{

    console.log("COMPANY APPOINTMENTS:", companyAppointments);

    const currentDate = new Date();

    if (!companyAppointments) {
      return null;
    }
  
    const formatDateTime = (dateTimeString: Date): string => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      return new Date(dateTimeString).toLocaleString(undefined, options);
    };
  
    const sortAppointments = (appointments: CompanyAppointmentData[]) => {
      return appointments.sort((a: CompanyAppointmentData, b: CompanyAppointmentData) => new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime());
    };
  
    const filteredAppointments = sortAppointments(companyAppointments).filter(
        (appointment: any) => {
         
         const filtered =  new Date(appointment.dateAndTime) <= currentDate && appointment.userId !== null;
       
         return filtered;
        }
      );
  
   
    return (
      <>
      <ScrollShadow hideScrollBar className="max-h-screen">
      <div className="mb-12 p-8 space-y-6" >
        {filteredAppointments.map((appointment: CompanyAppointmentData, index: number) => {
          const animationClass = index % 2 === 0 ? 'animate__animated animate__backInLeft' : 'animate__animated animate__backInRight';
  
          return (
            <div key={appointment.appointmentId} className={` flex flex-row justify-center ${animationClass}`}>
              <Card className=" py-4 mx-2">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
                  <p className="text-tiny uppercase font-bold">{appointment.userName}</p>
                  <small className="text-default-500">{appointment.userEmail}</small>
                  <h4 className="font-bold text-large">{formatDateTime(appointment.dateAndTime)}</h4>
                </CardHeader>
                <CardBody className=" overflow-visible py-2">
                  <Image alt="Card background" className="object-cover rounded-xl" src="/images/hero-card-complete.jpeg" width={270} />
                </CardBody>
              </Card>
            </div>
          );
        })}
        </div>
        </ScrollShadow>
      </>
    );
}