import { SetStateAction, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Url from "../components/Url/url.tsx";
import Chart from "../components/Chart/chart.tsx";
import Slider from "../components/Slider/slider.tsx";
import Select from "../components/Select/select.tsx";
import StatusBar from "../components/StatusBar/statusbar.tsx";
import Info from "../components/Info/info.tsx";
import { useSystem, MessagePayload, StatusActions } from "../system/system.tsx";
import useWebSocketDefault, { Options } from "react-use-websocket";
import { useState } from "react";
import "../components/Chart/formula_magica.tsx";

const default_url = import.meta.env.VITE_DEFAULT_URL;

function App() {
  const { connected, url, setSendMessage, setSystem } = useSystem();
  const [valueSlider, setValueSlider] = useState<number>(40);
  const [percent, setPercent] = useState<number>(0);

  const socketOptions: Options = {
    onClose: () => {
      setSystem({
        status: "disconnect",
      });
      setPercent(0);
    },
    onMessage: (message) => {
      onMessageAction(JSON.parse(message.data));
    },
  };
  const { sendJsonMessage } = useWebSocketDefault(url, socketOptions);
  useEffect(() => {
    setSystem({ status: "connecting", url: "ws://" + default_url });
    setSendMessage(sendJsonMessage);
  }, []);

  return (
    <>
      <Url />
      <Stack direction="row" spacing={3} marginTop={5}>
        <Select disable={!connected}></Select>
        <Slider disable={!connected} onChange={setValueSlider} valueSlider={valueSlider}></Slider>
      </Stack>
      <Chart disable={!connected}></Chart>
      <Info disable={!connected} valueSlider={valueSlider} percent={percent} />
      <StatusBar></StatusBar>
    </>
  );

  function onMessageAction(data: MessagePayload) {
    if ("status" in data) {
      setSystem({
        status: data.status as StatusActions,
      });
    } else {
      setPercent(data.percent as SetStateAction<number>);
      ApexCharts.exec("chart", "updateSeries", [
        {
          data: [3, 7, 12, 18, 25, 32, 12],
        },
        {
          data: [3, 7, 12, 18, 25, 32, 68],
        },
      ]);
    }
  }
}

export default App;
