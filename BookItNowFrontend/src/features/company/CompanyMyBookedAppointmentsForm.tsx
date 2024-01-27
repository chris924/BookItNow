import { Button } from "@nextui-org/button";
import { ScrollShadow, Card, CardHeader, CardBody, Popover, PopoverTrigger, PopoverContent, Image, Pagination } from "@nextui-org/react";
import { CompanyAppointmentData } from "../../lib/constants/interfaces/CompanyInterfaces";
import AppointmentDeleteuserFetch from "../../services/appointment/AppointmentDeleteUserFetch";
import { useEffect, useState } from "react";


export interface CompanyMyAppointmentsFormProps {
    companyAppointments?: CompanyAppointmentData[];
    onAppointmentCancel: () => void;
}

export default function CompanyMyBookedAppointmentsForm({companyAppointments, onAppointmentCancel}: CompanyMyAppointmentsFormProps)
{

  const [currentPage, setCurrentPage] = useState(1);
  const calculateRowsPerPage = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight < 680) {
      return 2; 
    } else if (screenHeight < 900) {
      return 3; 
    } else if (screenHeight < 1046) {
      return 4; 
    } else if (screenHeight < 1229)
      {
      return 5; 
    }
    else
    {
      return 6;
    }
  };
   
  const [rowsPerPage, setRowsPerPage] = useState(calculateRowsPerPage);

  const handleResize = () => {
    setRowsPerPage(calculateRowsPerPage());
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



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
      const filtered = appointments.filter((x) =>  new Date(x.dateAndTime) > currentDate && x.userId !== null)
      
      return filtered.sort((a: CompanyAppointmentData, b: CompanyAppointmentData) => new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime());
    };
  
   

      const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const totalAppointments = sortAppointments(companyAppointments);
  const visibleAppointments = totalAppointments.slice(startIndex, endIndex);

  
   
    return (
      <>



{companyAppointments.length === 0 ? (
        <div className="flex justify-center m-10 font-bold text-lg font-sans text-gray-1500">Here will be your active and booked appointments.</div>
      ) : (
        <div>
      <ScrollShadow hideScrollBar className="max-h-screen">
      <div className="mb-12 p-4 space-y-4" >
        {visibleAppointments.map((appointment: CompanyAppointmentData, index: number) => {
          const animationClass = index % 2 === 0 ? 'animate__animated animate__backInLeft' : 'animate__animated animate__backInRight';
  
          return (
            
            <div key={appointment.appointmentId} className={` flex flex-row justify-center ${animationClass}`}>
              <Card className="py-4 mx-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
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
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 shadow-md">
         <Pagination
           showControls
           total={Math.ceil(totalAppointments.length / rowsPerPage)}
           page={currentPage}
           initialPage={currentPage}
           onChange={(page) => setCurrentPage(page)}
           />

        
    
      </div>
      </div>
      )}
      </>     
    );
}


