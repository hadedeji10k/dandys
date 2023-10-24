import jwt_decode from "jwt-decode";
import { dandysToken } from "./constant";

export const encode = (jwt: string) => {
  if (typeof jwt === "string") {
    const [header, payload, signature] = jwt.split(".");

    const encodedHeader = btoa(header);
    const encodedPayload = btoa(payload);
    const encodedSig = btoa(signature);

    return btoa(`${encodedHeader}::${encodedPayload}::${encodedSig}`);
  }

  return;
};

export const decode = (text: string) => {
  if (typeof text === "string") {
    const decodedText = atob(text);
    const [header, payload, signature] = decodedText.split("::");

    const decodedHeader = atob(header);
    const decodedPayload = atob(payload);
    const decodedSig = atob(signature);
    return `${decodedHeader}.${decodedPayload}.${decodedSig}`;
  }

  return;
};

export const localGetUserId = (): number | null => {
  const encodedToken = window.localStorage.getItem(dandysToken);
  const token = decode(encodedToken!);

  const decoded = jwt_decode(token!) as any;

  return decoded.id;
};

export const getLocalAccessToken = () => {
  const encodedToken = window.localStorage.getItem(dandysToken);
  return decode(encodedToken!);
};
