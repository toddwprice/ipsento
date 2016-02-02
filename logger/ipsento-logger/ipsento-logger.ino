/* ====================================
 * THERMOCOUPLE AMP
 * ----------------------------------*/
#include <SPI.h>
#include "Adafruit_MAX31855.h"

#define DO   2
#define CS   3
#define CLK  4
//#define CS2  5
Adafruit_MAX31855 thermocouple(CLK, CS, DO);
//Adafruit_MAX31855 thermocouple2(CLK, CS2, DO);

/* ====================================
 * PRESSURE GAUGE
 * ----------------------------------*/
#define PSI_IN  A3  //do not use A4 or A5! They double as a SDA and SCL which is used by TMP007


/* ====================================
 * IR TEMPERATURE
 * ----------------------------------*/
#include <Wire.h>
#include "Adafruit_TMP007.h"
Adafruit_TMP007 tmp007;


/* ====================================
 * HUMIDITY AND TEMP
 * ----------------------------------*/
//#include "DHT.h"

//#define DHTPIN 13     // what pin we're connected to
//#define DHTTYPE DHT22   // DHT 22  (AM2302)

// Initialize DHT sensor for normal 16mhz Arduino
//DHT dht(DHTPIN, DHTTYPE);


/* ====================================
 * BAROMETER
 * ----------------------------------*/
//#include <Wire.h>
//#include <Adafruit_MPL3115A2.h>

// Power by connecting Vin to 3-5V, GND to GND
// Uses I2C - connect SCL to the SCL pin, SDA to SDA pin
// See the Wire tutorial for pinouts for each Arduino
// http://arduino.cc/en/reference/wire
//Adafruit_MPL3115A2 baro = Adafruit_MPL3115A2();


/* ====================================
 * FIELDS
 * ----------------------------------*/
//int iteration = 1;
//float humidity = 0;
//float roomTemp = 0;

const int numReadings = 10;

float readings[numReadings];      // the readings from the analog input
int index = 0;                  // the index of the current reading
float total = 0;                  // the running total
float psiAvg = 0; 


void setup(void) {
  Serial.begin(9600);
  Serial.println("...Ipsento Data Logger...");
  //dht.begin();
  //baro.begin();
  //analogReference(INTERNAL);

  // initialize all the PSI readings to 0: (for smoothing the pressure transmitter analog reading)
  for (int thisReading = 0; thisReading < numReadings; thisReading++)
    readings[thisReading] = 0; 

  //initialize TMP007 IR sensor
  if (! tmp007.begin(TMP007_CFG_4SAMPLE)) {
    Serial.println("No TMP007 sensor found");
    while (1);
  }
  
  
  delay(500); //wait for chip to stabilize
}

void loop(void) {
  int start = millis();
  
  /* ====================================
   * THERMOCOUPLE 1 - bean temp
   * ----------------------------------*/
  float beanTemp = 0;
  while (beanTemp == 0) {
    beanTemp = thermocouple.readFarenheit();
    if (isnan(beanTemp)) beanTemp = -1;
  }

  /* ====================================
   * THERMOCOUPLE 2 - outside drum temp
   * ----------------------------------*/
   /*
  float drumTemp = 0;
  while (drumTemp == 0) {
    drumTemp = thermocouple2.readFarenheit();
    if (isnan(drumTemp)) drumTemp = -1;
  }
  */
  
  /* ====================================
   * PRESSURE GAUGE
   * ----------------------------------*/
  
  for(int i=0; i < numReadings; i++) {
    // read the analog in value:
    int sensorValue = analogRead(PSI_IN);
    float voltage = sensorValue * (5.0 / 1023.0);
    float ohms = 250; //that's what we're using in the circuit
    float milliamps = (voltage / ohms) * 1000;
    float psi = mapValue(milliamps);
    
    // subtract the last reading:
    total = total - readings[index];         
    // read from the sensor:  
    readings[index] = psi; 
    // add the reading to the total:
    total = total + readings[index];       
    // advance to the next position in the array:  
    index = index + 1;                    
  
    // if we're at the end of the array...
    if (index >= numReadings)              
      // ...wrap around to the beginning: 
      index = 0;                           
  
    // calculate the average:
    psiAvg = total / numReadings;
    
    delay(2);
  }


  /* ====================================
   * DRUM TEMP WITH IR SENSOR
   * ----------------------------------*/
   float drumTemp = (tmp007.readObjTempC() * 9/5) + 32;
   float roomTemp = (tmp007.readDieTempC() * 9/5) + 32;


  /* ====================================
   * HUMIDITY AND TEMP
   * ----------------------------------*/
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  // ...so we only read it every other iteration
  //if (iteration == 2) {
  //  humidity = dht.readHumidity();
  //  roomTemp = dht.readTemperature(true);  //read as fahrenheit (true)
  //  iteration = 1; //reset for next time around
  //}
  //else {
  //  iteration++;
  //}
  
//  Serial.print("iteration:");
//  Serial.println(iteration);
  
  // Compute heat index
  //float heatIndex = 0;
  //if (!isnan(humidity) && !isnan(roomTemp)) {
  //  heatIndex = dht.computeHeatIndex(roomTemp, humidity);
  //}

  //if(isnan(humidity)) humidity = 0;
  //if(isnan(roomTemp)) roomTemp = 0;

  /* ====================================
   * BAROMETER AND ALTITUDE
   * ----------------------------------*/
  //float pascals = baro.getPressure();
  //float inchesHg = pascals/3377;
  //float altitudeMeters = baro.getAltitude();
  //float roomTemp2 = (baro.getTemperature() * 1.8) + 32.0;


  //LOG
  Serial.print("{");
  Serial.print("\"bt\":");
  Serial.print(beanTemp);
  Serial.print(", \"dt\":");
  Serial.print(drumTemp);
  Serial.print(", \"psi\":");
  Serial.print(psiAvg);
//  Serial.print(", \"humidity\":");
//  Serial.print(humidity);  
  Serial.print(", \"rt\":");
  Serial.print(roomTemp);  
//  Serial.print(", \"heatIndex\":");
//  Serial.print(heatIndex);    
//  Serial.print(", \"inchesHg\":");
//  Serial.print(inchesHg);    
//  Serial.print(", \"altitudeMeters\":");
//  Serial.print(altitudeMeters);    
//  Serial.print(", \"roomTemp2\":");
//  Serial.print(roomTemp2);    
  Serial.println("}");
  
  int finish = millis();
  int toDelay = 1000 - (2 * numReadings) - (finish - start);
  if (toDelay > 0) delay(toDelay);  
}

float mapValue(float milliamps) {
  float inMin = 4.0;  //milliamps range is 4-20ma
  float inMax = 20.0;
  float outMin = 0.0;  //PSI range is 0-5 PSI
  float outMax = 5.0;
  
  float psi = (milliamps - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  return psi;  // * 27.67990484;  //wc per PSI
}

