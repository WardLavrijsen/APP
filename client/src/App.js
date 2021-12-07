import "./App.css";
import LineGraph from "./Components/Graphs/LineGraph";
import PieChart from "./Components/Graphs/PieChart";
import GetData from "./Utils/apiHandler";
import Header from "./Components/Header";
import GeneralInfo from "./Components/GeneralInfo";
import { useEffect, useState } from "react";
import Devices from "./Components/Graphs/Devices";

function App() {
  const [user, setUser] = useState({});
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState({});

  useEffect(() => {
    GetData(setUser, setDevices);
  }, []);

  return (
    <div className="container">
      <div className="Pie">
        <PieChart
          data={devices.map((device) => {
            const power = device.archive[device.archive.length - 1]
              ? device.archive[device.archive.length - 1].power
              : "No Data";
            return { id: device.name, label: device.name, value: power };
          })}
        />
      </div>
      <div className="Header">
        <Header />
      </div>
      <div className="Time-Selector"></div>
      <div className="General-Info">
        <GeneralInfo />
      </div>
      <div className="Graph">
        {currentDevice.archive ? (
          <LineGraph
            data={[
              {
                id: currentDevice.name,
                data: currentDevice.archive.map((time) => {
                  const x = new Date(time.date).getSeconds();
                  return { x, y: time.power };
                }),
              },
            ]}
            color={currentDevice.color}
          />
        ) : (
          []
        )}
      </div>
      <div className="Devices">
        <Devices devices={devices} setCurrentDevice={setCurrentDevice} />
      </div>
      <div className="Postal-Info"></div>
      <div className="Footer">
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#34495e" }}
        ></div>
      </div>
    </div>
  );
}

export default App;
