import { CardHeader, Divider, CardBody, CardFooter, Link, Image, Card, Button, Avatar } from "@nextui-org/react";
import UseNavigation from "../hooks/UseNavigation";
import { motion } from "framer-motion";
import arrowDown from "../styles/images/arrowdown.png";

interface StepByStepComponentProps{

 title:string;
 text:string;

}



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


export default function StepByStepComponent({text, title}: StepByStepComponentProps) : JSX.Element 
{

    const {navigateToGiHubProfile} = UseNavigation();

    

    return (
        <motion.div
        initial= {{opacity: 0, scale: 0, x: 0}}
        whileInView={{opacity: 1, scale: 1, x: 0}}
        transition= {{duration: 0.6}}
        viewport={{once: true}}
        className="flex flex-col items-center"
        style={containerStyle}
        >
        <img src={arrowDown} style={{ width: '200px', height: '200px' }} alt="Arrow Down" />
        <p className="text-center py-3" style={gradientStyle}>{title}</p>
        <Card>
      <CardBody>
    <p>{text}</p>
      </CardBody>
    </Card>
        </motion.div>
      );
}