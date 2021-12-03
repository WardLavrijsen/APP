import { ResponsiveLine } from "@nivo/line";
import React from "react";
import "./LineGraph.css";
const LineGraph = function (props) {
  return (
    <div className="graph">
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          textAlign: "center",
          transform: "translateY(20px)",
        }}
      >
        Power Usage
      </h2>
      <ResponsiveLine
        data={props.data}
        margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 3,
          tickRotation: 0,
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Energy usage",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={props.color}
        lineWidth={4}
        pointSize={2}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={8}
        pointBorderColor={{ from: "color", modifiers: [] }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.35}
        useMesh={true}
      />
    </div>
  );
};

export default LineGraph;
