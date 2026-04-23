const defaultApiHost = "https://alexdee-loe-24-server-1d15.twc1.net/";
const configuredHost = import.meta.env.VITE_API_HOST?.trim() || defaultApiHost;

export const API_HOST = configuredHost.endsWith("/")
  ? configuredHost
  : `${configuredHost}/`;
