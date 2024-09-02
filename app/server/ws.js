import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const connectedMessage = { status: "connected" };

function gerarDados(tempoObj, tempo) {
  let dados = {
    S1: ((Math.random() % 121) * 100).toFixed(2),
    S2: ((Math.random() % 121) * 100).toFixed(2),
    percent: Math.round((tempo / tempoObj) * 100),
  };
  return dados;
}

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", async function message(data) {
    const obj = JSON.parse(data);
    let tempo = 0;
    ws.send(JSON.stringify({ status: "mensuaring" }));
    while (obj.tempo * 60 > tempo) {
      ws.send(JSON.stringify(gerarDados(obj.tempo * 60, tempo)));
      await new Promise((resolve) => setTimeout(resolve, 3000));
      tempo++;
    }
  });

  new Promise((resolve) => {
    setTimeout(() => {
      resolve(ws.send(JSON.stringify(connectedMessage)));
    }, 1500);
  });
});
