import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/medify",
  headers: {
    "Content-type": "application/json",
    //"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials":true,
    "mode": "no-cors"
  }
});