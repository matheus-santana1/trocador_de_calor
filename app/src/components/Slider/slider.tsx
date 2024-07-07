import Box from "@mui/material/Box";
import SliderMUI from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import "./slider.css";
import { SetStateAction, Dispatch } from "react";

const iOSBoxShadow = "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

type SliderProps = {
  disable: boolean;
  onChange: Dispatch<SetStateAction<number>>;
  valueSlider: number;
};

const IOSSlider = styled(SliderMUI)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#0a84ff" : "#007bff",
  height: 5,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#007bff",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
    "&:before": {
      boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&::before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 5,
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    boxShadow: "inset 0px 0px 4px -2px #000",
    backgroundColor: "#d0d0d0",
  },
  "& .MuiSlider-thumb.Mui-disabled": {
    backgroundColor: "#d0d0d0",
  },
}));

export default function Slider(props: SliderProps) {
  return (
    <Box sx={{ width: "100%" }} className="SliderBox">
      <p className="SliderValue">{props.valueSlider} rpm</p>
      <IOSSlider
        aria-label="slider"
        step={10}
        min={40}
        max={180}
        value={props.valueSlider}
        onChange={(_e, newValue) => {
          props.onChange(newValue as number);
        }}
        disabled={props.disable}
      />
    </Box>
  );
}
