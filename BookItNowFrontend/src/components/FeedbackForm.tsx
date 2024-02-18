import { Card, CardBody } from "@nextui-org/react";



export default function FeedbackForm()
{

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


    return(
        <div className="flex items-center justify-center h-screen text-3xl" style={containerStyle}>
        <Card>
            <CardBody>
                <div >
                    <div style={gradientStyle}>
                    If you have any questions, or would like to give feedback you can do it here:
                    </div>
                    <div className="text-center py-3">
                     <a href="mailto:kriszb924@gmail.com" className="text-blue-500">Email</a>
                        </div>
                   
                    <div className="text-center">
                     <a href="https://github.com/chris924" className="text-blue-500" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                  
                </div>
            </CardBody>

        </Card>
        </div>
    )
}