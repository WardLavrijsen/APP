import React from "react";
import "./Header.css";
import { FiPlusSquare, FiSettings, FiLogOut } from "react-icons/fi";

const Header = function () {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img src="./Pmu-logo.png" className="logo"></img>
      <div className="dashboardText">PMU Dashboard</div>
      <div className="addDevice">
        <FiPlusSquare className="scanIcon" />
        <div
          style={{ color: "white", fontSize: "1.7rem", whiteSpace: "nowrap" }}
        >
          Add device
        </div>
      </div>

      <div className="settings">
        <FiSettings className="settingIcon" />
        <div
          style={{ color: "#316526", fontSize: "1.7rem", whiteSpace: "nowrap" }}
        >
          Settings
        </div>
      </div>

      <div className="logOut">
        <FiLogOut className="logOutIcon" />
        <div
          style={{ color: "white", fontSize: "1.7rem", whiteSpace: "nowrap" }}
        >
          Log out
        </div>
      </div>
    </div>
  );
};

export default Header;
