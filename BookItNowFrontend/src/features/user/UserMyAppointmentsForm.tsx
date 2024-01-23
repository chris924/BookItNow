import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import AppointmentDeleteuserFetch from "../../services/appointment/AppointmentDeleteUserFetch";
import 'animate.css';

export interface UserMyAppointmentsFormProps
{
    userData: UserDataResult['data'];
    onAppointmentCancel: () => void
}



export default function UserMyAppointmentsForm({userData, onAppointmentCancel}: UserMyAppointmentsFormProps)
{

  const currentDate = new Date();


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

        const response = await AppointmentDeleteuserFetch(appointmentId);

        if(response.success)
        {
            onAppointmentCancel();
        }

      }


    return(
        <>


{userData && userData.appointments.map((appointment, index) => {
    const animationClass = index % 2 === 0 ? 'animate__animated animate__backInLeft' : 'animate__animated animate__backInRight';

    return (
        <div className={`flex flex-row justify-center ${animationClass}`}>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
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
                    {new Date(appointment.dateAndTime) > currentDate ? <Button color="danger" onClick={() => handleCancelClick(appointment.id)}>Cancel</Button> : null}
                </CardBody>
            </Card>
        </div>
    );
})}
       
      </>
    )
}