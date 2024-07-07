import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const connectedMessage = { connect: true };

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  new Promise((resolve) => {
    setTimeout(() => {
      resolve(ws.send(JSON.stringify(connectedMessage)));
    }, 1500);
  });
});
