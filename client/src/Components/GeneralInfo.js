import React from "react";
import RangeBar from "./Graphs/RangeBar";
import "./Graphs/RangeBar.css";

const GeneralInfo = function (props) {
  return (
    <div className="general-box">
      <div className="text-items">
        <h1 className="kosten-test">Power State: ON</h1>
        <h1 className="kosten-test">Verbruik: 432 W</h1>
        <h1 className="kosten-test">Kosten: €3,50</h1>
        <h1 className="kosten-test">Uitstoot: 30 kg</h1>
      </div>
      <div className="range-bar-box">
        <RangeBar marker={56} />
      </div>
    </div>
  );
};

export default GeneralInfo;
