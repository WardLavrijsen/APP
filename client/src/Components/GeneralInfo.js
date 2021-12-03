import React from "react";
import RangeBar from "./Graphs/RangeBar";
import "./Graphs/RangeBar.css";

const GeneralInfo = function () {
  return (
    <div className="general-box">
      <div className="text-items">
        <h1 className="kosten-test">Kosten: €3,50</h1>
        <h1 className="kosten-test">Uitstoot: 30kg</h1>
      </div>
      <div className="range-bar-box">
        <RangeBar />
      </div>
    </div>
  );
};

export default GeneralInfo;
