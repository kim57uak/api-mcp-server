// src/config/serviceConfig.js

export const apiUrls = {
  packageApiBase:
    process.env.PKG_API_BASE_URL || "http://pkgapiqa.hanatour.com:8082",
  olsQaBase:
    process.env.PKG_OLS_BASE_URL || "http://pkgolsqa.hanatour.com:8081",
  olsBase: process.env.OLS_BASE_URL || "http://pkgolsdev.hanatour.com:8081", // Retained if needed in future
  commonOlsBase:
    process.env.COMMON_OLS_BASE_URL || "http://comolsdev.hanatour.com:8081",
};

export const defaultApiParams = {
  commonCodeLang: "ko-KR",
};
