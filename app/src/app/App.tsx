import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Url from "../components/Url/url.tsx";
import Chart from "../components/Chart/chart.tsx";
import Slider from "../components/Slider/slider.tsx";
import Select from "../components/Select/select.tsx";
import StatusBar from "../components/StatusBar/statusbar.tsx";
import Info from "../components/Info/info.tsx";
import { useSystem, MensuaringMessage, ConnectMessage } from "../system/system.tsx";
import useWebSocketDefault, { Options } from "react-use-websocket";
import { useState } from "react";

function App() {
  const { connected, url, setSendMessage, setSystem } = useSystem();
  const [valueSlider, setValueSlider] = useState<number>(40);

  const socketOptions: Options = {
    onClose: () => {},
    onMessage: (message) => {
      onMessageAction(JSON.parse(message.data));
    },
  };
  const { sendJsonMessage } = useWebSocketDefault(url, socketOptions);

  function onMessageAction(data: ConnectMessage | MensuaringMessage) {
    if ("connect" in data) {
      setSystem({
        status: "connect",
      });
    }
  }

  useEffect(() => {
    setSendMessage(sendJsonMessage);
  }, [url]);

  return (
    <>
      <Url />
      <Stack direction="row" spacing={3} marginTop={5}>
        <Select disable={!connected}></Select>
        <Slider disable={!connected} onChange={setValueSlider} valueSlider={valueSlider}></Slider>
      </Stack>
      <Chart disable={!connected}></Chart>
      <Info disable={!connected} valueSlider={valueSlider} />
      <StatusBar></StatusBar>
    </>
  );
}

export default App;
