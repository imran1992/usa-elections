import Axios from "axios";
const axios = Axios.create({
  baseURL: "https://lemotivate.com",
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const fetchStats = () => {
  return axios.get("/Election/ajax");
};

export default { fetchStats };
