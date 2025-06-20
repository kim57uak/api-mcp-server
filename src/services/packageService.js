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
    saleProductCode,
    reservationCode,
    startDate,
    endDate,
    productAttributeCode,
    productAreaCode,
    saleProductName,
    brandCd,
    pageSize,
    pageNumber,
    totalRowCount,
    totalPageCount,
  }) => {
    const params = {
      saleProductCode,
      reservationCode,
      startDate,
      endDate,
      productAttributeCode,
      productAreaCode,
      saleProductName,
      brandCd,
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
      const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSaleProdBrwsTab/v1.00`;

      // 요청 본문을 동적으로 생성
      const requestBody = {
        productCodeDivision: "P", // prodCdDv
        productCode: saleProductCode || "", // prodCd
        productSeparator: "", // prodSprtrCd
        reservationCode: reservationCode || "", // resCd
        productAreaCode: productAreaCode || "AA", // prodAreaCd
        teamDivisionCode: "", // teamDvCd
        arrangementEmployeeNumber: "", // arngRpprEmpn
        merchandiserEmployeeNumber: "", // mrchRpprEmpn
        airEmployeeNumber: "", // airRpprEmpn
        directPurchaseHotelEmployeeNumber: "", // dpurcRpprEmpn
        departureArrivalDivisionCode: "S", // depArrDvCd
        startDate: startDate, // startDate
        endDate: endDate, // endDate
        productBrowseTypeCode: "", // prodBrwsTypeCd
        productTypeCode: "", // prodTypeCd
        transitTypeCode: "", // trnpTypeCd
        allYn: "A", // allYn
        sundayYn: "", // sndyYn
        mondayYn: "", // monYn
        tuesdayYn: "", // tueYn
        wednesdayYn: "", // wedYn
        thursdayYn: "", // thuYn
        fridayYn: "", // friYn
        saturdayYn: "", // satYn
        productBrandCode: brandCd || "", // prodBrndCd
        promotionCode: "", // promCd
        productDivisionCode: "", // prodDvCd
        themeCode: "", // thmCd
        inventoryPatternId: "", // invPtnId
        departureAirCode: "", // depAirCd
        departureFlightCode: "", // depFlgtCd
        arrivalAirCode: "", // arrAirCd
        arrivalFlightCode: "", // arrFlgtCd
        departureCityCode: "", // depCityCd
        teamDepartmentCode: "", // teamDeptCd
        saleProductName: saleProductName || "", // saleProdNm
        hotelCode: "", // htlCd
        landCode: "", // landCd
        adultAmount: "", // adtAmt
        basisFeeRate: null, // bassFeeRate
        officialCertificationFeeRate: null, // ocrtFeeRate
        affiliatedConcernFeeRate: null, // afcnFeeRate
        depositKindCode: "", // depoKndCd
        productAttributeCode: productAttributeCode || "", // prodAttrCd
        tempArngNm: "", // not mapped (custom)
        tempMrchNm: "", // not mapped (custom)
        tempAirNm: "", // not mapped (custom)
        tempDpurcNm: "", // not mapped (custom)
        tempCard: "", // not mapped (custom)
        productAreaExceptCode: "", // prodAreaEtcCd
        stateCodeInformation: "", // scodInfo
        cityCodeInformation: "", // cityCdInfo
        specificAgentCode: "", // agtCd
        supplierHeadOfficeDispatchExistenceOrNonexistence: "N", // splyStaffAuth

        pageVo: {
          pageSize: pageSize || 100,
          pageNumber: pageNumber || 1,
          totalRowCount: totalRowCount || 0,
          totalPageCount: totalPageCount || 0,
        },
        header: {
          langCode: defaultApiParams.commonCodeLang,
        },
      };

      // 진단용 로그 추가
      console.log('requestBody:', JSON.stringify(requestBody, null, 2));
      logger.info(`requestBody: ${JSON.stringify(requestBody)}`);

      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(url, requestBody, axiosConfig);
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
        comBscCdNm: query,
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
        comBscCdNm: query,
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
  getPackageProductInfo: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductInfo with saleProductCode: ${saleProductCode}`
    );
    try {
      const url = `${apiUrls.packageApiBase}/pkg/api/common/pkgcomprod/getPkgProdInfo2/v1.00`;
      const requestBody = {
        saleProductCode: saleProductCode,
        header: {
          langCode: defaultApiParams.commonCodeLang,
        },
      };
      logger.info(
        `Sending POST request to ${url} with body: ${JSON.stringify(
          requestBody
        )}`
      );
      const res = await axios.post(url, requestBody);
      logger.info(
        `getPackageProductInfo completed successfully with result: ${JSON.stringify(
          res.data
        )}`
      );
      return res.data;
    } catch (error) {
      logger.error(`Error in getPackageProductInfo: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
  retrieveAreaCode: async () => {
    logger.info(`Executing retrieveAreaCode`);
    try {
      const url = `${apiUrls.olsQaBase}/pkg/api/gnis/common/cbc/compkgarea/getComPkgAreaCboListForProduct/v1.00`;
      const res = await axios.post(url, {
        langCd: "ko-KR",
        header: {
          langCode: defaultApiParams.commonCodeLang,
        },
      });
      logger.info(
        `retrieveAreaCode completed successfully with result: ${JSON.stringify(
          res.data
        )}`
      );
      return res.data;
    } catch (error) {
      logger.error(`Error in retrieveAreaCode: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
