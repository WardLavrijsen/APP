import React from "react";
import "./RangeBar.css";
import { ResponsiveBullet } from "@nivo/bullet";

const data = [
  {
    id: "",
    ranges: [20, 40, 70, 100],
    measures: [0],
    markers: [62],
  },
];

const RangeBar = function () {
  return (
    <div className="range-bar">
      <ResponsiveBullet
        data={data}
        margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
        spacing={42}
        titlePosition="after"
        titleOffsetX={-53}
        rangeBorderColor={{ from: "color", modifiers: [] }}
        measureSize={0.1}
        markerSize={1.5}
        measureColors="#ffffff"
        markerColors="#000000"
        rangeColors={["#27ae60", "#F1C40F", "#F39C12", "#C0392B"]}
      />
    </div>
  );
};

export default RangeBar;
