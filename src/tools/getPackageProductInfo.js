// src/tools/getPackageProductInfo.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";

export const getPackageProductInfoTool = {
  name: "getPackageProductInfo",
  description: "판매상품코드(saleProductCode)를 사용하여 패키지 상품 정보를 조회합니다.",
  inputSchema: z.object({
    saleProductCode: z.string().min(1, { message: "saleProductCode is required." }),
  }),
  execute: async ({ saleProductCode }) => {
    logger.info(
      `Executing getPackageProductInfo tool with saleProductCode: ${saleProductCode}`
    );
    try {
      const result = await packageService.getPackageProductInfo({
        saleProductCode,
      });
      logger.info(
        `getPackageProductInfo tool execution completed successfully.`
      );
      return result;
    } catch (error) {
      logger.error(
        `Error executing getPackageProductInfo tool: ${error.message}`,
        { error: error.stack }
      );
      throw error; // Re-throw the error to be caught by the caller if necessary
    }
  },
};
