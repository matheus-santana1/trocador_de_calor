#include <WiFi.h>
#include <WebSocketsServer.h>
#include "env.h"
#include "medicao.h"

TaskHandle_t MedicaoTask;
TaskHandle_t WiFiTask;
WebSocketsServer webSocket = WebSocketsServer(81);
// Medicao medicao({2, 3, 4, 5});

void setup()
{
    Serial.begin(115200);

    xTaskCreatePinnedToCore(MedicaoTaskFunction, "Medicao", 10000, NULL, 1, &MedicaoTask, 0);
    xTaskCreatePinnedToCore(WiFiTaskFunction, "WiFi", 10000, NULL, 1, &WiFiTask, 1);

    Serial.printf("Conectando a %s com a senha %s\n", SSID, PASSWORD);
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.printf(".");
    }
    Serial.printf("\nWiFi Conectado, IP: %s", WiFi.localIP().toString().c_str());

    webSocket.begin();
    webSocket.onEvent(webSocketEvent);
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
        webSocket.loop();
    }
}

void handleWebSocketMessage(uint8_t num, uint8_t *payload)
{
    String message = String((char *)payload);
    if (message == "1")
        webSocket.sendTXT(num, "Recebido data");
    else
        webSocket.sendTXT(num, "Não interpretado");
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
    }
    break;
    case WStype_TEXT:
        handleWebSocketMessage(num, payload);
        break;
    }
}