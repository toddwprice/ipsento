const int analogInPin = A0;  // Analog input pin that the pressure transmitter is attached to

const int numReadings = 10;

float readings[numReadings];      // the readings from the analog input
int index = 0;                  // the index of the current reading
float total = 0;                  // the running total
float average = 0; 

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);

  // initialize all the readings to 0: (for smoothing the pressure transmitter analog reading)
  for (int thisReading = 0; thisReading < numReadings; thisReading++)
    readings[thisReading] = 0; 
}

void loop() {  
  /*
  Assuming a perfect resistor, the lowest value from the sensor outputs 4ma:
  0.004 A * 250 ohm = 1.0 volts;  1v * 1023 / 5 = analog input value of about 205.
  
  The max input is 20 ma which gives 5v which gives analog value 1023.
  */
  // read the analog in value:
  int sensorValue = analogRead(analogInPin);
  float voltage = sensorValue * (5.0 / 1023.0);
  float ohms = 250; //that's what we're using in the circuit
  float milliamps = (voltage / ohms) * 1000;
  float wc = mapValue(milliamps);
  
  // subtract the last reading:
  total = total - readings[index];         
  // read from the sensor:  
  readings[index] = wc; 
  // add the reading to the total:
  total = total + readings[index];       
  // advance to the next position in the array:  
  index = index + 1;                    

  // if we're at the end of the array...
  if (index >= numReadings)              
    // ...wrap around to the beginning: 
    index = 0;                           

  // calculate the average:
  average = total / numReadings;

  // print the results to the serial monitor:
  Serial.print("sensor = " );
  Serial.print(sensorValue);
  Serial.print("\t milliamps = ");
  Serial.print(milliamps);
  Serial.print("\t psi = ");
  Serial.println(average);

  delay(2);  //delay in between reads for stability
}

float mapValue(float milliamps) {
  float inMin = 4.0;  //milliamps range is 4-20ma
  float inMax = 20.0;
  float outMin = 0.0;  //PSI range is 0-5 PSI
  float outMax = 5.0;
  
  float psi = (milliamps - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  return psi;  // * 27.67990484;  //wc per PSI
}


