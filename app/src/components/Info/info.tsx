import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import { useSystem } from "../../system/system";
import Typography from "@mui/material/Typography";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useLayoutEffect } from "react";
import gsap from "gsap";

type InfoProps = {
  disable: boolean;
  valueSlider: number;
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  useLayoutEffect(() => {
    gsap.to(".linearProgress", {
      opacity: 1,
      duration: 0.8,
    });
  });
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Info(props: InfoProps) {
  const { status, sendMessage, setSystem, rpm, tempo } = useSystem();

  function PlayClick() {
    setSystem({ status: "mensuaring" });
    sendMessage({
      rpm: props.valueSlider,
      tempo: tempo,
    });
  }

  function InfiniteClick() {
    setSystem({ status: "mensuaring" });
    sendMessage({
      rpm: props.valueSlider,
      tempo: tempo,
    });
  }

  const shouldRenderProgress = status === "connect" || status === "mensuaring";

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} sx={{ width: "100%" }}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" disabled={props.disable} onClick={PlayClick}>
            <PlayArrowIcon></PlayArrowIcon>
          </Button>
          <Button variant="contained" disabled={props.disable} onClick={InfiniteClick}>
            <AllInclusiveIcon></AllInclusiveIcon>
          </Button>
        </Stack>
      </Box>
      {shouldRenderProgress && <LinearProgressWithLabel value={12} className="linearProgress" style={{ opacity: 0 }} />}
    </>
  );
}
