// src/tools/retrievePackageProductThemeCodeTool.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";

/**
 * @tool retrieveComPkgProdStrtrTheme
 * @description OLS에서 테마 코드('03') 리스트를 조회합니다.
 * 이 Tool은 별도의 입력을 받지 않습니다.
 * 성공 시, 조회된 코드 리스트를 JSON 문자열 형태로 반환합니다.
 * 실패 시, 오류 메시지를 포함한 오류 객체를 반환합니다.
 */
export const retrievePackageProductThemeCodeTool = {
  name: "retrievePackageProductThemeCode",
  description:
    "OLS에서 테마 코드('03') 리스트를 조회합니다. (상품구분 : 01 프로모션 : 02 테마 : 03)",
  inputSchema: z.object({}), // 이 Tool은 입력을 받지 않습니다.
  async handler() {
    const toolName = "retrievePackageProductThemeCodeTool";
    logger.info(`Executing ${toolName}. No input parameters.`);

    try {
      const result = await packageService.retrievePackageProductThemeCode();
      logger.info(
        `${toolName} completed successfully. Result: ${JSON.stringify(result)}`
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error) {
      logger.error(
        `Error in ${toolName}: ${error.message}`,
        { error: error.stack }
      );
      throw error;
    }
  },
};
