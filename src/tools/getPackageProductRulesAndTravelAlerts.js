// src/tools/getPackageProductRulesAndTravelAlerts.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";

export const getPackageProductRulesAndTravelAlertsTool = {
  name: "getPackageProductRulesAndTravelAlerts",
  description: "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 약관 및 유의사항, 여행경보 등을 조회합니다.",
  inputSchema: z.object({
    saleProductCode: z.string().min(1, { message: "saleProductCode is required." }),
  }),
  execute: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductRulesAndTravelAlerts tool with saleProductCode: ${saleProductCode}`
    );
    try {
      const result = await packageService.getPackageProductRulesAndTravelAlerts({
        saleProductCode,
      });
      logger.info(
        `getPackageProductRulesAndTravelAlerts tool execution completed successfully.`
      );
      return result;
    } catch (error) {
      logger.error(
        `Error executing getPackageProductRulesAndTravelAlerts tool: ${error.message}`,
        { error: error.stack }
      );
      throw error; // Re-throw the error to be caught by the caller if necessary
    }
  },
};
