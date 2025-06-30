import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { cleanObject } from "../utils/objectUtils.js";
import { createJsonResponse } from "../utils/responseUtils.js";

export const retrieveBrandCodeBySaleProductCodeTool = {
  name: "retrieveBrandCodeBySaleProductCode",
  description: "상품 브랜드 코드를 조회합니다.",
  inputSchema: {
    prodAttrCd: z.string().min(1, { message: "prodAttrCd is required." }).describe("상품속성코드"),
    cretAmndDvCd: z.string().min(1, { message: "cretAmndDvCd is required." }).describe("생성수정구분코드"),
    saleProdCd: z.string().min(1, { message: "saleProdCd is required." }).describe("판매상품코드"),
    chrplnNtytSaleYn: z.enum(['Y', 'N'], { message: "chrplnNtytSaleYn must be 'Y' or 'N'." }).describe("전세기실체판매여부 (Y/N)")
  },
  async handler({ prodAttrCd, cretAmndDvCd, saleProdCd, chrplnNtytSaleYn }) {
    const functionName = "retrieveBrandCodeBySaleProductCodeTool.handler";
    logger.info(
      `Executing ${functionName} with params: ${JSON.stringify({ prodAttrCd, cretAmndDvCd, saleProdCd, chrplnNtytSaleYn })}`
    );
    try {
      const result = await packageService.retrieveBrandCodeBySaleProductCode({
        prodAttrCd,
        cretAmndDvCd,
        saleProdCd,
        chrplnNtytSaleYn,
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
