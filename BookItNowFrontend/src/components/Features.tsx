import CardComponent from "./CardComponent";
import FeaturesCardComponent from "./FeaturesCardComponent";

export default function Features() {


  const gradientStyle = {
    background: 'linear-gradient(90deg, #8E2DE2 0%, #800080 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    
  };

  const containerStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    lineHeight: '1.5',
  };




  return (
    <div className="container mx-auto my-8">
      <h1 className="flex justify-center text-4xl font-bold mb-8 ">Key Features</h1>

      <div style={containerStyle}>
      <h2 className="flex justify-center text-2xl font-semibold mb-4" style={gradientStyle}>User Features</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-10 py-10">
        <FeaturesCardComponent
          cardTitle="Easy Booking"
          cardBody="Streamline the appointment booking process as a user. Browse through available slots, choose a suitable time, and confirm your booking effortlessly."
          src=""
        />
        <FeaturesCardComponent
          cardTitle="Intuitive Dashboard"
          cardBody="Access a user-friendly dashboard that provides a comprehensive overview of your active appointments and history. Manage your schedule with ease."
          src=""
        />
      </div>

      <div style={containerStyle}>
      <h2 className="flex justify-center text-2xl font-semibold mb-4" style={gradientStyle}>Company Features</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
        <FeaturesCardComponent
          cardTitle="Effortless Appointment Management"
          cardBody="Create, modify, or cancel appointment dates with ease. Specify available time slots and other relevant details effortlessly."
          src=""
        />
        <FeaturesCardComponent
          cardTitle="Booking Insights"
          cardBody="Gain insights into who booked your appointments. Access a comprehensive list of booked appointments along with user details."
          src=""
        />
        <FeaturesCardComponent
          cardTitle="Flexibility to Modify or Cancel"
          cardBody="Modify or cancel appointments as needed. Access the Booked Appointments section on your dashboard for quick adjustments."
          src=""
        />
      </div>
    </div>
  );
      
  /*<h2 className="text-2xl font-semibold mb-4">How do I start?</h2>
  <p>
    First off, you can try out the Company features. Here's a step-by-step guide:
  </p>
  <ol className="list-decimal pl-6">
    <li>
      <strong>Create a Company Account:</strong> Visit the For Companies page and create a company account.
    </li>
    <li>
      <strong>Log In:</strong> After creating your account, log in to access the company features.
    </li>
    <li>
      <strong>Create Appointment Slots:</strong> Click on your default avatar, and create free appointment slots. Choose some available slots.
    </li>
    <li>
      <strong>Log Out:</strong> Once you have set up your company with available appointment slots, log out.
    </li>
    <li>
      <strong>Create a User Profile:</strong> Click on the register on the right side to create a user profile.
    </li>
    <li>
      <strong>Log In as a User:</strong> Log in as a user. You should see your created company.
    </li>
    <li>
      <strong>Book an Appointment:</strong> Click on the three buttons on the right side of your created company and choose "Book."
    </li>
    <li>
      <strong>View Active Appointment:</strong> After booking an available slot that you created as a company, you can see your active appointment in the "My Appointments" section.
    </li>
    <li>
      <strong>View User Profile:</strong> You can also see the specific user profile that booked an appointment on the company side.
    </li>
  </ol>
</div>
    
  );*/
}