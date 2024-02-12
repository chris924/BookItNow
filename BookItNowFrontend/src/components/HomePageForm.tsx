import { motion, useAnimation } from "framer-motion";
import { Button } from "@nextui-org/button";
import FloatingBook from "./FloatingBook";
import FloatingFeather from "./FloatingFeather";
import GitHubIcon from "../styles/images/githubicon.svg";
import { useEffect, useState } from "react";
import UseNavigation from "../hooks/UseNavigation";
import { Card, CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import fasticon from "../styles/images/fasticon.png"
import customimage from "../styles/images/customimage.png"
import persistentimage from "../styles/images/persistentimage.png"
import GitHubFetch, { GitHubData } from "../services/GitHubFetch";
import UserCardComponent from "./UserCardComponent";
import LoadingCircle from "./LoadingCircle";

export default function HomePageForm() {

  const [featherHovered, setFeatherHovered] = useState(false);

  const [gitHubData, setGitHubData] = useState<GitHubData>();


  const {navigateToGitHubRepository, navigateToFeaturesPage} = UseNavigation();


  const bookControls = useAnimation();
  const createControls = useAnimation();


  useEffect(() => {

    const fetchData = async () => {

      const data = await GitHubFetch();

      setGitHubData(data.data);
    }

    fetchData();
  }, [])




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
    
  };

  const containerStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
  };


  if(gitHubData?.name === undefined || gitHubData.login === undefined || gitHubData.avatar_url === undefined || gitHubData.followers === undefined || gitHubData.following === undefined)
  {
    return(
      <LoadingCircle/>
    )
  }



  return (
    <>
      <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-4 items-center text-4xl">
        <div className="lg:pr-8 py-10 lg:col-span-2">
          <div style={containerStyle} className="animate__animated animate__fadeInDown">
            <motion.span style={gradientStyle} animate={createControls}>
              Create
            </motion.span>{" "}
            or{" "}
            <motion.span style={gradientStyle} animate={bookControls}>
              Book
            </motion.span>{" "}
            various appointments <br />
          </div>
          <div className="pr-8 py-7 font-mono">
            <span className="text-xl text-gray-400">
              Fast, modern, and responsive Fullstack Pet Project
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <Button
              color="secondary"
              className="mb-4 lg:mb-0 lg:mr-4"
              onClick={() => navigateToFeaturesPage()}
            >
              Get Started
            </Button>
            <Button color="primary" onClick={() => navigateToGitHubRepository()}>
              <img src={GitHubIcon} alt="GitHub Icon" /> Github
            </Button>
          </div>
        </div>

        <div className="lg:w-full mt-5 lg:mt-0 pl-10 ml-10" style={{ display: "grid", placeItems: "center" }}>
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            onHoverStart={animateBookTextOnHover}
            onHoverEnd={animateBookTextEndHover}
          >
            <FloatingBook />
          </motion.div>
        </div>

        <div className="lg:w-full mt-5 lg:mt-0 pl-10 ml-10" style={{ display: "grid", placeItems: "center" }}>
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            onHoverStart={animateCreateTextOnHover}
            onHoverEnd={animateCreateTextEndHover}
          >
            <FloatingFeather />
          </motion.div>
        </div>
      </div>

     
      <div className="container mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-3 items-center">
        
        <CardComponent
          cardTitle="Fast"
          cardBody="React provides a fast zero-delay experience"
          cardFooter="Check out React Framework"
          href="https://react.dev/"
          src={fasticon}
        />
       
       
        <CardComponent
          cardTitle="Custom"
          cardBody="NextUi provides an easily customizable user interface"
          cardFooter="Check out NextUi"
          href="https://nextui.org/"
          src={customimage}
        />
      
        
        <CardComponent
          cardTitle="Persistent"
          cardBody="Spring Boot and MySQL provides persistent data"
          cardFooter="Check out Spring Boot"
          href="https://spring.io/projects/spring-boot"
          src={persistentimage}
        />
      </div>
    
      <div className="flex justify-center px-10 py-10 text-5xl" style={containerStyle}>
        <h1 style={gradientStyle}> Looking for more?</h1>
      </div>


      <div className="flex justify-center px-10 py-10">
      <UserCardComponent cardName={gitHubData.name} cardUsername={gitHubData.login} cardFollowers={gitHubData.followers} cardFollowing={gitHubData.following} src={gitHubData.avatar_url} href={gitHubData.html_url}/>
      </div>
    </>
  );
}