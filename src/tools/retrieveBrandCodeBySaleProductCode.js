import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { cleanObject } from "../utils/objectUtils.js";
import { createJsonResponse } from "../utils/responseUtils.js";

export const retrieveBrandCodeBySaleProductCodeTool = {
  name: "retrieveBrandCodeBySaleProductCode",
  description: "상품 브랜드 코드를 조회합니다.",
  inputSchema: {
    productAttributeCode: z.string().min(1, { message: "productAttributeCode is required." }).describe("상품속성코드"),
    createdModifiedCode: z.string().min(1, { message: "createdModifiedCode is required." }).describe("생성수정구분코드"),
    saleProductCode: z.string().min(1, { message: "saleProductCode is required." }).describe("판매상품코드"),
    charterSaleYn: z.enum(['Y', 'N'], { message: "charterSaleYn must be 'Y' or 'N'." }).describe("전세기실체판매여부 (Y/N)")
  },
  async handler({ productAttributeCode, createdModifiedCode, saleProductCode, charterSaleYn }) {
    const functionName = "retrieveBrandCodeBySaleProductCodeTool.handler";
    logger.info(
      `Executing ${functionName} with params: ${JSON.stringify({ productAttributeCode, createdModifiedCode, saleProductCode, charterSaleYn })}`
    );
    try {
      const result = await packageService.retrieveBrandCodeBySaleProductCode({
        productAttributeCode,
        createdModifiedCode,
        saleProductCode,
        charterSaleYn,
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
