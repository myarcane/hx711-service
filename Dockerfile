
FROM golang:1.20.4

RUN apt-get update && apt-get install -y \
    git \
    wget \
    unzip

# Set the working directory
WORKDIR /app

# Install GO hx711 service
COPY backend/. ./
RUN go mod download
RUN go build -o main .

# Install lgpio C++ dependency
RUN wget http://abyz.me.uk/lg/lg.zip && \
    unzip lg.zip && \
    rm lg.zip && \
    cd lg && \
    make && \
    make install && \
    cd ..

# Install hx711 C++ dependency
RUN git clone https://github.com/myarcane/hx711 && \
    cd hx711 && \
    make && \
    make install

ENV LD_LIBRARY_PATH="/usr/local/lib"

# Install the small C++ scale program
COPY main.cpp ./
RUN g++ -Wall -o prog main.cpp -lhx711 -llgpio

# Expose port 8000
EXPOSE 8000

CMD ["/app/main"]