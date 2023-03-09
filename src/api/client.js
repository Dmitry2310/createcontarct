import { create } from "apisauce";
import authStorage from "../auth/authStorage";
import baseURL from "./baseURL";

export const api = create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

api.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
});

export const processor = create({
  baseURL: baseURL,
  responseType: "arraybuffer"
});

processor.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
});