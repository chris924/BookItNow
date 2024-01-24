import { Card, CardHeader, CardBody, Image, Button, ScrollShadow, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import AppointmentDeleteuserFetch from "../../services/appointment/AppointmentDeleteUserFetch";
import 'animate.css';

export interface UserMyAppointmentsFormProps
{
    userData: UserDataResult['data'];
    onAppointmentCancel: () => void
}



export default function UserMyAppointmentsForm({ userData, onAppointmentCancel }: UserMyAppointmentsFormProps) {
  const currentDate = new Date();

  if (!userData || !userData.appointments) {
    return null;
  }

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
    if (response.success) {
      onAppointmentCancel();
    }
  };

  const sortAppointments = (appointments: any) => {
    return appointments.sort((a: any, b: any) => new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime());
  };

  const appointmentsWithCancel = sortAppointments(userData.appointments).filter(
    (appointment: any) => new Date(appointment.dateAndTime) > currentDate
  );

  const appointmentsWithoutCancel = sortAppointments(userData.appointments).filter(
    (appointment: any) => new Date(appointment.dateAndTime) <= currentDate
  );

  return (
    <>
    <ScrollShadow hideScrollBar className="max-h-screen">
    <div className="mb-12 p-8 space-y-6" >
      {appointmentsWithCancel.map((appointment: any, index: any) => {
        const animationClass = index % 2 === 0 ? 'animate__animated animate__backInLeft' : 'animate__animated animate__backInRight';

        return (
          <div key={appointment.id} className={` flex flex-row justify-center ${animationClass}`}>
            <Card className=" py-4 mx-2">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
                <p className="text-tiny uppercase font-bold">{appointment.company.companyName}</p>
                <small className="text-default-500">{appointment.company.serviceName}</small>
                <h4 className="font-bold text-large">{formatDateTime(appointment.dateAndTime)}</h4>
              </CardHeader>
              <CardBody className=" overflow-visible py-2">
                <Image alt="Card background" className="object-cover rounded-xl" src="/images/hero-card-complete.jpeg" width={270} />
                <Popover backdrop="blur">
                  <PopoverTrigger>
                <Button color="danger">
                  Cancel
                </Button>
                </PopoverTrigger>
                <PopoverContent>
                <div className="flex flex-col items-center px-1 py-2">
                  <h3 className="text-small font-bold mb-4">Are you sure to cancel appointment?</h3>
                <Button color="danger" onClick={() => handleCancelClick(appointment.id)}>
                  Cancel Appointment
                </Button>
                </div>
                </PopoverContent>
                </Popover>
              </CardBody>
            </Card>
          </div>
        );
      })}

      {appointmentsWithoutCancel.map((appointment: any, index: any) => {
        const animationClass = (index + appointmentsWithCancel.length) % 2 === 0 ? 'animate__animated animate__backInLeft' : 'animate__animated animate__backInRight';

        return (
          <div key={appointment.id} className={` flex flex-row justify-center ${animationClass}`}>
            <Card className="py-4 mx-2">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
                <p className="text-tiny uppercase font-bold">{appointment.company.companyName}</p>
                <small className="text-default-500">{appointment.company.serviceName}</small>
                <h4 className="font-bold text-large">{formatDateTime(appointment.dateAndTime)}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
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