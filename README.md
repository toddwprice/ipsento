# ipsento
Ipsento data logger, event stream, api, ui

## logger
The data logger is the heart of the project of course. A Red Board, Arduino Uno compatible board runs the logging module. The board requires:

- 15+V

### Pressure Transmitter: Dwyer Model 626-06-CH-P1-E3-S1-LED
We are using this custom transmitter in "voltage output" mode:

- 12V input to Arduino, with GND and VIN pulled out
- custom wiring to the Dwyer with two twisted pairs (green/black, red/black)
    + 1: green --> POWER +
    + 2: green-black --> POWER -
    + 3: red-black --> RECEIVER + (voltage out)
    + 4: red --> POWER + (same as 1 GREEN)
