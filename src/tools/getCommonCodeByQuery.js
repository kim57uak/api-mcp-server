import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from '../utils/logger.cjs';

export const getCommonCodeByQueryTool = {
  name: "getCommonCodeByQuery",
  description: "사용자 질의에 따라 적합한 공통코드를 조회합니다.",
  inputSchema: { query: z.string().min(1) },
  async handler({ query }) {
    const functionName = "getCommonCodeByQueryTool.handler";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ query })}`);
    try {
      const result = await packageService.getCommonCodeByQuery(query);
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
      logger.info(`${functionName} completed successfully with result: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      logger.error(`Error in ${functionName}: ${error.message}`, { error: error.stack });
      throw error;
    }
  },
};
