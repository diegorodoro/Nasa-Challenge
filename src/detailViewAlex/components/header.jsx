import React from 'react';
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

const Header = () => {
    return (
        <Flex
            as="header"
            align="center"
            justify="start"
            className="font-sans h-16 mt-1"

        >
            {/* Agregar clase para cambiar el color a blanco */}
            <CaretLeftIcon className="h-12 w-12 ml-4 text-white" />
            <Text className="font-sans text-2xl text-white">Home</Text>
        </Flex>
    );
}

export default Header;