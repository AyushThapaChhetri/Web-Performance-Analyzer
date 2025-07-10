import { urlSchema } from "@/schemas/schemaUrl";
import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { MetricProgress } from "@/components/MetricProgress";
import { toast } from "react-toastify";

interface FormValues {
  url: string;
}

interface Results {
  loadTime: number;
  pageSize: number;
  numRequests: number;
}

const Home = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

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
      setIsLoading(true);
      setResults(null); // Clear previous results

      // const response = await axios.get("/api/analyze", {
      //   params: { url: data.url },
      // });

      const response = await axios.get(
        "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
        {
          params: {
            url: data.url,
            key: apiKey,
          },
        }
      );
      // console.log("Submitting URL to analyze:", data.url);
      // console.log("Analysis Result:", response.data);

      // Extract metrics from the API response
      const metrics =
        response.data.lighthouseResult.audits["metrics"].details.items[0];
      const loadTime = metrics.observedLoad / 1000; // Convert ms to seconds
      const pageSize =
        response.data.lighthouseResult.audits["total-byte-weight"]
          .numericValue / 1024; // Convert bytes to KB
      const numRequests =
        response.data.lighthouseResult.audits["network-requests"].details.items
          .length;

      // const audits = response.data.lighthouseResult.audits;

      // Safely check each part to avoid runtime errors if missing:
      // const metrics = audits?.["metrics"]?.details?.items?.[0];
      // const loadTime = metrics?.observedLoad ? metrics.observedLoad / 1000 : 0;

      // const totalByteWeight = audits?.["total-byte-weight"]?.numericValue || 0;
      // const pageSize = totalByteWeight / 1024;

      // const numRequests =
      //   audits?.["network-requests"]?.details?.items?.length || 0;

      // setResults({ loadTime, pageSize, numRequests });

      setResults({ loadTime, pageSize, numRequests });
      reset();
    } catch (error: unknown) {
      // console.log("Caught error:", error);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred";
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
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
                direction={{ base: "column", tablet: "row" }}
              >
                <Field.Root invalid={!!errors.url}>
                  <Input
                    p={"10px"}
                    placeholder={placeholder}
                    {...register("url")}
                  />
                  <Field.ErrorText color="red" fontSize="xs">
                    {errors.url?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Button
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
          {isLoading && (
            <Flex justify="center" mt={4}>
              <Spinner size="lg" color="purple.500" />
            </Flex>
          )}
          {results && (
            <Box mt={6} textAlign="left">
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
                Performance Results:
              </Text>

              <MetricProgress
                label="Load Time (s)"
                value={Number(results.loadTime.toFixed(2))}
                max={10}
              />
              <MetricProgress
                label="Page Size (MB)"
                value={Number((results.pageSize / 1024).toFixed(2))}
                max={20}
              />
              <MetricProgress
                label="Number of Requests"
                value={results.numRequests}
                max={200}
              />
            </Box>
          )}
          {results && (
            <Text fontSize="sm" mt={1} color="gray.600">
              🟩: Good (≤ 40%) | 🟧: Moderate (≤ 70%) | 🟥: Poor (&gt; 70%)
              &nbsp;
            </Text>
          )}
        </Card.Root>
      </Flex>
    </>
  );
};

export default Home;
