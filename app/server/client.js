import WebSocket from "ws";
import readline from "readline";

const ws = new WebSocket("ws://192.168.0.14:81");

process.stdout.write("\u001b[2J\u001b[0;0H");

ws.on("error", console.error);

ws.on("open", function open() {
  console.log("Conectado ao servidor WebSocket.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();
  rl.on("line", function (line) {
    ws.send(line);
  });
});

ws.on("message", function message(data) {
  const message = data.toString("utf8");
  console.log("Recebido do servidor WebSocket:", message);
});
