import React from "react";
import "./PieChart.css";
import { ResponsivePie } from "@nivo/pie";

const PieChart = function (props) {
  let totalpower;
  if (props.data !== []) {
    totalpower = props.data.reduce(
      (total, device) =>
        total + (device.value === "No Data" ? 0 : device.value),
      0
    );
  }
  return (
    <div className="piegraph">
      <div className="overlay">
        <p className="powerusage">power usage:</p>
        <h2 className="wattamount">{totalpower}</h2>
        <h3 className="watts">Watts</h3>
      </div>
      <div className="piechart">
        <ResponsivePie
          data={props.data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.75}
          activeInnerRadiusOffset={2}
          activeOuterRadiusOffset={14}
          borderWidth={5}
          colors={[
            "#00B894",
            "#00cec9",
            "#0984e3",
            "#6c5ce7",
            "#fdcb6e",
            "#e17055",
            "#d63031",
            "#e84393",
          ]}
          borderColor={{ from: "color", modifiers: [["darker", "1"]] }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={0}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color", modifiers: [] }}
          enableArcLabels={false}
          arcLabel="value"
          arcLabelsRadiusOffset={0.45}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[]}
        />
      </div>
    </div>
  );
};

export default PieChart;
