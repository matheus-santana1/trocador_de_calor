#include <SD.h>
#include <SPI.h>
#include <WiFi.h>
#include <ESPmDNS.h>
#include <DNSServer.h>
#include <WebServer.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include "env.h"
#include "medicao.h"

#define SD_CS_PIN 5

const byte DNS_PORT = 53;
const char *ssid = "Trocador de Calor";
const char *password = "testpassword";

TaskHandle_t MedicaoTask;
TaskHandle_t WiFiTask;

String htmlContent;
WebServer server(80);
DNSServer dnsServer;
WebSocketsServer webSocket = WebSocketsServer(8080);
//  Medicao medicao({2, 3, 4, 5});

JsonDocument doc;
String jsonString;
void buildJson()
{
    jsonString = "";
    serializeJson(doc, jsonString);
}

void handleRoot()
{
    File file = SD.open("/index.html.gz");
    if (!file)
    {
        server.send(404, "text/plain", "Error 404.");
        return;
    }
    server.setContentLength(CONTENT_LENGTH_UNKNOWN);
    server.sendHeader("Content-Encoding", "gzip");
    server.send(200, "text/html", "");
    const size_t chunkSize = 5120;
    uint8_t buffer[chunkSize];
    while (file.available())
    {
        size_t bytesRead = file.read(buffer, chunkSize);
        server.sendContent_P((const char *)buffer, bytesRead);
    }
    file.close();
    server.sendContent("");
}

void setup()
{
    Serial.begin(115200);

    xTaskCreatePinnedToCore(MedicaoTaskFunction, "Medicao", 10000, NULL, 1, &MedicaoTask, 1);
    xTaskCreatePinnedToCore(WiFiTaskFunction, "WiFi", 10000, NULL, 1, &WiFiTask, 0);

    WiFi.softAP(ssid, password);
    if (!MDNS.begin("trocador"))
    {
        Serial.println("Falha ao inicializar o MDNS.");
        while (1)
        {
            delay(1000);
        }
    }
    Serial.printf("Servidor WebSocket iniciado!\nIP do AP: %s\n", WiFi.softAPIP().toString());
    if (!SD.begin(SD_CS_PIN))
    {
        Serial.printf("Falha ao inicializar o cartao SD.\n");
        return;
    }
    Serial.printf("Cartão SD inicializado.\n");
    server.onNotFound(handleRoot);
    dnsServer.start(DNS_PORT, "*", WiFi.softAPIP());
    server.on("/", HTTP_GET, handleRoot);
    server.begin();
    Serial.printf("Server inicializado.\n");
    webSocket.begin();
    webSocket.onEvent(webSocketEvent);
    Serial.printf("Websocket inicializado.\n");
}

void loop()
{
}

void MedicaoTaskFunction(void *pvParameters)
{
    while (true)
    {
        if (Serial.available() > 0)
        {
            char c = Serial.read();
            String mensagem = String(c);
            webSocket.sendTXT(0, mensagem);
            Serial.print(c);
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}

void WiFiTaskFunction(void *pvParameters)
{
    while (true)
    {
        server.handleClient();
        webSocket.loop();
        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void handleWebSocketMessage(uint8_t num, uint8_t *payload)
{
    String message = String((char *)payload);
    Serial.println(message);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
    switch (type)
    {
    case WStype_DISCONNECTED:
        Serial.printf("\nDisconectado");
        break;
    case WStype_CONNECTED:
    {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("\n[%u] Conectado %d.%d.%d.%d url: %s", num, ip[0], ip[1], ip[2], ip[3], payload);
        doc["status"] = "connected";
        buildJson();
        webSocket.sendTXT(num, jsonString);
    }
    break;
    case WStype_TEXT:
        handleWebSocketMessage(num, payload);
        break;
    }
}