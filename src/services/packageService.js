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
import { callPackageProductSpecificCodeService } from './helpers/packageProductSpecificCodeHelpers.js';

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

  /**
   * OLS에서 상품 구분 코드 리스트를 조회합니다.
   * 내부적으로 /pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00 OLS API에 파라미터 '01'을 전달하여 호출합니다.
   * @async
   * @returns {Promise<any>} API 응답 데이터 또는 오류 발생 시 해당 오류를 throw.
   */
  retrievePackageProductClassificationCode: async () => {
    logger.info("Executing retrievePackageProductClassificationCode");
    try {
      const result = await callPackageProductSpecificCodeService("01");
      logger.info("retrievePackageProductClassificationCode completed successfully.");
      return result;
    } catch (error) {
      logger.error(`Error in retrievePackageProductClassificationCode: ${error.message}`);
      throw error; // 에러를 상위로 전파하여 tool 레벨에서 처리하도록 함
    }
  },

  /**
   * OLS에서 프로모션 코드 리스트를 조회합니다.
   * 내부적으로 /pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00 OLS API에 파라미터 '02'를 전달하여 호출합니다.
   * @async
   * @returns {Promise<any>} API 응답 데이터 또는 오류 발생 시 해당 오류를 throw.
   */
  retrievePackageProductPromotionCode: async () => {
    logger.info("Executing retrievePackageProductPromotionCode");
    try {
      const result = await callPackageProductSpecificCodeService("02");
      logger.info("retrievePackageProductPromotionCode completed successfully.");
      return result;
    } catch (error) {
      logger.error(`Error in retrievePackageProductPromotionCode: ${error.message}`);
      throw error;
    }
  },

  /**
   * OLS에서 테마 코드 리스트를 조회합니다.
   * 내부적으로 /pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00 OLS API에 파라미터 '03'을 전달하여 호출합니다.
   * @async
   * @returns {Promise<any>} API 응답 데이터 또는 오류 발생 시 해당 오류를 throw.
   */
  retrievePackageProductThemeCode: async () => {
    logger.info("Executing retrievePackageProductThemeCode");
    try {
      const result = await callPackageProductSpecificCodeService("03");
      logger.info("retrievePackageProductThemeCode completed successfully.");
      return result;
    } catch (error) {
      logger.error(`Error in retrievePackageProductThemeCode: ${error.message}`);
      throw error;
    }
  },

  // --- API Group 3.1: 상품 기본 정보 및 관련 정보 조회 ---
  /**
   * 상품 기본 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveProductBasicInfomationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveProductBasicInfomationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdBscInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 상품 항공 인벤토리 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveProductAirInventoryInformationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveProductAirInventoryInformationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdAivInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 상품 요금 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveProductFareInfomationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveProductFareInfomationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdFareTpgInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 기본 정보 조회 (상품 탭)
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveProductTabBasicInfomationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveProductTabBasicInfomationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 항공 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveAirLineInformationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveAirLineInformationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHgrsInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 호텔 현지 일정 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveHotelScheduleInformationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveHotelScheduleInformationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHtlSchdInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 샌딩 약관 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveSendingTermAndConditionsBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveSendingTermAndConditionsBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSndgStplInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 선택 관광 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveOptionalTourBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveOptionalTourBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveChssTabInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 경비 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveExpenseInformationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveExpenseInformationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveExpnTabInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 여정 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveInineraryInformationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveInineraryInformationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveItnrTabInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  /**
   * 비고 정보 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveRemarksInformationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveRemarksInformationBySaleProductCode";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProductCode, departureDay })}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveRmkTabInfo/v1.00`;
    const requestBody = {
      saleProdBrwsProdInfoBrwsInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  // --- API Group 3.2: 상품 브랜드 코드 조회 API ---
  /**
   * 상품 브랜드 코드 조회
   * @param {string} productAttributeCode 상품속성코드
   * @param {string} createdModifiedCode 생성수정구분코드
   * @param {string} saleProductCode 판매상품코드
   * @param {string} charterSaleYn 전세기실체판매여부 (Y/N)
   */
  retrieveBrandCodeBySaleProductCode: async ({ productAttributeCode, createdModifiedCode, saleProductCode, charterSaleYn }) => {
    const functionName = "retrieveBrandCodeBySaleProductCode";
    const params = { productAttributeCode, createdModifiedCode, saleProductCode, charterSaleYn };
    logger.info(`Executing ${functionName} with params: ${JSON.stringify(params)}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsebassinfo/retrieveBrndCd/v1.00`;
    const requestBody = {
      saleProdBrwsComDtlQcInVo: {
        prodAttrCd : productAttributeCode,
        cretAmndDvCd : createdModifiedCode,
        saleProdCd : saleProductCode,
        chrplnNtytSaleYn : charterSaleYn,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },

  // --- API Group 3.3: 동일 항공 판매 상품 조회 API ---
  /**
   * 동일 항공 판매 상품 조회
   * @param {string} saleProductCode 판매상품코드
   * @param {string} departureDay 출발일자 (YYYYMMDD)
   */
  retrieveSameAirInfomationBySaleProductCode: async ({ saleProductCode, departureDay }) => {
    const functionName = "retrieveSameAirInfomationBySaleProductCode";
    const params = { saleProductCode, departureDay };
    logger.info(`Executing ${functionName} with params: ${JSON.stringify(params)}`);
    const url = `${apiUrls.olsQaBase}/pkg/api/ols/product/saleprodmgmt/saleprodaiv/cbc/prodaivsacaivbscmgmt/retrieveSmdyAirSaleProd/v1.00`;
    const requestBody = {
      prodAivPpdPkgSlpdAirInvXQcInVo: {
        saleProdCd : saleProductCode,
        depDay : departureDay,
      },
    };
    return await callApi(functionName, 'post', url, requestBody);
  },
};
