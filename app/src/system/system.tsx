import { create } from "zustand";
import { SeriesPayload } from "../components/Chart/chart";

export type StatusActions = "connecting" | "connected" | "disconnect" | "mensuaring";

export interface MessagePayload {
  status?: string;
  S1?: number;
  S2?: number;
  percent?: number;
}

type SendJsonMessage = (jsonMessage: MessagePayload, keep?: boolean) => void;

export type SystemState = {
  status: StatusActions;
  url: string | (() => string | Promise<string>) | null;
  connected: boolean;
  setSystem: (value: { status: StatusActions; url?: string | (() => string | Promise<string>) | null }) => void;
  setSendMessage: (value: SendJsonMessage) => void;
  setRpm: (value: number | undefined) => void;
  setTempo: (value: number | undefined) => void;
  setSeries: (values: SeriesPayload[] | undefined) => void;
  sendMessage: SendJsonMessage;
  rpm: number | undefined;
  tempo: number | undefined;
  series: SeriesPayload[] | undefined;
};

export const useSystem = create<SystemState>((set) => ({
  status: "disconnect",
  url: null,
  connected: false,
  setSystem: (value) => {
    if ("url" in value) {
      set({
        status: value.status,
        url: value.status == "disconnect" ? null : value.url,
        connected: value.status == "connected" || value.status == "mensuaring",
      });
    } else {
      set({ status: value.status, connected: value.status == "connected" || value.status == "mensuaring" });
    }
  },
  setSendMessage: (value) => {
    set({
      sendMessage: value,
    });
  },
  setRpm: (value) => {
    set({
      rpm: value,
    });
  },
  setTempo: (value) => {
    set({
      tempo: value,
    });
  },
  setSeries: (value) => {
    set({
      series: value,
    });
  },
  sendMessage: () => {},
  rpm: 40,
  tempo: 3,
  series: [
    {
      name: "Temperatura de Entrada",
      data: [3, 7, 12, 18, 25, 32, 40, 50, 65, 80, 85, 90, 100, 120],
    },
    {
      name: "Temperatura de Saída",
      data: [3, 7, 12, 18, 25, 32, 40, 50, 65, 80, 85, 90, 100, 120],
    },
  ],
}));
