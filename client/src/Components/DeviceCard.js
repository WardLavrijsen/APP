import React from "react";
import "./DeviceCard.css";
import { IoPower } from "react-icons/io5";

const DeviceCard = function ({ data, callback }) {
  //   const powerButton = function () {};

  return (
    <div
      onClick={callback.bind(this, data.id)}
      style={{ border: `4px solid ${data.cardColor}` }}
      className="device-card"
    >
      <div style={{ backgroundColor: data.cardColor }} className="block"></div>
      <button
        className="device-button"
        onClick={() => console.log("Button Clicked")}
        device-card
      >
        <IoPower className="power-icon" />
      </button>
      <h2 className="device-name">{data.name}</h2>
      <div style={{ backgroundColor: data.powerColor }} className="power-card">
        <h3 className="power-data-label">{`${data.power} ${
          data.power === "No Data" ? "" : " W"
        }`}</h3>
      </div>
    </div>
  );
};

export default DeviceCard;
