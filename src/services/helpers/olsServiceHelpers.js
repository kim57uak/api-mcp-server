// src/services/helpers/olsServiceHelpers.js
import logger from "../../utils/logger.cjs";
import { apiUrls, defaultApiParams } from "../../config/serviceConfig.js";
import { callApi } from '../../utils/apiUtils.js';

/**
 * 객체나 배열을 재귀적으로 탐색하여 null 값을 제거합니다.
 * - 객체의 경우: 값이 null인 속성을 제거합니다.
 * - 배열의 경우: null인 요소를 제거하고, 각 요소에 대해 재귀적으로 함수를 적용합니다.
 * - null이 아닌 원시 값은 그대로 반환합니다.
 * @param {any} data - 처리할 데이터 (객체, 배열, 또는 다른 타입)
 * @returns {any} null 값이 제거된 데이터
 */
function removeNullsRecursively(data) {
  if (data === null || data === undefined) {
    return undefined; // null이나 undefined는 제거 대상으로 undefined 반환
  }

  if (Array.isArray(data)) {
    // 배열인 경우, 각 요소에 대해 재귀적으로 함수를 적용하고,
    // 결과가 undefined가 아닌 요소들만 필터링하여 새 배열 생성
    return data
      .map(item => removeNullsRecursively(item))
      .filter(item => item !== undefined);
  }

  if (typeof data === 'object') {
    // 객체인 경우, 각 속성에 대해 재귀적으로 함수를 적용하고,
    // 결과 값이 undefined가 아닌 속성들만 포함하는 새 객체 생성
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = removeNullsRecursively(data[key]);
        if (value !== undefined) {
          newData[key] = value;
        }
      }
    }
    return newData;
  }

  // 원시 값이나 기타 타입은 그대로 반환
  return data;
}

/**
 * OLS 서비스 (/pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00)를 호출하는 공통 함수.
 * 상품구분(01), 프로모션(02), 테마(03) 코드 조회를 담당.
 *
 * @param {string} olsCd - 조회할 코드 구분 ('01', '02', '03').
 * @returns {Promise<any>} API 응답 데이터 또는 오류 발생 시 null.
 */
export const callOlsComPkgProdStrtrService = async (olsCd) => {
  const serviceName = 'callOlsComPkgProdStrtrService';
  logger.info(
    `Executing ${serviceName} with olsCd: ${olsCd}`
  );

  // API URL 구성
  // serviceConfig.js에 정의된 olsQaBase 또는 다른 적절한 OLS 기본 URL을 사용합니다.
  // DEV_MANUAL 및 기존 코드를 참고했을 때, OLS 관련 API는 olsQaBase 또는 commonOlsBase를 사용하고 있습니다.
  // commonOlsBase는 /common/ols/ 경로를 가지므로, /pkg/ols/ 경로는 olsQaBase가 더 적합해 보입니다.
  const baseUrl = apiUrls.olsQaBase;
  const apiPath = "/pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00";
  const url = `${baseUrl}${apiPath}`;

  // 요청 본문 구성 (OLS API 명세에 따라 정확한 필드 확인 필요)
  const requestBody = {
    olsCd: olsCd, // 전달받은 olsCd 사용
    header: {
      langCode: defaultApiParams.commonCodeLang, // 기본 설정된 언어 코드 사용
      // 필요한 경우 여기에 추가적인 헤더 정보나 공통 파라미터를 넣을 수 있습니다.
    },
    // 기타 필요한 파라미터가 있다면 여기에 추가
  };

  // HTTP 요청 헤더 설정 (필요한 경우)
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      // 다른 필요한 헤더가 있다면 여기에 추가 (예: 인증 토큰)
    },
  };

  try {
    // callApi 유틸리티를 사용하여 API 호출
    // callApi(operationName, method, url, data, config)
    const rawResponseData = await callApi(serviceName, 'post', url, requestBody, axiosConfig);
    logger.info(
      `${serviceName} for olsCd '${olsCd}' completed successfully. Raw data received.`
    );

    // API 응답에서 null 값 제거
    const cleanedResponseData = removeNullsRecursively(rawResponseData);
    logger.info(
      `Data after null removal for olsCd '${olsCd}': ${JSON.stringify(cleanedResponseData)}`
    );

    return cleanedResponseData;
  } catch (error) {
    // callApi 내부에서 이미 오류 로깅을 할 것으로 예상되지만, 여기서 추가적인 컨텍스트 로깅도 가능합니다.
    logger.error(
      `Error in ${serviceName} for olsCd '${olsCd}': ${error.message}`
    );
    // 오류를 다시 throw 하거나, 특정 형태로 가공하여 반환할 수 있습니다.
    // 여기서는 null을 반환하거나 오류를 그대로 throw하는 것을 고려할 수 있습니다.
    // 일단은 오류를 그대로 전파하도록 throw 합니다.
    throw error;
  }
};
