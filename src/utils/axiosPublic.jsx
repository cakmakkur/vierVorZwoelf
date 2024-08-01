import axios from "axios";

const axiosPublic = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
