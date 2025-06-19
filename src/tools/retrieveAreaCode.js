// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";

export const retrieveAreaCodeTool = {
  name: "retrieveAreaCode",
  description: `
    지역,국가,대륙에 대한 정보를 조회한다.
    예시 : 동남아 지역 찾아죠 => 이 함수를 실행해서 결과를 확인한후 동남아에 해당하는 코드를 선택한다.
    `,
  async handler() {
    try {
      // packageService.retrieveAreaCode 함수가 객체를 파라미터로 받는다고 가정합니다.
      const areaCodeList = await packageService.retrieveAreaCode();

      // areaCodeList 내 모든 문자열에서 html 태그 제거
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
      const cleanAreaCodeList = cleanObject(areaCodeList);
      const responseData = {
        // 기존 saleProdCd 외에 모든 파라미터 포함
        ...params,
        saleProductList: cleanAreaCodeList,
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
