import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";
import { cleanObject } from "../utils/objectUtils.js";
import { createJsonResponse } from "../utils/responseUtils.js";
import { includeFields } from "../utils/responseFilter.js";

export const getDetailCommonCodeByQueryTool = {
  name: "getDetailCommonCodeByQuery",
  description:
    "사용자 질의중 상세내역 코드 리스트를 조회한다. getDetailCommonCodeByQueryTool 에 질의 하기위한 코드명 또는 코드를 조회한다.",
  inputSchema: { query: z.string().min(1) },
  async handler({ query }) {
    const functionName = "getDetailCommonCodeByQueryTool.handler";
    logger.info(`Query: ${query}`);
    try {
      const result = await packageService.getDetailCommonCodeByQuery(query);
      
      // 필요한 필드만 필터링
      const fieldsToInclude = ['comBscCdNm','comDtlCd', 'comDtlCdNm'];
      if (result.data && result.data.comDtlCdVo) {
        result.data.comDtlCdVo = includeFields(result.data.comDtlCdVo, fieldsToInclude);
      }
      
      return createJsonResponse(functionName, result, logger);
    } catch (error) {
      logger.error(`Error in ${functionName}: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
