import { Flex, Text, Button } from "@radix-ui/themes";

export default function MyApp() {
    return (
        <Flex direction="column" gap="2" width="50%">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
        </Flex>
    );
}