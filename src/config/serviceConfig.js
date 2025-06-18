// src/config/serviceConfig.js

export const apiUrls = {
  packageApiBase:
    process.env.PKG_API_BASE_URL || "http://pkgapiqa.hanatour.com:8082",
  packageOlsBase:
    process.env.PKG_OLS_BASE_URL || "http://pkgolsqa.hanatour.com:8081",
  olsBase: process.env.OLS_BASE_URL || "http://pkgolsdev.hanatour.com:8081", // Retained if needed in future
  commonOlsBase:
    process.env.COMMON_OLS_BASE_URL || "http://comolsdev.hanatour.com:8081",
};

export const codeMappings = {
  codeMapArray: [
    { code: "PROD_ATTR_CD", keywords: ["속성", "상품속성", "attribute"] },
    {
      code: "AREA_CD",
      keywords: ["지역", "국가", "대륙", "area", "country", "continent"],
    },
    { code: "PROD_BRND_CD", keywords: ["브랜드", "brand"] },
  ],
};

export const defaultApiParams = {
  commonCodeLang: "ko-KR",
};
