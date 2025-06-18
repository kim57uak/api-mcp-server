import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";

export const getDetailCommonCodeByQueryTool = {
  name: "getDetailCommonCodeByQuery",
  description:
    "사용자 질의중 상세내역 코드 리스트를 조회한다. getDetailCommonCodeByQueryTool 에 질의 하기위한 코드명 또는 코드를 조회한다.",
  inputSchema: { query: z.string().min(1) },
  async handler({ query }) {
    const functionName = "getDetailCommonCodeByQueryTool.handler";
    // logger.info(
    //   `Executing ${functionName} with params: ${JSON.stringify({ query })}`
    // );
    logger.info(`Query: ${query}`);
    try {
      const result = await packageService.getDetailCommonCodeByQuery(query);
      // result 내 모든 문자열에서 html 태그 제거
      function cleanObject(obj) {
        if (typeof obj === "string") return stripHtml(obj);
        if (Array.isArray(obj))
          return obj.map(cleanObject).filter((v) => v !== undefined);
        if (obj && typeof obj === "object") {
          const newObj = {};
          for (const key in obj) {
            const cleaned = cleanObject(obj[key]);
            if (cleaned !== null && cleaned !== undefined) {
              newObj[key] = cleaned;
            }
          }
          return Object.keys(newObj).length > 0 ? newObj : undefined;
        }
        if (obj === null) return undefined;
        return obj;
      }
      const cleanedResult = cleanObject(result);
      logger.info(
        `${functionName} completed successfully with result: ${JSON.stringify(
          cleanedResult
        )}`
      );
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(cleanedResult, null, 2),
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
