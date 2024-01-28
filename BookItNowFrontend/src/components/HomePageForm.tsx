import FloatingBook from "./FloatingBook";

export default function HomePageForm() {
    const gradientStyle = {
      background: 'linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      display: 'inline-block',
    };
  
    const containerStyle = {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    
    };
  
    return (
        <>
          <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center text-4xl" style={containerStyle}>
            <div className="lg:w-1/2 pr-8">
              <div>
                <span style={gradientStyle}>Create</span> or <span style={gradientStyle}>Book</span> various appointments
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <FloatingBook/>
            </div>
          </div>
        </>
      );
  }