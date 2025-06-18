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
      //const url = `${apiUrls.packageApiBase}/api/v2/platform/pkg/sale-products/${saleProdCd}/schedules`;
      //const res = await axios.get(url);
      const url = `${apiUrls.packageApiBase}/pkg/api/common/pkgcomprod/getPkgProdItnrInfo/v1.00`;
      const res = await axios.post(url, {
        pkgCd: saleProdCd,
        header: {
          langCode: defaultApiParams.commonCodeLang, // Use configured lang code
        },
      });
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

  retrieveSaleProductInformation: async ({
    saleProdCd,
    resCd,
    startDate,
    endDate,
    prodAttrCd,
    prodAreaCd,
    saleProdNm,
    pageSize,
    pageNumber,
    totalRowCount,
    totalPageCount,
  }) => {
    const params = {
      saleProdCd,
      resCd,
      startDate,
      endDate,
      prodAttrCd,
      prodAreaCd,
      saleProdNm,
      pageSize,
      pageNumber,
      totalRowCount,
      totalPageCount,
    };
    logger.info(
      `Executing retrieveSaleProductInformation with params: ${JSON.stringify(
        params
      )}`
    );

    try {
      const url = `${apiUrls.packageOlsBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSaleProdBrwsTab/v1.00`;

      // 요청 본문을 동적으로 생성
      const requestBody = {
        saleProdBrwsTabQcInVo: {
          prodCdDv: "P", // 고정값
          prodCd: saleProdCd || "", // saleProdCd 값 사용 또는 빈 문자열
          prodSprtrCd: "",
          resCd: resCd || "", // resCd 값 사용 또는 빈 문자열
          prodAreaCd: prodAreaCd || "A1", // prodAreaCd 값 사용 (필수값)
          teamDvCd: "",
          arngRpprEmpn: "",
          mrchRpprEmpn: "",
          airRpprEmpn: "",
          dpurcRpprEmpn: "",
          depArrDvCd: "S", // 고정값
          strtDt: startDate, // startDate 값 사용 (필수값)
          endDt: endDate, // endDate 값 사용 (필수값)
          prodBrwsTypeCd: "",
          prodTypeCd: "",
          trnpTypeCd: "",
          allYn: "A", // 고정값
          sndyYn: "",
          monYn: "",
          tueYn: "",
          wedYn: "",
          thuYn: "",
          friYn: "",
          satYn: "",
          prodBrndCd: "",
          promCd: "",
          prodDvCd: "",
          thmCd: "",
          invPtnId: "",
          depAirCd: "",
          depFlgtCd: "",
          arrAirCd: "",
          arrFlgtCd: "",
          depCityCd: "",
          teamDeptCd: "",
          saleProdNm: saleProdNm || "", // saleProdNm 값 사용 또는 빈 문자열
          htlCd: "",
          landCd: "",
          adtAmt: "",
          bassFeeRate: null,
          ocrtFeeRate: null,
          afcnFeeRate: null,
          depoKndCd: "",
          prodAttrCd: prodAttrCd || "", // prodAttrCd 값 사용 또는 빈 문자열
          tempArngNm: "",
          tempMrchNm: "",
          tempAirNm: "",
          tempDpurcNm: "",
          tempCard: "",
          prodAreaEtcCd: "G", // 고정값
          scodInfo: "",
          cityCdInfo: "",
          agtCd: "",
          splyStaffAuth: "N",
        },
        body_pageVo: {
          pageSize: pageSize || 100,
          pageNumber: pageNumber || 1,
          totalRowCount: totalRowCount || 0,
          totalPageCount: totalPageCount || 0,
        },
        header: {
          langCode: defaultApiParams.commonCodeLang,
        },
      };

      logger.info(
        `retrieveSaleProductInformation completed successfully with result: ${JSON.stringify(
          requestBody
        )}`
      );

      const res = await axios.post(url, requestBody);
      logger.info(
        `retrieveSaleProductInformation completed successfully with result: ${JSON.stringify(
          res.data
        )}`
      );
      return res.data;
    } catch (error) {
      logger.error(
        `Error in retrieveSaleProductInformation: ${error.message}`,
        {
          error: error.stack,
        }
      );
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
  getDetailCommonCodeByQuery: async (query) => {
    logger.info(
      `Executing getDetailCommonCodeByQuery with params: ${JSON.stringify({
        query,
      })}`
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
        `getDetailCommonCodeByQuery completed successfully with result: ${JSON.stringify(
          result
        )}`
      );
      return result;
    } catch (error) {
      logger.error(`Error in getDetailCommonCodeByQuery: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
  getBasicCommonCodeByQuery: async (query) => {
    logger.info(
      `Executing getBasicCommonCodeByQuery with params: ${JSON.stringify({
        query,
      })}`
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
        `getBasicCommonCodeByQuery completed successfully with result: ${JSON.stringify(
          result
        )}`
      );
      return result;
    } catch (error) {
      logger.error(`Error in getBasicCommonCodeByQuery: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
