// src/services/scheduleService.js
// Placeholder for business logic related to schedules.
// In a real application, this service would handle data fetching, validation, etc.

import axios from "axios";

const BASE_URL = "http://pkgapiqa.hanatour.com:8082";
const OLS_BASE_URL = "http://pkgolsdev.hanatour.com:8081";

const CODE_MAP = [
  { code: "CODE01", keywords: ["국가", "country"] },
  { code: "CODE02", keywords: ["상품타입", "product type"] },
  { code: "CODE03", keywords: ["도시", "city"] },
  { code: "CODE04", keywords: ["테마", "theme"] },
  { code: "CODE05", keywords: ["카테고리", "category"] },
  { code: "CODE06", keywords: ["언어", "language"] },
  { code: "CODE07", keywords: ["통화", "currency"] },
  { code: "CODE08", keywords: ["지불", "payment"] },
  { code: "CODE09", keywords: ["상태", "status"] },
  { code: "CODE10", keywords: ["등급", "grade"] },
  { code: "CODE11", keywords: ["타입", "type"] },
  { code: "CODE12", keywords: ["옵션", "option"] },
  { code: "CODE13", keywords: ["구분", "division"] },
  { code: "CODE14", keywords: ["구성", "composition"] },
  { code: "CODE15", keywords: ["구매", "purchase"] },
  { code: "CODE16", keywords: ["판매", "sale"] },
  { code: "CODE17", keywords: ["예약", "reservation"] },
  { code: "CODE18", keywords: ["출발", "departure"] },
  { code: "CODE19", keywords: ["도착", "arrival"] },
  { code: "CODE20", keywords: ["기타", "etc"] },
];

function findBestCodeByQuery(query) {
  const lowerQuery = query.toLowerCase();
  for (const { code, keywords } of CODE_MAP) {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      return code;
    }
  }
  return null;
}

export const scheduleService = {
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
    const url = `${BASE_URL}/api/v2/platform/code/${code}`;
    const res = await axios.get(url);
    return { code, data: res.data };
  },
};
