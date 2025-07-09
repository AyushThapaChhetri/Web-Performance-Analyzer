import { urlSchema } from "@/schemas/schemaUrl";
import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Heading,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toaster } from "@/components/ui/toaster";

interface FormValues {
  url: string;
}

const Home = () => {
  // Inside your component
  const placeholder = useBreakpointValue({
    base: "Enter website URL",
    tabletLg: "Enter website URL (e.g., https://example.com)",
  });

  const handleClick = () => {
    console.log("Button clicked");
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(urlSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.get("/api/analyze", {
        params: { url: data.url },
      });

      console.log("Submitting URL to analyze:", data.url);

      console.log("Analysis Result:", response.data);

      // localStorage.setItem("authToken", token);
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);

      toaster.create({
        title: `Successfully Submitted Url`,
        type: "success",
      });
      reset();
    } catch (error: unknown) {
      // console.log("Caught error:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "An unknown error occurred";
        toaster.create({
          title: `${message}`,
          type: "error",
        });
      } else if (error instanceof Error) {
        toaster.create({
          title: `${error.message}`,
          type: "error",
        });
      } else if (typeof error === "string") {
        toaster.create({
          title: `${error}`,
          type: "error",
        });
      } else {
        toaster.create({
          title: `An unknown error occurred.`,
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <Flex
        w={"100vw"}
        h={"100vh"}
        // bg={"yellow"}
        css={{
          bg: "radial-gradient(circle,rgba(209, 133, 230, 1) 15%, rgba(148, 187, 233, 1) 100%)",
        }}
        align={"center"}
        p={{ base: "1rem", tablet: "2em" }}
        direction={"column"}
        gapY={"20px"}
      >
        <Box textAlign={"center"} color={"white"}>
          <Heading size="4xl">Web Peformance Analyzer</Heading>

          <Text textStyle="md">
            Analyze any websites performace metrics in real-time
          </Text>
        </Box>
        <Card.Root
          w={{ base: "95%", tablet: "80%" }}
          h={"fit-content"}
          p={"3em"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card.Body alignItems={"center"}>
              <Flex
                gap="2"
                w={"80%"}
                // bg={"blue.200"}
                // wrap={"wrap"}
                direction={{ base: "column", tablet: "row" }}
                // bg={"blue"}
              >
                <Field.Root invalid={!!errors.url}>
                  <Input
                    p={"10px"}
                    // w={{ base: "100%", tabletSm: "50%" }}
                    // minW={"312px"}
                    placeholder={placeholder}
                    {...register("url")}
                  />
                  <Field.ErrorText color="red" fontSize="xs">
                    {errors.url?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Button
                  // w={{ base: "100%", tabletSm: "40%" }}
                  minW={{ base: "100px", tablet: "200px" }}
                  colorPalette={"purple"}
                  onClick={handleClick}
                  type="submit"
                  _active={{
                    bg: "purple.700", // darker shade when pressed
                    color: "white", // optional
                  }}
                  textWrap={"wrap"}
                >
                  Analyze Performance
                </Button>
              </Flex>
            </Card.Body>
          </form>
        </Card.Root>
      </Flex>
    </>
  );
};

export default Home;
