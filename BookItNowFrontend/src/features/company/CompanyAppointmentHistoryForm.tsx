import { ScrollShadow, Card, CardHeader, CardBody, Image, Pagination } from "@nextui-org/react";
import { CompanyAppointmentData} from "../../lib/constants/interfaces/CompanyInterfaces";
import { useState, useEffect } from "react";


export interface CompanyMyAppointmentsFormProps {
    companyAppointments?: CompanyAppointmentData[];
}

export default function CompanyAppointmentHistoryForm({companyAppointments}: CompanyMyAppointmentsFormProps)
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
  
    const sortAppointments = (appointments: CompanyAppointmentData[]) => {
      
      return appointments.filter((x) => new Date(x.dateAndTime) <= currentDate && x.userId !== null).sort((a: CompanyAppointmentData, b: CompanyAppointmentData) => new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime());
    };
  
  

      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const totalAppointments = sortAppointments(companyAppointments);
      const visibleAppointments = totalAppointments.slice(startIndex, endIndex);
      

   
    return (
      <>


{companyAppointments.length === 0 ? (
        <div className="flex justify-center m-10 font-bold text-lg font-sans text-gray-1500">Here will be your booked appointment history.</div>
      ) : (
        <div>

      <ScrollShadow hideScrollBar className="max-h-screen">
      <div className="mb-12 p-8 space-y-6" >
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