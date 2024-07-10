#include "medicao.h"

Medicao::Medicao(MedicaoProps data)
{
    running = false;
    _pino_sensores = data.pino_sensores;
    _pino_in2 = data.pino_in2;
    _pino_in4 = data.pino_in4;
    _pino_pwm = data.pino_pwm;
    _callback = nullptr;
    OneWire oneWire(_pino_sensores);
    DallasTemperature sensors(&oneWire);
    sensors.begin();
    _sensores = sensors;
}

void Medicao::init(initProps data)
{
    int tempoAtual = 0;
    running = true;
    while (tempoAtual <= data.tempo && running)
    {
        analogWrite(_pino_pwm, data.rpm);
        triggerCallback(readSensors());
        tempoAtual++;
        delay(TIME_DELAY_MS);
    }
    running = false;
}

dataProps Medicao::readSensors()
{
    _sensores.requestTemperatures();
    int T1 = _sensores.getTempCByIndex(0);
    int T2 = _sensores.getTempCByIndex(1);
    dataProps data = {T1, T2, 100, 1};
    return data;
}

void Medicao::stop()
{
    running = false;
}

void Medicao::setCallback(void (*callbackFunc)(dataProps))
{
    _callback = callbackFunc;
}

void Medicao::triggerCallback(dataProps data)
{
    if (_callback)
    {
        _callback(data);
    }
}
