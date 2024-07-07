import { create } from "zustand";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export type StatusActions = "connecting" | "connect" | "disconnect" | "mensuaring";

export type ConnectMessage = {
  connect: string;
};

export type MensuaringMessage = {
  S1: number;
  S2: number;
  time: number;
};

export type SystemState = {
  status: StatusActions;
  url: string | (() => string | Promise<string>) | null;
  connected: boolean;
  setSystem: (value: { status: StatusActions; url?: string | (() => string | Promise<string>) | null }) => void;
  setSendMessage: (value: SendJsonMessage) => void;
  setRpm: (value: number | undefined) => void;
  setTempo: (value: string | undefined) => void;
  sendMessage: SendJsonMessage;
  rpm: number | undefined;
  tempo: string | undefined;
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
        connected: value.status == "connect" || value.status == "mensuaring",
      });
    } else {
      set({ status: value.status, connected: value.status == "connect" || value.status == "mensuaring" });
    }
  },
  setSendMessage: (value) =>
    set({
      sendMessage: value,
    }),
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
  sendMessage: () => {},
  rpm: 40,
  tempo: "3",
}));
