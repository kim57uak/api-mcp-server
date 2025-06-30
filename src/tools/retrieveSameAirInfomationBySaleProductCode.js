import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { cleanObject } from "../utils/objectUtils.js";
import { createJsonResponse } from "../utils/responseUtils.js";

export const retrieveSameAirInfomationBySaleProductCodeTool = {
  name: "retrieveSameAirInfomationBySaleProductCode",
  description: "판매상품코드와 출발일자를 사용하여 동일 항공 판매 상품 정보를 조회합니다.",
  inputSchema: {
    saleProdCd: z.string().min(1, { message: "saleProdCd is required." }).describe("판매상품코드"),
    depDay: z.string().regex(/^\d{8}$/, "YYYYMMDD 형식이어야 합니다.").min(1, { message: "depDay is required." }).describe("출발일자 (YYYYMMDD)")
  },
  async handler({ saleProdCd, depDay }) {
    const functionName = "retrieveSameAirInfomationBySaleProductCodeTool.handler";
    logger.info(
      `Executing ${functionName} with saleProdCd: ${saleProdCd}, depDay: ${depDay}`
    );
    try {
      const result = await packageService.retrieveSameAirInfomationBySaleProductCode({
        saleProdCd,
        depDay,
      });
      logger.info(
        `${functionName} execution completed successfully.`
      );
      const cleanedResult = cleanObject(result);
      return createJsonResponse(functionName, cleanedResult, logger);
    } catch (error) {
      logger.error(
        `Error executing ${functionName}: ${error.message}`,
        { error: error.stack }
      );
      throw error;
    }
  },
};
