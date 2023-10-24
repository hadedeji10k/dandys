import axios from "axios";
import {
  runtimeEnvironment,
  devBaseUrl,
  prodBaseUrl,
  dandysToken,
} from "../constant";
import { decode } from "../helpers";

export const baseURL = runtimeEnvironment === "dev" ? devBaseUrl : prodBaseUrl;

const API = axios.create({ baseURL });

API.interceptors.request.use(async (req: any) => {
  const encodedToken = window.localStorage.getItem(dandysToken);
  const token = decode(encodedToken!);

  req.headers.Authorization = `Bearer ${token}`;
  req.headers["x-access-token"] = token;
  req.headers["x-client-type"] = "web";

  return req;
});

export default API;
