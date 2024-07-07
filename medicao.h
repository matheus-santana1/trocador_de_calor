#ifndef MEDICAO_H
#define MEDICAO_H
#include <OneWire.h>
#include <DallasTemperature.h>
class Medicao
{
public:
    Medicao(int pino_sensores, int pino_in2, int pino_in4, int pino_pwm);
    void init(int rpm, int tempo);
    void stop();
    void setCallback(void (*callbackFunc)(int, int, int));
    void triggerCallback(int T1, int T2, int T3);
    void readSensors();

private:
    DallasTemperature _sensores;
    int _pino_sensores;
    int _pino_in2;
    int _pino_in4;
    int _pino_pwm;
    void (*_callback)(int, int, int);
    void triggerCallback(String value);
};
#endif
