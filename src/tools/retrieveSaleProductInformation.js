// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";

export const retrieveSaleProductInformationTool = {
  name: "retrieveSaleProductInformation",
  description: `
    이 도구는 판매 상품 일정 및 상세 정보를 조회하는 데 사용됩니다.
    다음 검색 조건들을 활용하여 상품을 필터링하고 원하는 정보를 얻을 수 있습니다.

    **필수 입력 파라미터:**
    - \`startDate\` (시작일/출발일): 상품 검색을 위한 시작 날짜 (YYYYMMDD 형식).
    - \`endDate\` (종료일/도착일): 상품 검색을 위한 종료 날짜 (YYYYMMDD 형식).
    - \`prodAreaCd\` (지역코드): 상품이 속한 지역의 코드. 사용자 질의(예: '유럽', '아시아', '프랑스')에 따라 \`getDetailCommonCodeByQuery\`을 사용하여 정확한 지역 코드를 조회하여 입력해야 합니다. 만약 코드를 찾을 수 없거나 특정 지역을 지정하지 않는 경우 'A0'을 기본값으로 사용합니다.

    **선택 입력 파라미터:**
    - \`saleProdCd\` (판매상품코드): 특정 판매 상품을 조회할 때 사용하는 고유 코드.
    - \`resCd\` (예약코드): 특정 예약과 관련된 상품을 조회할 때 사용하는 코드.
    - \`prodAttrCd\` (상품속성코드): 상품의 속성(예: '패키지', '자유여행', '골프')을 나타내는 코드. \`getDetailCommonCodeByQuery\`을 사용하여 사용자 질의에 맞는 코드값을 조회하여 입력합니다.
    - \`saleProdNm\` (상품명): 사용자 질의에서 상품명을 의미하는 텍스트 키워드.

    **페이지네이션 파라미터 (조회 시 입력 가능):**
    - \`pageSize\` (페이지당 상품 수): 한 페이지에 표시할 상품의 최대 개수를 지정합니다.
    - \`pageNumber\` (현재 페이지 번호): 조회할 결과의 페이지 번호를 지정합니다.
    - \`totalRowCount\` (총 상품 수): 검색 조건에 해당하는 전체 상품의 개수.
    - \`totalPageCount\` (총 페이지 수): 전체 상품을 \`pageSize\`에 따라 나눈 총 페이지 수.
    `,
  inputSchema: {
    saleProdCd: z.string().optional(), // 선택값으로 변경
    resCd: z.string().optional(), // 선택값
    startDate: z.number().min(1), // 필수값
    endDate: z.number().min(1), // 필수값
    prodAttrCd: z.string().optional(), // 선택값
    prodAreaCd: z.string().min(1), // 필수값
    saleProdNm: z.string().optional(), // 선택값
    pageSize: z.number().optional(),
    pageNumber: z.number().optional(),
    totalRowCount: z.number().optional(),
    totalPageCount: z.number().optional(),
  },
  async handler(inputArguments) {
    console.log(
      "Received inputArguments by handler:",
      JSON.stringify(inputArguments, null, 2)
    );

    const {
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
    } = inputArguments; //구조분해할당
    const functionName = "retrieveSaleProductInformationTool.handler";
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
      `Executing ${functionName} with params: ${JSON.stringify(params)}`
    );
    try {
      console.log(
        `Executing retrieveSaleProductInformation tool with params: ${JSON.stringify(
          params
        )}`
      );
      // packageService.retrieveSaleProductInformation 함수가 객체를 파라미터로 받는다고 가정합니다.
      const saleProductList =
        await packageService.retrieveSaleProductInformation(params);

      // saleProductList 내 모든 문자열에서 html 태그 제거
      function cleanObject(obj) {
        if (typeof obj === "string") return stripHtml(obj);
        if (Array.isArray(obj))
          return obj.map(cleanObject).filter((v) => v !== undefined);
        if (obj && typeof obj === "object") {
          const newObj = {};
          for (const key in obj) {
            const cleaned = cleanObject(obj[key]);
            if (cleaned !== null && cleaned !== undefined) {
              newObj[key] = cleaned;
            }
          }
          // 모든 값이 undefined로 제외된 경우 빈 객체 반환
          return Object.keys(newObj).length > 0 ? newObj : undefined;
        }
        if (obj === null) return undefined;
        return obj;
      }
      const cleanSaleProductList = cleanObject(saleProductList);
      const responseData = {
        // 기존 saleProdCd 외에 모든 파라미터 포함
        ...params,
        saleProductList: cleanSaleProductList,
        retrievedAt: new Date().toISOString(),
      };
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(responseData, null, 2),
          },
        ],
      };
      logger.info(
        `${functionName} completed successfully with result: ${JSON.stringify(
          response
        )}`
      );
      return response;
    } catch (error) {
      logger.error(`Error in ${functionName}: ${error.message}`, {
        error: error.stack,
      });
      console.error(
        // Original console.error
        `Error in retrieveSaleProductInformation tool: ${error.message}`,
        error
      );
      throw error;
    }
  },
};
