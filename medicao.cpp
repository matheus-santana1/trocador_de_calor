#include "medicao.h"

Medicao::Medicao(int pino_sensores, int pino_in2, int pino_in4, int pino_pwm)
{
    _pino_sensores = pino_sensores;
    _pino_in2 = pino_in2;
    _pino_in4 = pino_in4;
    _pino_pwm = pino_pwm;
    _callback = nullptr;
}

void Medicao::init(int rpm, int tempo)
{
    OneWire oneWire(_pino_sensores);
    DallasTemperature sensors(&oneWire);
    sensors.begin();
    _sensores = sensors;
}

void Medicao::stop()
{
    _callback = nullptr;
}

void Medicao::setCallback(void (*callbackFunc)(int, int, int))
{
    _callback = callbackFunc;
}

void Medicao::triggerCallback(int T1, int T2, int T3)
{
    if (_callback)
    {
        _callback(T1, T2, T3);
    }
}

void Medicao::readSensors()
{
    _sensores.requestTemperatures();
    int T1 = _sensores.getTempCByIndex(0);
    int T2 = _sensores.getTempCByIndex(1);
    int T3 = _sensores.getTempCByIndex(2);
    triggerCallback(T1, T2, T3);
}
