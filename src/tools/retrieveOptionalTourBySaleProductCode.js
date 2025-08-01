import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { cleanObject } from "../utils/objectUtils.js";
import { createJsonResponse } from "../utils/responseUtils.js";

export const retrieveOptionalTourBySaleProductCodeTool = {
  name: "retrieveOptionalTourBySaleProductCode",
  description: "판매상품코드와 출발일자를 사용하여 선택 관광 정보를 조회합니다.",
  inputSchema: {
    saleProductCode: z.string().min(1, { message: "saleProductCode is required." }).describe("판매상품코드"),
    departureDay: z.string().regex(/^\d{8}$/, "YYYYMMDD 형식이어야 합니다.").min(1, { message: "departureDay is required." }).describe("출발일자 (YYYYMMDD)")
  },
  async handler({ saleProductCode, departureDay }) {
    const functionName = "retrieveOptionalTourBySaleProductCodeTool.handler";
    logger.info(
      `Executing ${functionName} with saleProdCd: ${saleProductCode}, departureDay: ${departureDay}`
    );
    try {
      const result = await packageService.retrieveOptionalTourBySaleProductCode({
        saleProductCode,
        departureDay,
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
