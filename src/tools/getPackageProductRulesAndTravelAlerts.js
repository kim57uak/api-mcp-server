// src/tools/getPackageProductRulesAndTravelAlerts.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";
import { cleanObject } from "../utils/objectUtils.js";

export const getPackageProductRulesAndTravelAlertsTool = {
  name: "getPackageProductRulesAndTravelAlerts",
  description:
    "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 약관 및 유의사항, 여행경보 등을 조회합니다.",
  inputSchema: {
    saleProductCode: z
      .string()
      .min(1, { message: "saleProductCode is required." }),
  },
  async handler({ saleProductCode }) {
    const functionName = "getPackageProductRulesAndTravelAlertsTool.handler";
    logger.info(
      `Executing getPackageProductRulesAndTravelAlerts tool with saleProductCode: ${saleProductCode}`
    );
    try {
      const result = await packageService.getPackageProductRulesAndTravelAlerts(
        {
          saleProductCode,
        }
      );
      logger.info(
        `getPackageProductRulesAndTravelAlerts tool execution completed successfully.`
      ); // result 내 모든 문자열에서 html 태그 제거
      const cleanedResult = cleanObject(result);
      logger.info(
        `${functionName} completed successfully with result: ${JSON.stringify(
          cleanedResult
        )}`
      );
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(cleanedResult, null, 2),
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
      logger.error(
        `Error executing getPackageProductRulesAndTravelAlerts tool: ${error.message}`,
        { error: error.stack }
      );
      throw error; // Re-throw the error to be caught by the caller if necessary
    }
  },
};
