import React from "react";
import "./RangeBar.css";
import { ResponsiveBullet } from "@nivo/bullet";

const RangeBar = function (props) {
  return (
    <div className="range-bar">
      <ResponsiveBullet
        data={[
          {
            id: "",
            ranges: [20, 40, 70, 100],
            measures: [0],
            markers: [props.marker],
          },
        ]}
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

class Persoon {
  cijfer;
  constructor(naam, leeftijd, adres) {
    this.naam = naam;
    this.leeftijd = leeftijd;
    this.adres = adres;
    this.id = Math.random(0, 1);
  }
  voorstellen() {
    console.log(`hoi ik ben ${this.naam} en ik ben ${this.leeftijd} jaar oud.`);
  }
}

const Jorn = new Persoon("Jorn", 19, "hier");
Jorn.voorstellen();
