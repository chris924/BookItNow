import { Button } from "@nextui-org/button";
import FloatingBook from "./FloatingBook";
import FloatingFeather from "./FloatingFeather";
import  GitHubIcon  from "../styles/images/githubicon.svg";

export default function HomePageForm() {
    const gradientStyle = {
      background: 'linear-gradient(90deg, #8E2DE2 0%, #800080 100%)',
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
        <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center text-4xl">
          <div className="lg:w-1/2 pr-8 py-10">
            <div style={containerStyle}>
              <span style={gradientStyle}>Create</span> or <span style={gradientStyle}>Book</span> various appointments <br />
            </div>
            <div className="pr-8 py-7 font-mono">
              <span className="text-xl text-gray-400">Fast, modern, and responsive Fullstack Pet Project</span>
            </div>
  
            <div className="flex flex-col lg:flex-row items-center">
              <Button color="secondary" className="mb-4 lg:mb-0 lg:mr-8">
                Get Started
              </Button>
              <Button color="primary">
                <img src={GitHubIcon} alt="GitHub Icon" /> Github
              </Button>
            </div>
          </div>
          <div className="lg:w-1/6 mt-5 lg:mt-0">
            <FloatingBook />
          </div>
          <div className="lg:w-1/6 mt-5 lg:mt-0">
            <FloatingFeather />
          </div>
        </div>
      </>
    );
  }