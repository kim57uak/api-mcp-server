// src/services/scheduleService.js
// Placeholder for business logic related to schedules.
// In a real application, this service would handle data fetching, validation, etc.

import axios from "axios";

const BASE_URL = "http://pkgapiqa.hanatour.com:8082";
const OLS_BASE_URL = "http://pkgolsdev.hanatour.com:8081";
const COMMON_OLS_BASE_URL = "http://comolsdev.hanatour.com:8081";

const CODE_MAP = [
  { code: "PROD_ATTR_CD", keywords: ["속성", "product attribute"] },
  {
    code: "AREA_CD",
    keywords: ["지역 or 국가 or대륙코드", "area or country or continent"],
  },
  { code: "PROD_BRND_CD", keywords: ["브랜드", "brand"] },
];

function findBestCodeByQuery(query) {
  const lowerQuery = query.toLowerCase();
  console.log("lowerQuery : ", lowerQuery);
  for (const { code, keywords } of CODE_MAP) {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      return code;
    }
  }
  return null;
}

export const packageService = {
  getSchedules: async (saleProdCd) => {
    // 실제 API 호출
    const url = `${BASE_URL}/api/v2/platform/pkg/sale-products/${saleProdCd}/schedules`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error("[Service] GET API 호출 실패:", err.message);
      throw err;
    }
  },

  updateSchedule: async (saleProdCd, name) => {
    // 실제 API 호출
    const url = `${BASE_URL}/api/v2/platform/pkg/sale-products/schedules/update`;
    try {
      const res = await axios.post(url, { saleProdCd, name });
      return res.data;
    } catch (err) {
      console.error("[Service] POST API 호출 실패:", err.message);
      throw err;
    }
  },
  getCommonCodeByQuery: async (query) => {
    const code = findBestCodeByQuery(query);
    if (!code) throw new Error("적합한 코드를 찾을 수 없습니다.");

    const url = `${COMMON_OLS_BASE_URL}/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00`;
    const res = await axios.post(url, {
      comBscCd: code,
      header: {
        langCode: "ko-KR",
      },
    });
    return { code, data: res.data };
  },
};
