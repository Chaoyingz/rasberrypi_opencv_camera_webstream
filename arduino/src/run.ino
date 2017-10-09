#include "Arduino.h"
#include "SCoop.h"


int Trig  = 2;
int Echo = 3;


int pinI1=3;
int pinI2=4;
int pinI3=5;
int pinI4=6;


long duration, cm; 
    
void setup() {
	mySCoop.start();
}

void loop() {
	yield();
}

defineTask(UWave);
void UWave::setup() {  
	Serial.begin(9600);  
	pinMode(Trig, OUTPUT);  
	pinMode(Echo, INPUT);  
}  

void UWave::loop() {  

	digitalWrite(Trig, LOW); 
	delayMicroseconds(5);     
	digitalWrite(Trig,HIGH);   
	delayMicroseconds(10);   
	digitalWrite(Trig, LOW);  

	duration = pulseIn(Echo, HIGH); 

	cm = (duration/2) / 29.1;
	
	Serial.print(cm);
	Serial.println("cm");

	delay(1000); 
}   


defineTask(CarControl);

void CarControl::setup() {

Serial.begin(9600);

	pinMode(pinI1,OUTPUT);
	pinMode(pinI2,OUTPUT);
	pinMode(pinI3,OUTPUT);
	pinMode(pinI4,OUTPUT);
}

void CarControl::loop() 
  {
  if ( Serial.available() )
  {
	char c = Serial.read();
	if (c == 'w'){
	digitalWrite(pinI4, LOW);
	digitalWrite(pinI3, HIGH);
	digitalWrite(pinI1, LOW);
	digitalWrite(pinI2, HIGH);
	} else if (c == 's'){
	digitalWrite(pinI4, HIGH);
	digitalWrite(pinI3, LOW);
	digitalWrite(pinI2, LOW);
	digitalWrite(pinI1, HIGH);
	} else if (c == 'a'){
	digitalWrite(pinI4, LOW);
	digitalWrite(pinI3, HIGH);
	digitalWrite(pinI2, LOW);
	digitalWrite(pinI1, LOW);
	} else if (c == 'd'){
	digitalWrite(pinI4, LOW);
	digitalWrite(pinI3, LOW);
	digitalWrite(pinI2, HIGH);
	digitalWrite(pinI1, LOW);
	} else if (c == 'p'){
	digitalWrite(pinI4, LOW);
	digitalWrite(pinI3, LOW);
	digitalWrite(pinI2, LOW);
	digitalWrite(pinI1, LOW);
	}

  } 
}

