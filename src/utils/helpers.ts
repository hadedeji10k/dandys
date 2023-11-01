import jwt_decode from "jwt-decode";
import { dandysToken } from "./constant";
import { format } from "date-fns";

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

export const formatDate = (dateString: Date | string) => {
  if (dateString === "" || dateString === undefined || dateString === null) {
    return 
  }
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd")
}


  // const downloadFile = (
  //   filename: string,
  //   mimeType: string,
  //   content: string
  // ) => {
  //   const url = URL.createObjectURL(
  //     new File([content], filename, { type: mimeType })
  //   );
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.setAttribute("download", filename);
  //   a.setAttribute("href", url);
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  // const handleDownload = (values: DownloadDetailsForm) => {
  //   setShowDownloadModal(false);
  //   if (values.inference) {
  //     let videoInputs = new Set(["WEB_CAMERA", "IP_CAMERA", "FILE"]);
  //     let sourceType = deployment?.deploymentInput?.inputSourceType || "-";
  //     if (deployment?.inferenceResults && !videoInputs.has(sourceType)) {
  //       downloadFile(
  //         "inferenceResults.json",
  //         "application/json",
  //         JSON.stringify(JSON.parse(deployment.inferenceResults), null, 2)
  //       );
  //     }
  //   }
  //   if (values.appDetails) {
  //     if (deployment) {
  //       const application = deployment?.applicationId
  //         ? projectData?.applications?.[deployment.applicationId]
  //         : undefined;
  //       const detailsBag = {
  //         application,
  //         project: projectData,
  //         test: deployment,
  //         intl,
  //       };
  //       const details = renderToObject(detailsBag);
  //       downloadFile(
  //         "applicationDetails.json",
  //         "application/json",
  //         JSON.stringify(details, null, 2)
  //       );
  //     }
  //   }
  // };