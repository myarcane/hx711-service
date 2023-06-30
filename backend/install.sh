#!/bin/bash

set -e

echo "Cleaning hx711 dependency"
rm -f prog
rm -rf hx711
echo "Cloning hx711 dependency"
git clone https://github.com/myarcane/hx711
cd hx711
echo "Installing hx711 dependency"
sudo ./install-deps.sh
make && sudo make install
echo "hx711 dependency installed"
cd ..
g++ -Wall -o prog main.cpp -lhx711 -llgpio
echo "hx711 ready to use!"