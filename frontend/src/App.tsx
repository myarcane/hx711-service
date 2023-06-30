import { SensorChart } from "./components/SensorChart.tsx";
import { TopNavBar } from "./components/TopNavBar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <TopNavBar />
      <SensorChart />
    </>
  );
}

export default App;
