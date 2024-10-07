import React from 'react'
import { Flex, Text } from "@radix-ui/themes";
import GansosNasa from '../../assets/images/Gansos-Nasa.jpg'
import space from '../../assets/images/space.png'
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
                <div className="flex items-center cursor-pointer hover:opacity-65 transition-opacity duration-200 mb-3" onClick={() => navigate('/orrey')}>
                    <p className="text-white text-lg mr-2">Orrey</p> {/* Ajustar tamaño del texto */}
                    <img src={space} alt="Orrey" className="h-24 w-24" /> {/* Ajustar tamaño de la imagen */}
                </div>
                <img src={GansosNasa} alt="Gansos Nasa" className="h-16 w-16 m-6" />
            </Flex>
        </>
    )
}

export default Footer