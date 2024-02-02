import { motion, useAnimation } from "framer-motion";
import { Button } from "@nextui-org/button";
import FloatingBook from "./FloatingBook";
import FloatingFeather from "./FloatingFeather";
import GitHubIcon from "../styles/images/githubicon.svg";
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";




export default function HomePageForm() {

  const [featherHovered, setFeatherHovered] = useState(false);

  const {navigateToGitHubRepository, navigateToFeaturesPage} = UseNavigation();


  const bookControls = useAnimation();
  const createControls = useAnimation();

  const animateBookTextOnHover = () => {
      bookControls.start({
          y: ['0%', '-50%'],
          transition: {
              y: {
                  ease: 'easeInOut'
              }
          }

      })
  }

  const animateBookTextEndHover = () => {
    bookControls.start({
      y: ['-50%', '0%'],
      transition: {
        y: {
          ease: 'easeInOut'
        }
      }
    })
  }

  const animateCreateTextOnHover = () => {
    createControls.start({
      y: ['0%', '-50%'],
      transition: {
        y: {
          ease: 'easeInOut'
        }
      }
    })
  }

  const animateCreateTextEndHover = () => {
    createControls.start({
      y: ['-50%', '0%'],
      transition: {
        y: {
          ease: 'easeInOut'
        }
      }
    })
  }

  



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
          <div style={containerStyle} className="animate__animated animate__fadeInDown">
            <motion.span style={gradientStyle}  animate={createControls}>
              Create
            </motion.span>{" "}
            or{" "}
            <motion.span style={gradientStyle}  animate={bookControls}>
              Book
            </motion.span>{" "}
            various appointments <br />
          </div>
          <div className="pr-8 py-7 font-mono">
            <span className="text-xl text-gray-400">Fast, modern, and responsive Fullstack Pet Project</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <Button color="secondary" className="mb-4 lg:mb-0 lg:mr-8" onClick={() => navigateToFeaturesPage()}>
              Get Started
            </Button>
            <Button color="primary" onClick={() => navigateToGitHubRepository()}>
              <img src={GitHubIcon} alt="GitHub Icon" /> Github
            </Button>
          </div>
        </div>
        <motion.div
          className="lg:w-1/6 mt-5 lg:mt-0"
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          onHoverStart={() => animateBookTextOnHover()}
          onHoverEnd={() => animateBookTextEndHover()}
        >
          <FloatingBook />
        </motion.div>
        <motion.div
          className="lg:w-1/6 mt-5 lg:mt-0"
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          onHoverStart={() => animateCreateTextOnHover()}
          onHoverEnd={() => animateCreateTextEndHover()}      
        >
          <FloatingFeather/>
        </motion.div>
      </div>
    </>
  );
}