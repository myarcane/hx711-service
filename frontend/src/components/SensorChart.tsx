import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Row, Container } from "react-bootstrap";

type sensorDataT = {
  value: number;
};

type chartDataT = {
  id: string;
  sensorData: number;
};

type messageDataT = {
  date: string;
  sensorData: sensorDataT;
};

export const SensorChart = () => {
  const ws = useRef<ReconnectingWebSocket>();
  const [data, setData] = useState<chartDataT[]>([]);

  useEffect(() => {
    console.log("render chart");
    //Send request to our websocket server using the "/request" path
    ws.current = new ReconnectingWebSocket("ws://10.0.0.88:8000/ws");

    ws.current.onmessage = (e: MessageEvent) => {
      console.log("message event", e.data);
      let weight: string | number = e.data;
      weight = (weight as string).replace("lb", "").trim();
      weight = Math.round(parseFloat(weight));

      if (weight > 0) {
        const message: messageDataT = {
          date: Date.now().toString(),
          sensorData: { value: weight },
        };
        console.log(`Received message :: ${message.sensorData.value}`);
        // Upon receiving websocket message then add it to the list of data that we are displaying
        //   let newDataArray = [
        //     ...data,
        //     {
        //       id: message.date,
        //       sensorData: message.sensorData,
        //     },
        //   ];
        //   console.log(newDataArray);
        setData((currentData) => limitData(currentData, message));
      }
    };
    ws.current.onclose = () => {
      console.log("Client socket close!");
    };

    ws.current.onerror = (error) => {
      console.log("Socket Error: ", error);
    };

    //We limit the number of reads to the last 24 reading and drop the last read
    function limitData(currentData: chartDataT[], message: messageDataT) {
      // if (currentData.length > 24) {
      //   console.log("Limit reached, dropping first record!");
      //   currentData.shift();
      // }
      return [
        ...currentData,
        {
          id: message.date,
          sensorData: message.sensorData.value,
        },
      ];
    }

    return () => {
      console.log("Cleaning up! ");
      ws.current?.close();
    };
  }, []);

  const formatterY = (value: string) => `${value}kg`;
  const formatterX = (value: string) => `${parseInt(value) / 10}s`;
  const formatterBodyWeight = (value: string) =>
    `${Math.round((parseFloat(value) / 68) * 100)}%`;

  //Display the chart using rechart.js
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="p-3">
        {/* <Row className="justify-content-md-center">
          <h3 className="header">Max half crimp finger strength (left hand)</h3>
        </Row> */}
        <Row className="justify-content-md-center">
          <div style={{ width: 1000, height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                width={800}
                height={400}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tickFormatter={formatterX} />
                <YAxis yAxisId="left-axis" tickFormatter={formatterY} />
                <YAxis
                  yAxisId="right-axis"
                  tickFormatter={formatterBodyWeight}
                  orientation="right"
                />
                {/* <Legend content={null} /> */}
                <Tooltip />
                <Line
                  yAxisId="left-axis"
                  type="monotone"
                  dataKey="sensorData"
                  stroke="#8884d8"
                  activeDot={{ r: 24 }}
                  strokeWidth="4"
                />
                <Line
                  yAxisId="right-axis"
                  type="monotone"
                  dataKey="sensorData"
                  label=""
                  stroke="#8884d8"
                  activeDot={{ r: 24 }}
                  strokeWidth="4"
                />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Row>
      </Container>
    </div>
  );
};
