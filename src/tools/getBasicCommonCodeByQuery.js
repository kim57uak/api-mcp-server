import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";
import { cleanObject } from "../utils/objectUtils.js";

export const getBasicCommonCodeByQueryTool = {
  name: "getBasicCommonCodeByQuery",
  description:
    "사용자 질의중 가장 기초적인,기본적 코드에 대한 리스트를 조회한다. getDetailCommonCodeByQueryTool 에 질의 하기위한 기초 코드명 또는 코드를 조회한다." +
    "예를 들면 지상비 관련된 기본코드 목록 보여죠 라고 질의하면 지상비로 기초,기본적인 코드를 조회해야함.",
  inputSchema: { query: z.string().min(1) },
  async handler({ query }) {
    const functionName = "getBasicCommonCodeByQueryTool.handler";
    // logger.info(
    //   `Executing ${functionName} with params: ${JSON.stringify({ query })}`
    // );
    logger.info(`Basic Query: ${query}`);
    try {
      const result = await packageService.getBasicCommonCodeByQuery(query);
      // result 내 모든 문자열에서 html 태그 제거
      const cleanedResult = cleanObject(result);
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
