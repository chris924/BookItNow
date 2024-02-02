import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react";
import FeatherImage from "../styles/images/feather.png"



const FloatingFeather = () => {

    const controls = useAnimation();

    const animate = () => {
        controls.start({
            y: ['0%', '25%', '0%'],
            transition: {
                y: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                }
            }

        })
    }

    

    useEffect(() => {
        animate()
    }, [])



    return(
        <motion.div className="Floating feather" animate={controls}>

        <img src={FeatherImage} alt="Floating feather" style={{width: '65%', height: "auto"}}> 
        </img>

        </motion.div>
    )

}

export default FloatingFeather;