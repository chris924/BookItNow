import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  CompanyAppointmentCreateProps,
  CompanyAppointmentFetchResponse,
} from "../../lib/constants/interfaces/CompanyInterfaces";
import CompanyCreateAppointmentFetch from "../../services/company/CompanyCreateAppointmentFetch";
import CompanyDeleteAppointmentFetch from "../../services/company/CompanyDeleteAppointmentFetch";
import CompanyAppointmentDataFetch from "../../services/company/CompanyAppointmentDataFetch";

interface SelectedAppointment {
  timeIndex: number;
  dayIndex: number;
}

export default function CompanyCreateAppointmentForm({
  CompanyData,
}: CompanyAppointmentCreateProps) {
  
  const [CompanyAppointments, setCompanyAppointments] = useState<
    CompanyAppointmentFetchResponse | undefined
  >();

  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const weekdays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    const fetchCompanyAppointments = async () => {
      if (CompanyData) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const appointmentResult = await CompanyAppointmentDataFetch(
          CompanyData.id
        );
        if (appointmentResult) {
          setCompanyAppointments(appointmentResult);
        }
      }
    };

    fetchCompanyAppointments();
  }, [CompanyData, buttonClicked]);


  const handleButtonClick = async (timeIndex: number, dayIndex: number) => {

    setButtonClicked((prev) => !prev);

    setLoading(true);

    try {
      const isAppBooked = isAppointmentBooked(timeIndex, dayIndex);

      if (isAppBooked) {
        const finalDate = timeStampGenerator(dayIndex, timeIndex);
        const findSelected = findBookedAppointments(
          dayIndex,
          timeIndex,
          finalDate,
          CompanyAppointments
        );

        if (findSelected) {
          await CompanyDeleteAppointmentFetch(findSelected.appointmentId);
          
        }
      } else {
        const finalDate = timeStampGenerator(dayIndex, timeIndex);

        if (CompanyData?.id) {
          await CompanyCreateAppointmentFetch(CompanyData.id, finalDate);
                
        }
      }
    }catch(e)
    {
      console.error(e);
    }
    finally{
      setTimeout(() => {setLoading(false)}, 490);
    } 
  };

  const calculateWeekdaysLeft = () => {
    const today = new Date();

    if (today.getDay() === 5) {
      today.setDate(today.getDate() + 2);
    } else if (today.getDay() === 6) {
      today.setDate(today.getDate() + 1);
    }

    const currentDay = today.getDay();
    const daysLeft = 5 - currentDay;

    const remainingWeekdays = weekdays.slice(
      currentDay + 1,
      currentDay + 1 + daysLeft
    );

    return { count: daysLeft > 0 ? daysLeft : 0, names: remainingWeekdays };
  };

  const generateTimeIntervals = () => {
    const startHour = 8;
    const endHour = 16;
    const timeIntervals: string[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      timeIntervals.push(`${hour}:00 - ${hour + 1}:00`);
    }

    return timeIntervals;
  };

  const timeStampGenerator = (dayIndex: number, timeIndex: number): Date => {
    let today = new Date();

    if (today.getDay() === 5) {
      today.setDate(today.getDate() + 2);
    }

    let todayDay = today.getDay();
    let appointmentDay = (todayDay + dayIndex + 1) % 7;

    today.setDate(today.getDate() + (appointmentDay + 7 - todayDay) % 7);

    let timeStampTimeStart = today.setHours(timeIndex + 10 - 2, 0, 0, 0);

    return new Date(timeStampTimeStart);
  };

  const findBookedAppointments = (
    dayIndex: number,
    timeIndex: number,
    finalDate: Date,
    CompanyAppointments?: CompanyAppointmentFetchResponse
  ): any => {
    if (CompanyAppointments && CompanyAppointments.data) {
      const findSelected = CompanyAppointments.data.find(
        (appointmentDay: any) => {
          const appointmentDate = new Date(appointmentDay.dateAndTime);
          if (appointmentDate.getTime() === finalDate.getTime()) {
            return appointmentDate;
          }
          return false;
        }
      );

      return findSelected;
    }
  };

 const isAppointmentBooked =  (
  timeIndex: number,
  dayIndex: number
): boolean => {
  const today = new Date();

  if (today.getDay() === 5) {
    today.setDate(today.getDate() + 2);
  } else if (today.getDay() === 6) {
    today.setDate(today.getDate() + 1);
  }

  let todayDay = today.getDay();
  let appointmentDay = (todayDay + dayIndex + 1) % 7;

  today.setDate(today.getDate() + (appointmentDay + 7 - todayDay) % 7);

  let timeStampTimeStart = today.setHours(timeIndex + 10 - 2, 0, 0, 0);

  const finalDate = new Date(timeStampTimeStart);

  return !!(
    CompanyAppointments &&
    CompanyAppointments.data &&
    CompanyAppointments.data.some(
      (appointment: any) =>
        appointment.dateAndTime &&
        new Date(appointment.dateAndTime).getTime() === finalDate.getTime()
    )
  );
};

console.log('loading:', loading);

  return (
    <>
   
         <Popover isOpen={loading} placement="left" offset={560}  crossOffset={60} backdrop="opaque">
    
      <div className="w-full flex flex-row justify-center gap-5 animate__animated animate__backInUp">
     

        <Table aria-label="Table">
          <TableHeader>
            {calculateWeekdaysLeft().names.map((weekday, index) => (
              <TableColumn key={index}>
                <div className="text-center">{weekday}</div>
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {generateTimeIntervals().map((timeInterval, timeIndex) => (
              <TableRow key={timeIndex}>
                {calculateWeekdaysLeft().names.map((weekday, dayIndex) => (
                  <TableCell key={dayIndex}>
                    <div className="w-full">
                      <PopoverTrigger>
                      <Button
                        className={`w-full ${
                           isAppointmentBooked(timeIndex, dayIndex)
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                        onClick={() => handleButtonClick(timeIndex, dayIndex)}
                      >
                        {`${timeInterval}`}
                      </Button>
                      </PopoverTrigger>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table> 
          

       
      </div>
     
        
      <PopoverContent className="">
        <div className="">
        <CircularProgress aria-label="Loading..."/>
        </div>
      </PopoverContent>
       
      </Popover>  
      
    </>
  );
}
  