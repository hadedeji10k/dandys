import axios from "axios";
import {
  runtimeEnvironment,
  devBaseUrl,
  prodBaseUrl,
  dandysToken,
} from "../constant";
import { decode } from "../helpers";

export const baseURL = runtimeEnvironment === "dev" ? devBaseUrl : prodBaseUrl;

console.log("Hello base", runtimeEnvironment, baseURL)

const API = axios.create({ baseURL });

API.interceptors.request.use(async (req: any) => {
  const userToken = window.localStorage.getItem(dandysToken)
  const encodedToken = JSON.parse(userToken as string)?.value
  const token = decode(encodedToken!);

  req.headers.Authorization = `Bearer ${token}`;
  req.headers["x-access-token"] = token;
  req.headers["x-client-type"] = "web";

  return req;
});

export default API;
