#ifndef MEDICAO_H
#define MEDICAO_H
#include <OneWire.h>
#include <DallasTemperature.h>

#define TIME_DELAY_MS 1000

typedef struct dataProps
{
    float temperatura_de_entrada;
    float temperatura_de_saida;
    int porcentagem;
    int tempo;
} dataProps;

typedef struct initProps
{
    int rpm;
    int tempo;
} initProps;

typedef struct MedicaoProps
{
    int pino_sensores;
    int pino_in2;
    int pino_in4;
    int pino_pwm;
} MedicaoProps;

class Medicao
{
public:
    Medicao(MedicaoProps data);
    dataProps readSensors();
    void init(initProps data);
    void stop();
    void setCallback(void (*callbackFunc)(dataProps data));
    void triggerCallback(dataProps data);

private:
    bool running;
    DallasTemperature _sensores;
    int _pino_sensores;
    int _pino_in2;
    int _pino_in4;
    int _pino_pwm;
    void (*_callback)(dataProps);
    void triggerCallback(String value);
};
#endif
