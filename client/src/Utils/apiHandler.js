import axios from "axios";

const colors = [
  "#00B894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
  "#00B894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
  "#00B894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
  "#00B894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
  "#00B894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
];

const GetData = async function (setUser, setDevices) {
  try {
    const token = localStorage.getItem("authtoken");
    if (token) {
      let res = await axios.get("/api/getuserdata", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      res.data.data.user.devices = res.data.data.user.devices.map(
        (device, i) => {
          return { ...device, color: colors[i] };
        }
      );
      setUser(res.data.data.user);
      setDevices(res.data.data.user.devices);
    } else {
    }
  } catch (err) {
    console.log(err);
  }
};

export default GetData;
