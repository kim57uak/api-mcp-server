// src/tools/getPackageProductOptionalTourInfomation.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";

export const getPackageProductOptionalTourInfomationTool = {
  name: "getPackageProductOptionalTourInfomation",
  description: "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 선택 관광 정보를 조회합니다.",
  inputSchema: z.object({
    saleProductCode: z.string().min(1, { message: "saleProductCode is required." }),
  }),
  execute: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductOptionalTourInfomation tool with saleProductCode: ${saleProductCode}`
    );
    try {
      const result = await packageService.getPackageProductOptionalTourInfomation({
        saleProductCode,
      });
      logger.info(
        `getPackageProductOptionalTourInfomation tool execution completed successfully.`
      );
      return result;
    } catch (error) {
      logger.error(
        `Error executing getPackageProductOptionalTourInfomation tool: ${error.message}`,
        { error: error.stack }
      );
      throw error; // Re-throw the error to be caught by the caller if necessary
    }
  },
};
