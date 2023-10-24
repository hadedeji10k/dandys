export const dandysToken = "dDys_^U&T";
export const runtimeEnvironment =
  import.meta.env.VITE_APP_RUNTIME_ENVIRONMENT || "dev";

//dev
export const devBaseUrl =
  import.meta.env.VITE_APP_DEV_BASE_URL || "http://localhost:6006";

//prod
export const prodBaseUrl =
  import.meta.env.VITE_APP_PROD_BASE_URL || "https://dandys.server";