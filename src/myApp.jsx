import { Box, Flex } from '@radix-ui/themes';
import backgroundImage from '../src/assets/images/background.jpg';

export default function MyApp({ children }) { // Asegúrate de recibir 'children' como props
    return (
        <Box className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Flex className="">
                hi
            </Flex>


        </Box>
    );
}