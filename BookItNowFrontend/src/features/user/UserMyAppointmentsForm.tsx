import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import AppointmentDeleteuserFetch from "../../services/appointment/AppointmentDeleteUserFetch";


export interface UserMyAppointmentsFormProps
{
    userData: UserDataResult['data'];
}



export default function UserMyAppointmentsForm({userData}: UserMyAppointmentsFormProps)
{

    const formatDateTime = (dateTimeString: string): string => {
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

        console.log("APPOINTMENT ID:", appointmentId);

        const response = await AppointmentDeleteuserFetch(appointmentId);


      }

   

    return(
        <>


        {userData && userData.appointments.map((appointment) => {

        return(
            <div className="flex flex-row justify-center">
            <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{appointment.company.companyName}</p>
              <small className="text-default-500">{appointment.company.serviceName}</small>
              <h4 className="font-bold text-large">{formatDateTime(appointment.dateAndTime)}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="/images/hero-card-complete.jpeg"
                width={270}
              />
              <Button color="danger" onClick={() => handleCancelClick(appointment.id)}>Cancel</Button>
            </CardBody>
          </Card>
          </div>
        )


        })}
       
      </>
    )
}