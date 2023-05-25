# @myarcane/hx711-service

A websocket service written in GO exposing weight outputs of hx711 load cell amplifier.

## Hardware
<img src="https://github.com/myarcane/hx711-service/assets/1671293/113b589c-7e12-451d-b6d1-01a76092b357" alt="Image" style="max-width: 300px;" />

- A [load cell high precision](https://www.amazon.ca/dp/B077YHNNCP?psc=1&ref=ppx_yo2ov_dt_b_product_details).
  Mine is a 100kg load cell capacity but it will also work with other capacity.
- A [hx711 load cell amplifier](https://www.amazon.ca/-/fr/Oiyagai-capteurs-pes%C3%A9e-double-pr%C3%A9cision/dp/B0779RZYF1/ref=sr_1_31)
- I used a [Raspberry pi 3 B+](https://www.pishop.ca/product/raspberry-pi-3-model-b-plus/) but it can probably work with newer Raspberry pi versions

### Hardware wiring
- The load cell black cable is connected to hx711 E+
- The load cell red cable is connected to hx711 E-
- The load cell green cable is connected to hx711 A-
- The load cell white cable is connected to hx711 A+
- The hx711 VCC is connected to Raspberry pi 3.3V pin
- The hx711 Data (DT) is connected to Raspberry pi GPIO pin 5
- The hx711 Clock (SCK) is connected to Rapsberry pi GPIO pin 6
- The hx711 ground (GND) is connected to Raspberry pi GPIO ground

### Main dependency

This service uses the [Raspberry Pi HX711 C++](https://github.com/endail/hx711) to access the weight outputs of a hx711 loadcell.

### Install

```console
pi@raspberrypi:~ $ git clone git@github.com:myarcane/hx711-service.git
pi@raspberrypi:~ $ cd hx711-service
pi@raspberrypi:~ $ sh install.sh
```

You might have to `export LD_LIBRARY_PATH=/usr/local/lib` to properly run the C++ Raspberry Pi HX711 library from the GO program

### Run the websocket service

```console
pi@raspberrypi:~ $ go run main.go
```
