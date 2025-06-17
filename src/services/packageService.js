// src/services/scheduleService.js
// Placeholder for business logic related to schedules.
// In a real application, this service would handle data fetching, validation, etc.

import axios from "axios";
import logger from "../utils/logger.cjs";
import {
  apiUrls,
  codeMappings,
  defaultApiParams,
} from "../config/serviceConfig.js";

// Modified findBestCodeByQuery to accept codeMap as a parameter
function findBestCodeByQuery(query, codeMap) {
  const lowerQuery = query.toLowerCase();
  logger.info(`findBestCodeByQuery : lowerQuery : ${lowerQuery}`);
  for (const { code, keywords } of codeMap) {
    // Use the passed codeMap
    logger.info(
      `findBestCodeByQuery : code  = ${code} ,keywords = ${keywords},lowerQuery = ${lowerQuery}`
    );
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      return code;
    }
  }
  return null;
}

export const packageService = {
  getSchedules: async (saleProdCd) => {
    logger.info(
      `Executing getSchedules with params: ${JSON.stringify({ saleProdCd })}`
    );
    try {
      // 실제 API 호출
      const url = `${apiUrls.packageApiBase}/api/v2/platform/pkg/sale-products/${saleProdCd}/schedules`;
      const res = await axios.get(url);
      logger.info(
        `getSchedules completed successfully with result: ${JSON.stringify(
          res.data
        )}`
      );
      return res.data;
    } catch (error) {
      logger.error(`Error in getSchedules: ${error.message}`, {
        error: error.stack,
      });
      // console.error("[Service] GET API 호출 실패:", err.message); // Original console log
      throw error;
    }
  },

  updateSchedule: async (saleProdCd, name) => {
    logger.info(
      `Executing updateSchedule with params: ${JSON.stringify({
        saleProdCd,
        name,
      })}`
    );
    try {
      // 실제 API 호출
      const url = `${apiUrls.packageApiBase}/api/v2/platform/pkg/sale-products/schedules/update`;
      const res = await axios.post(url, { saleProdCd, name });
      logger.info(
        `updateSchedule completed successfully with result: ${JSON.stringify(
          res.data
        )}`
      );
      return res.data;
    } catch (error) {
      logger.error(`Error in updateSchedule: ${error.message}`, {
        error: error.stack,
      });
      // console.error("[Service] POST API 호출 실패:", err.message); // Original console log
      throw error;
    }
  },
  getCommonCodeByQuery: async (query) => {
    logger.info(
      `Executing getCommonCodeByQuery with params: ${JSON.stringify({ query })}`
    );
    try {
      const url = `${apiUrls.commonOlsBase}/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00`;
      const res = await axios.post(url, {
        comBscCd: query,
        header: {
          langCode: defaultApiParams.commonCodeLang, // Use configured lang code
        },
      });
      const result = { query, data: res.data };
      logger.info(
        `getCommonCodeByQuery completed successfully with result: ${JSON.stringify(
          result
        )}`
      );
      return result;
    } catch (error) {
      logger.error(`Error in getCommonCodeByQuery: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
  getBasicCommonCodeByQuery: async (query) => {
    logger.info(
      `Executing getCommonCodeByQuery with params: ${JSON.stringify({ query })}`
    );
    try {
      const url = `${apiUrls.commonOlsBase}/common/ols/codemgt/cbc/commoncodemgt/getComBscCdList/v1.00`;
      const res = await axios.post(url, {
        comBscCd: query,
        header: {
          langCode: defaultApiParams.commonCodeLang, // Use configured lang code
        },
      });
      const result = { query, data: res.data };
      logger.info(
        `getCommonCodeByQuery completed successfully with result: ${JSON.stringify(
          result
        )}`
      );
      return result;
    } catch (error) {
      logger.error(`Error in getCommonCodeByQuery: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
