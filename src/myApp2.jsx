<<<<<<< HEAD
import { Box, Flex } from '@radix-ui/themes';
import backgroundImage from '../src/assets/images/background.jpg';

export default function MyApp({ children }) { // Asegúrate de recibir 'children' como props
    return (
        <Box className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Flex className="">
                hi
            </Flex>


        </Box>
=======
import { Flex, Text, Button } from "@radix-ui/themes";

export default function MyApp() {
    return (
        <Flex direction="column" gap="2" width="50%">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
        </Flex>
>>>>>>> 7037532025acc169524bed532c7e7a83b4bb55d3
    );
}