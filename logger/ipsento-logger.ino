/* ====================================
 * THERMOCOUPLE AMP
 * ----------------------------------*/
#include <SPI.h>
#include "Adafruit_MAX31855.h"

#define TC_DO   3
#define TC_CS   4
#define TC_CLK  5
Adafruit_MAX31855 thermocouple(TC_CLK, TC_CS, TC_DO);

/* ====================================
 * PRESSURE GAUGE
 * ----------------------------------*/
#define PSI_IN  5

/* ====================================
 * HUMIDITY AND TEMP
 * ----------------------------------*/
#include "DHT.h"

#define DHTPIN 13     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)

// Initialize DHT sensor for normal 16mhz Arduino
DHT dht(DHTPIN, DHTTYPE);


/* ====================================
 * BAROMETER
 * ----------------------------------*/
#include <Wire.h>
#include <Adafruit_MPL3115A2.h>

// Power by connecting Vin to 3-5V, GND to GND
// Uses I2C - connect SCL to the SCL pin, SDA to SDA pin
// See the Wire tutorial for pinouts for each Arduino
// http://arduino.cc/en/reference/wire
Adafruit_MPL3115A2 baro = Adafruit_MPL3115A2();


/* ====================================
 * FIELDS
 * ----------------------------------*/
int iteration = 1;
float humidity = 0;
float roomTemp = 0;

void setup(void) {
  Serial.begin(9600);
  //Serial.println("...Ipsento Data Logger...");
  dht.begin();
  baro.begin();
  //analogReference(INTERNAL);
}

void loop(void) { 
  delay(1000);
  
  /* ====================================
   * THERMOCOUPLE 1 - bean temp
   * ----------------------------------*/
  float beanTemp = thermocouple.readFarenheit();
  if (isnan(beanTemp)) beanTemp = 0;

  /* ====================================
   * THERMOCOUPLE 2 - outside drum temp
   * ----------------------------------*/
  //float drumTemp = thermocouple2.readFarenheit();
  float drumTemp = 200.0;
  if (isnan(drumTemp)) drumTemp = 0;
  
  /* ====================================
   * PRESSURE GAUGE
   * ----------------------------------*/
  float psi = analogRead(PSI_IN);

  /* ====================================
   * HUMIDITY AND TEMP
   * ----------------------------------*/
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  // ...so we only read it every other iteration
  if (iteration == 2) {
    humidity = dht.readHumidity();
    roomTemp = dht.readTemperature(true);  //read as fahrenheit (true)
    iteration = 1; //reset for next time around
  }
  else {
    iteration++;
  }
  
//  Serial.print("iteration:");
//  Serial.println(iteration);
  
  // Compute heat index
  float heatIndex = 0;
  if (!isnan(humidity) && !isnan(roomTemp)) {
    heatIndex = dht.computeHeatIndex(roomTemp, humidity);
  }

  if(isnan(humidity)) humidity = 0;
  if(isnan(roomTemp)) roomTemp = 0;

  /* ====================================
   * BAROMETER AND ALTITUDE
   * ----------------------------------*/
  float pascals = baro.getPressure();
  float inchesHg = pascals/3377;
  float altitudeMeters = baro.getAltitude();
  float roomTemp2 = (baro.getTemperature() * 1.8) + 32.0;


  //LOG
  Serial.print("{");
  Serial.print("\"tc\":");
  Serial.print(beanTemp);
  Serial.print(", \"psi\":");
  Serial.print(psi);
  Serial.print(", \"humidity\":");
  Serial.print(humidity);  
  Serial.print(", \"roomTemp\":");
  Serial.print(roomTemp);  
  Serial.print(", \"heatIndex\":");
  Serial.print(heatIndex);    
  Serial.print(", \"inchesHg\":");
  Serial.print(inchesHg);    
  Serial.print(", \"altitudeMeters\":");
  Serial.print(altitudeMeters);    
  Serial.print(", \"roomTemp2\":");
  Serial.print(roomTemp2);    
  Serial.println("}");
  
}
