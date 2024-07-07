import { useLayoutEffect, useState } from "react";
import { useSystem } from "../../system/system";
import { Toolbar, Typography, AppBar as Bar, AppBarOwnProps, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import WifiIcon from "@mui/icons-material/Wifi";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/material/styles";
import Clock from "./Clock/clock";
import gsap from "gsap";

const AppBar = styled(Bar)(() => ({
  "& .MuiToolbar-root": {
    minHeight: 30,
    "& .MuiTypography-caption": {
      transform: "translateY(1px)",
    },
  },
}));

type previousStateProps = {
  color: AppBarOwnProps["color"];
  text: string;
  status: boolean;
};

export default function StatusBar() {
  const { connected, url } = useSystem();
  const [first, setFirst] = useState<boolean>(true);
  const [state, setState] = useState<previousStateProps>({ color: "error", text: "Não Conectado.", status: false });

  useLayoutEffect(() => {
    if (first) {
      gsap.to(".statusbar", {
        y: 0,
        duration: 0.8,
      });
      setFirst(false);
    } else {
      let tl = gsap.timeline();
      tl.to(".statusbar", {
        y: 31,
        duration: 0.4,
        onComplete: () => {
          setState({
            color: connected ? "success" : "error",
            text: connected ? `${url}` : "Não Conectado.",
            status: connected ? true : false,
          });
        },
      }).to(".statusbar", {
        y: 0,
        duration: 0.4,
      });
      tl.play();
    }
  }, [connected]);

  return (
    <>
      <AppBar position="fixed" color={state.color} sx={{ top: "auto", bottom: 0, transform: "translateY(31px)" }} className="statusbar">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="caption" component="div">
            {state.text}
          </Typography>
          {state.status ? (
            <Stack direction="row" spacing={1}>
              <WifiIcon />
              <DoneIcon />
              <Clock />
            </Stack>
          ) : (
            <ErrorOutlineIcon />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
