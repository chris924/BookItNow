import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useState } from "react";
import { CompanyAppointmentCreateProps, CompanyAppointmentData, CompanyLoggedInLayoutProps } from "../../lib/constants/interfaces/CompanyInterfaces";
import CompanyCreateAppointmentFetch from "../../services/company/CompanyCreateAppointmentFetch";


export default function CompanyCreateAppointmentForm({CompanyData, CompanyAppointments}: CompanyAppointmentCreateProps ) {

    const [selectedAppointments, setSelectedAppointments] = useState<{ timeIndex: number; dayIndex: number }[]>([]);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    const handleButtonClick = async (timeIndex: number, dayIndex: number) => {
      
        const isSelected = selectedAppointments.some(
          (appointment) => appointment.timeIndex === timeIndex && appointment.dayIndex === dayIndex
        );
    
       
        if (isSelected) {
          setSelectedAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => !(appointment.timeIndex === timeIndex && appointment.dayIndex === dayIndex)
            )
          );

        } else {
          setSelectedAppointments((prevAppointments) => [
            ...prevAppointments,
            { timeIndex, dayIndex },
          ]);

          let today = new Date();

          if(today.getDay() === 5)
          {
            today.setDate(today.getDate() + 2);
          }

      
          let todayDay = today.getDay();
        
          
          let appointmentDay = (todayDay + dayIndex + 1) % 7; 
      
          

          today.setDate(today.getDate() + (appointmentDay + 7 - todayDay) % 7);
      
         
         
          let timeStampTimeStart = today.setHours(timeIndex + 10 - 2, 0, 0, 0);
      
          console.log("Timestamp Start:", new Date(timeStampTimeStart));
          
          
          const finalDate = new Date(timeStampTimeStart);
      
        if(CompanyData?.id !== undefined)
        {
          const respone = await CompanyCreateAppointmentFetch(CompanyData?.id, finalDate)
        }

        }
      };





    const calculateWeekdaysLeft = () => {
      
  
      const today = new Date();

      if(today.getDay() === 5)
          {
            today.setDate(today.getDate() + 2);
          }
      else if(today.getDay() === 6)
      {
        today.setDate(today.getDate() + 1);
      }


      let currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

      
    

      const daysLeft = 5 - currentDay; // Assuming a standard workweek (Monday to Friday)
  
      const remainingWeekdays = weekdays.slice(currentDay + 1, currentDay + 1 + daysLeft);
  
      return { count: daysLeft > 0 ? daysLeft : 0, names: remainingWeekdays };
    };
  
   
    const generateTimeIntervals = () => {
      const startHour = 8;
      const endHour = 16;
      const timeIntervals = [];
    
      for (let hour = startHour; hour <= endHour; hour++) {
        timeIntervals.push(`${hour}:00 - ${hour + 1}:00`);
      }
    
      return timeIntervals;
    };
    
    const isAppointmentSelected = (timeIndex: any, dayIndex: any) => {
      return selectedAppointments.some(
        (appointment) => appointment.timeIndex === timeIndex && appointment.dayIndex === dayIndex
      );
    };
    
    const isAppointmentBooked = (timeIndex: number, dayIndex: number) => {
      const today = new Date();
    
      if (today.getDay() === 5) {
        today.setDate(today.getDate() + 2);
      }
      else if(today.getDay() === 6)
      {
        today.setDate(today.getDate() + 1);
      }
    
      let todayDay = today.getDay();
      let appointmentDay = (todayDay + dayIndex + 1) % 7;
    
      today.setDate(today.getDate() + (appointmentDay + 7 - todayDay) % 7);
    
      let timeStampTimeStart = today.setHours(timeIndex + 10 - 2, 0, 0, 0);
    
      const finalDate = new Date(timeStampTimeStart);
    
      return (
        CompanyAppointments &&
        (CompanyAppointments as CompanyAppointmentData[]).some(
          (appointment: any) => new Date(appointment.dateAndTime).getTime() === finalDate.getTime()
        )
      );
    };
    
    return (
      <>
        <div className="animate__animated animate__backInUp">
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
                        <Button
                          className={`w-full ${
                            isAppointmentSelected(timeIndex, dayIndex)
                              ? 'bg-green-500 text-white'
                              : isAppointmentBooked(timeIndex, dayIndex)
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                          onClick={() => handleButtonClick(timeIndex, dayIndex)}
                        >
                          {`${timeInterval}`}
                        </Button>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </>
      );
    }
  