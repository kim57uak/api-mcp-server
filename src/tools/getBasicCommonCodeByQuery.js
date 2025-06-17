import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";

export const getBasicCommonCodeByQueryTool = {
  name: "getBasicCommonCodeByQuery",
  description: "사용자 질의에 따라 적합한 기본공통코드를 조회합니다.",
  inputSchema: { query: z.string().min(1) },
  async handler({ query }) {
    const functionName = "getBasicCommonCodeByQueryTool.handler";
    // logger.info(
    //   `Executing ${functionName} with params: ${JSON.stringify({ query })}`
    // );
    logger.info(`Basic Query: ${query}`);
    try {
      const result = await packageService.getBasicCommonCodeByQuery(query);
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
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
      logger.error(`Error in ${functionName}: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
