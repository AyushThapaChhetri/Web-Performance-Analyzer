import { Box, Progress, Text } from "@chakra-ui/react";

type MetricProgressProps = {
  label: string;
  value: number;
  max: number;
};

function getColor(value: number, max: number) {
  const ratio = value / max;
  if (ratio < 0.4) return "green";
  if (ratio < 0.7) return "orange";
  return "red";
}

export const MetricProgress = ({ label, value, max }: MetricProgressProps) => {
  const color = getColor(value, max);

  return (
    <Box my={4}>
      <Text fontWeight="medium" mb={2}>
        {label}: <b>{value}</b>
      </Text>
      <Progress.Root
        value={value}
        max={max}
        colorPalette={color}
        size="lg"
        variant="subtle"
      >
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
        {/* <Progress.Label>{label}</Progress.Label> */}
        <Progress.ValueText />
      </Progress.Root>
    </Box>
  );
};
