import axios from "axios";

const control = axios.create({
    baseURL: "http://localhost:8085/",
});

export default control;
