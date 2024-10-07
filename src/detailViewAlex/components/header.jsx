import React from 'react';
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <Flex
            as="header"
            align="center"
            justify="start"
            className="font-sans h-16 mt-1"

        >
            {/* Agregar clase para cambiar el color a blanco */}
            <CaretLeftIcon className="h-12 w-12 ml-4 text-white" onClick={() => navigate('/')} />
            <Text className="font-sans text-2xl text-white">Home</Text>
        </Flex>
    );
}

export default Header;