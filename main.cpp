#include <iostream>
#include <hx711/common.h>
#include <chrono>

int main() {

  using namespace HX711;
  using std::chrono::milliseconds;

  // create a SimpleHX711 object using GPIO pin 5 as the data pin,
  // GPIO pin 6 as the clock pin, -370 as the reference unit, and
  // -367471 as the offset
  SimpleHX711 hx(5, 6, -47461, -38023);

  // set the scale to output weights in ounces
   hx.setUnit(Mass::Unit::LB);

  // constantly output weights using the median of 35 samples
  for(;;) std::cout << hx.weight(milliseconds(100)) << std::endl; //eg. 1.08 oz

  return 0;

}