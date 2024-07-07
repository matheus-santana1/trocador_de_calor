#include "medicao.h"

const int RPM = 5;
const int TEMPO = 1;

Medicao medicao(2, 3, 4, 5);

void setup()
{
    Serial.begin(9600);
    medicao.init(RPM, TEMPO);
    medicao.setCallback(medicaoCallback);
}

void loop()
{
    medicao.readSensors();
    delay(1000);
}

void medicaoCallback(int T1, int T2, int T3)
{
    Serial.println("");
    Serial.print("Valores dos sensores: ");
    Serial.print(T1);
    Serial.print(" ");
    Serial.print(T2);
    Serial.print(" ");
    Serial.println(T3);
}