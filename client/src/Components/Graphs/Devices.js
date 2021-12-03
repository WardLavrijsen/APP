import React from "react";
import DeviceCard from "../DeviceCard";

const Devices = function ({ devices, setCurrentDevice }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {devices.map((device) => {
        const id = device.id;
        let power;
        if (device.archive[device.archive.length - 1]) {
          power = device.archive[device.archive.length - 1].power;
        } else {
          power = "No Data";
        }
        return (
          <DeviceCard
            callback={(clickedDeviceId) =>
              setCurrentDevice(
                devices.find((device) => device.id === clickedDeviceId)
              )
            }
            key={id}
            data={{
              cardColor: device.color,
              powerColor: "#F39C12",
              power: power,
              name: device.name,
              id,
            }}
          />
        );
      })}
    </div>
  );
};

export default Devices;
