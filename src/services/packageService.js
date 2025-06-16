// src/services/scheduleService.js
// Placeholder for business logic related to schedules.
// In a real application, this service would handle data fetching, validation, etc.

import axios from "axios";
import logger from '../utils/logger.cjs';

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
    logger.info(`Executing getSchedules with params: ${JSON.stringify({ saleProdCd })}`);
    try {
      // 실제 API 호출
      const url = `${BASE_URL}/api/v2/platform/pkg/sale-products/${saleProdCd}/schedules`;
      const res = await axios.get(url);
      logger.info(`getSchedules completed successfully with result: ${JSON.stringify(res.data)}`);
      return res.data;
    } catch (error) {
      logger.error(`Error in getSchedules: ${error.message}`, { error: error.stack });
      // console.error("[Service] GET API 호출 실패:", err.message); // Original console log
      throw error;
    }
  },

  updateSchedule: async (saleProdCd, name) => {
    logger.info(`Executing updateSchedule with params: ${JSON.stringify({ saleProdCd, name })}`);
    try {
      // 실제 API 호출
      const url = `${BASE_URL}/api/v2/platform/pkg/sale-products/schedules/update`;
      const res = await axios.post(url, { saleProdCd, name });
      logger.info(`updateSchedule completed successfully with result: ${JSON.stringify(res.data)}`);
      return res.data;
    } catch (error) {
      logger.error(`Error in updateSchedule: ${error.message}`, { error: error.stack });
      // console.error("[Service] POST API 호출 실패:", err.message); // Original console log
      throw error;
    }
  },
  getCommonCodeByQuery: async (query) => {
    logger.info(`Executing getCommonCodeByQuery with params: ${JSON.stringify({ query })}`);
    try {
      const code = findBestCodeByQuery(query);
      if (!code) throw new Error("적합한 코드를 찾을 수 없습니다.");

      const url = `${COMMON_OLS_BASE_URL}/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00`;
      const res = await axios.post(url, {
        comBscCd: code,
        header: {
          langCode: "ko-KR",
        },
      });
      const result = { code, data: res.data };
      logger.info(`getCommonCodeByQuery completed successfully with result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      logger.error(`Error in getCommonCodeByQuery: ${error.message}`, { error: error.stack });
      throw error;
    }
  },
};
