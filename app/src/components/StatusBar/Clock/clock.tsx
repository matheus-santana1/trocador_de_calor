import ClockComponent from "react-live-clock";

export default function Clock() {
  return (
    <>
      <ClockComponent format={"HH:mm:ss"} ticking={true} timezone={"America/Sao_Paulo"} style={{ transform: "translateY(1px)" }} />
    </>
  );
}
