


export default function Features()
{
    return (
        <div className="container mx-auto my-8">
          <h1 className="text-4xl font-bold mb-8">Key Features</h1>
    
          {/* User Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Features</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Easy Appointment Booking:</strong> Streamline the appointment booking process as a user. Browse through available slots, choose a suitable time, and confirm your booking effortlessly.
              </li>
              <li>
                <strong>Intuitive Dashboard:</strong> Access a user-friendly dashboard that provides a comprehensive overview of your active appointments and history. Manage your schedule with ease.
              </li>
              {/* Add more user features as needed */}
            </ul>
          </div>
    
          {/* Company Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Company Features</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Effortless Appointment Management:</strong> Create, modify, or cancel appointment dates with ease. Specify available time slots and other relevant details effortlessly.
              </li>
              <li>
                <strong>Booking Insights:</strong> Gain insights into who booked your appointments. Access a comprehensive list of booked appointments along with user details.
              </li>
              <li>
                <strong>Flexibility to Modify or Cancel:</strong> Modify or cancel appointments as needed. Access the "Booked Appointments" section on your dashboard for quick adjustments.
              </li>
              {/* Add more company features as needed */}
            </ul>
          </div>
        </div>
      );
}