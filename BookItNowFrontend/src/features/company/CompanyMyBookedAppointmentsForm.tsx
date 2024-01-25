import { Button } from "@nextui-org/button";
import { ScrollShadow, Card, CardHeader, CardBody, Popover, PopoverTrigger, PopoverContent, Image } from "@nextui-org/react";
import { CompanyAppointmentData, CompanyDataResult } from "../../lib/constants/interfaces/CompanyInterfaces";
import AppointmentDeleteuserFetch from "../../services/appointment/AppointmentDeleteUserFetch";


export interface CompanyMyAppointmentsFormProps {
    companyAppointments?: CompanyAppointmentData[];
    onAppointmentCancel: () => void;
}

export default function CompanyMyBookedAppointmentsForm({companyAppointments, onAppointmentCancel}: CompanyMyAppointmentsFormProps)
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
  
    const handleCancelClick = async (appointmentId: number) => {
      const response = await AppointmentDeleteuserFetch(appointmentId);
      if (response.success) {
        onAppointmentCancel();
      }
    };
  
    const sortAppointments = (appointments: CompanyAppointmentData[]) => {
      return appointments.sort((a: CompanyAppointmentData, b: CompanyAppointmentData) => new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime());
    };
  
    const appointmentsWithCancel = sortAppointments(companyAppointments).filter(
        (appointment: any) => {
         
         const filtered =  new Date(appointment.dateAndTime) >= currentDate && appointment.userId !== null;
       
         return filtered;
        }
      );
  
   
    return (
      <>
      <ScrollShadow hideScrollBar className="max-h-screen">
      <div className="mb-12 p-8 space-y-6" >
        {appointmentsWithCancel.map((appointment: CompanyAppointmentData, index: number) => {
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
                  <Popover backdrop="blur">
                    <PopoverTrigger> 
                <Button color="danger">
                  Delete User
                </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                  <div className="flex flex-col items-center px-1 py-2">
                    <h3 className="text-small font-bold mb-4">Are you sure to delete User from the appointment?</h3>
                  <Button color="danger" onClick={() => handleCancelClick(appointment.appointmentId)}>
                    Delete User from Appointment
                  </Button>
                  </div>
                  </PopoverContent>
                  </Popover>
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