// src/tools/retrieveComPkgProdStrtrProductClassificationTool.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs"; // 경로 수정: ../../utils/logger.cjs -> ../utils/logger.cjs

/**
 * @tool retrieveComPkgProdStrtrProductClassification
 * @description OLS에서 상품 구분 코드('01') 리스트를 조회합니다.
 * 이 Tool은 별도의 입력을 받지 않습니다.
 * 성공 시, 조회된 코드 리스트를 JSON 문자열 형태로 반환합니다.
 * 실패 시, 오류 메시지를 포함한 오류 객체를 반환합니다.
 */
export const retrieveComPkgProdStrtrProductClassificationTool = {
  name: "retrieveComPkgProdStrtrProductClassification",
  description:
    "OLS에서 상품 구분 코드('01') 리스트를 조회합니다. (상품구분 : 01 프로모션 : 02 테마 : 03)",
  inputSchema: z.object({}), // 이 Tool은 입력을 받지 않습니다.
  async handler() {
    const toolName = "retrieveComPkgProdStrtrProductClassificationTool";
    logger.info(`Executing ${toolName}. No input parameters.`);

    try {
      const result =
        await packageService.retrieveComPkgProdStrtrProductClassification();
      logger.info(
        `${toolName} completed successfully. Result: ${JSON.stringify(result)}`
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error) {
      logger.error(
        `Error in ${toolName}: ${error.message}`,
        { error: error.stack } // 스택 트레이스도 로깅
      );
      // MCP SDK가 오류를 처리하도록 그대로 throw 하거나,
      // 특정 형식의 오류 객체를 반환할 수 있습니다.
      // DEVELOPER_MANUAL.md의 예시를 따라 오류를 그대로 throw 합니다.
      throw error;
    }
  },
};
