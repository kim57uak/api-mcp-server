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

async function _callApi(functionNameForLog, httpMethod, fullUrl, requestData = null, axiosOptions = {}) {
  logger.info(`Executing API call for ${functionNameForLog} with URL: ${fullUrl}, Method: ${httpMethod}, Data: ${JSON.stringify(requestData)}`);

  try {
    let response;
    const method = httpMethod.toLowerCase();

    if (method === 'get') {
      response = await axios.get(fullUrl, { params: requestData, ...axiosOptions });
    } else if (method === 'post') {
      response = await axios.post(fullUrl, requestData, axiosOptions);
    } else if (method === 'put') {
      response = await axios.put(fullUrl, requestData, axiosOptions);
    } else if (method === 'delete') {
      response = await axios.delete(fullUrl, { data: requestData, ...axiosOptions });
    } else {
      throw new Error(`Unsupported HTTP method: ${httpMethod}`);
    }

    logger.info(`${functionNameForLog} API call completed successfully with status: ${response.status}`);
    return response.data;
  } catch (error) {
    // Axios 오류인 경우 error.response.data 등으로 더 자세한 오류 정보를 로깅할 수 있습니다.
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    logger.error(`Error in ${functionNameForLog} API call to ${fullUrl}: ${errorMessage}`, {
      status: error.response ? error.response.status : 'N/A',
      errorStack: error.stack
    });
    throw error; // 원래 오류를 다시 throw하여 호출부에서 처리할 수 있도록 함
  }
}

// Helper function to build the request body for retrieveSaleProductInformation
function _buildRetrieveSaleProductRequestBody({
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
}) {
  return {
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
}

export const packageService = {
  getSchedules: async (saleProdCd) => {
    logger.info(
      `Executing getSchedules with params: ${JSON.stringify({ saleProdCd })}`
    );
    const url = `${apiUrls.packageApiBase}/pkg/api/common/pkgcomprod/getPkgProdItnrInfo/v1.00`;
    const requestBody = {
      pkgCd: saleProdCd,
      header: {
        langCode: defaultApiParams.commonCodeLang, // Use configured lang code
      },
    };
    return await _callApi('getSchedules', 'post', url, requestBody);
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

    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSaleProdBrwsTab/v1.00`;
    const requestBody = _buildRetrieveSaleProductRequestBody(params);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await _callApi('retrieveSaleProductInformation', 'post', url, requestBody, axiosConfig);
  },

  updateSchedule: async (saleProdCd, name) => {
    logger.info(
      `Executing updateSchedule with params: ${JSON.stringify({
        saleProdCd,
        name,
      })}`
    );
    const url = `${apiUrls.packageApiBase}/api/v2/platform/pkg/sale-products/schedules/update`;
    const requestBody = { saleProdCd, name };
    return await _callApi('updateSchedule', 'post', url, requestBody);
  },
  getDetailCommonCodeByQuery: async (query) => {
    logger.info(
      `Executing getDetailCommonCodeByQuery with params: ${JSON.stringify({
        query,
      })}`
    );
    const url = `${apiUrls.commonOlsBase}/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00`;
    const requestBody = {
      comBscCd: query,
      comBscCdNm: query,
      header: {
        langCode: defaultApiParams.commonCodeLang, // Use configured lang code
      },
    };
    const responseData = await _callApi('getDetailCommonCodeByQuery', 'post', url, requestBody);
    const result = { query, data: responseData };
    logger.info(
      `getDetailCommonCodeByQuery completed successfully with result: ${JSON.stringify(
        result
      )}`
    );
    return result;
  },
  getBasicCommonCodeByQuery: async (query) => {
    logger.info(
      `Executing getBasicCommonCodeByQuery with params: ${JSON.stringify({
        query,
      })}`
    );
    const url = `${apiUrls.commonOlsBase}/common/ols/codemgt/cbc/commoncodemgt/getComBscCdList/v1.00`;
    const requestBody = {
      comBscCd: query,
      comBscCdNm: query,
      header: {
        langCode: defaultApiParams.commonCodeLang, // Use configured lang code
      },
    };
    const responseData = await _callApi('getBasicCommonCodeByQuery', 'post', url, requestBody);
    const result = { query, data: responseData };
    logger.info(
      `getBasicCommonCodeByQuery completed successfully with result: ${JSON.stringify(
        result
      )}`
    );
    return result;
  },
  getPackageProductInfo: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductInfo with saleProductCode: ${saleProductCode}`
    );
    const url = `${apiUrls.packageApiBase}/pkg/api/common/pkgcomprod/getPkgProdInfo2/v1.00`;
    const requestBody = {
      pkgCd: saleProductCode,
      inpPathCd:"WPP",
      header: {
        langCode: defaultApiParams.commonCodeLang,
      },
    };
    return await _callApi('getPackageProductInfo', 'post', url, requestBody);
  },
  getPackageProductOptionalTourInfomation: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductOptionalTourInfomation with saleProductCode: ${saleProductCode}`
    );
    const url = `${apiUrls.packageApiBase}/pkg/api/common/pkgcomprod/getPkgProdChcStsngInfo/v1.00`;
    const requestBody = {
      pkgCd: saleProductCode,
      header: {
        langCode: defaultApiParams.commonCodeLang,
      },
    };
    return await _callApi('getPackageProductOptionalTourInfomation', 'post', url, requestBody);
  },
  getPackageProductRulesAndTravelAlerts: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductRulesAndTravelAlerts with saleProductCode: ${saleProductCode}`
    );
    const url = `${apiUrls.packageApiBase}/pkg/api/common/pkgcomprod/getPkgRefnMtr/v1.00`;
    const requestBody = {
      pkgCd: saleProductCode,
      header: {
        langCode: defaultApiParams.commonCodeLang,
      },
    };
    return await _callApi('getPackageProductRulesAndTravelAlerts', 'post', url, requestBody);
  },
  retrieveAreaCode: async () => {
    logger.info(`Executing retrieveAreaCode`);
    const url = `${apiUrls.olsQaBase}/pkg/api/gnis/common/cbc/compkgarea/getComPkgAreaCboListForProduct/v1.00`;
    const requestBody = {
      langCd: "ko-KR", // This seems specific, keeping it directly.
      header: {
        langCode: defaultApiParams.commonCodeLang,
      },
    };
    return await _callApi('retrieveAreaCode', 'post', url, requestBody);
  },
};
