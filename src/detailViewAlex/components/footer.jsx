import React from 'react'
import { Flex, Text } from "@radix-ui/themes";
import GansosNasa from '../../assets/images/Gansos-Nasa.jpg'
import StarWarsShip from '../../assets/images/StarWarsShip.jpg'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    
    return (
        <>
            <Flex
                as="footer"
                align="end"
                justify="end"
                className="font-sans h-16 "
            >
                
                <img onClick={()=>navigate('/orrey')} src={StarWarsShip} alt="Star Wars Ship" className="h-16 w-16 mb-6" />
                <img src={GansosNasa} alt="Gansos Nasa" className="h-16 w-16 m-6" />

            </Flex>
        </>
    )
}

export default Footer