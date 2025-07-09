import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

const Home = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <>
      <Flex
        w={"100vw"}
        h={"100vh"}
        css={{
          bg: "radial-gradient(circle,rgba(209, 133, 230, 1) 15%, rgba(148, 187, 233, 1) 100%)",
        }}
        align={"center"}
        p={"2em"}
        direction={"column"}
        gapY={"20px"}
      >
        <Box textAlign={"center"} color={"white"}>
          <Heading size="4xl">Web Peformance Analyzer</Heading>

          <Text textStyle="md">
            Analyze any websites performace metrics in real-time
          </Text>
        </Box>
        <Card.Root w={"80%"} h={"fit-content"} p={"3em"}>
          <Card.Body alignItems={"center"}>
            <HStack
              gap="2"
              w={"80%"}
              // bg={"blue"}
            >
              <Field.Root>
                <Input
                  p={"10px"}
                  placeholder="Enter website URL (e.g., https://example.com)"
                />
              </Field.Root>
              <Button w={"40%"} colorPalette={"purple"} onClick={handleClick}>
                Analyze Performance
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>
      </Flex>
    </>
  );
};

export default Home;
