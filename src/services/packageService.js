// src/services/scheduleService.js
// Placeholder for business logic related to schedules.
// In a real application, this service would handle data fetching, validation, etc.

import axios from "axios";
import logger from "../utils/logger.cjs";
import {
  apiUrls,
  defaultApiParams,
} from "../config/serviceConfig.js";
import { callApi } from '../utils/apiUtils.js';
import { buildRetrieveSaleProductRequestBody } from './helpers/packageServiceHelpers.js';

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
    return await callApi('getSchedules', 'post', url, requestBody);
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
    const requestBody = buildRetrieveSaleProductRequestBody(params);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await callApi('retrieveSaleProductInformation', 'post', url, requestBody, axiosConfig);
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
    return await callApi('updateSchedule', 'post', url, requestBody);
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
    const responseData = await callApi('getDetailCommonCodeByQuery', 'post', url, requestBody);
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
    const responseData = await callApi('getBasicCommonCodeByQuery', 'post', url, requestBody);
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
    return await callApi('getPackageProductInfo', 'post', url, requestBody);
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
    return await callApi('getPackageProductOptionalTourInfomation', 'post', url, requestBody);
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
    return await callApi('getPackageProductRulesAndTravelAlerts', 'post', url, requestBody);
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
    return await callApi('retrieveAreaCode', 'post', url, requestBody);
  },
};
