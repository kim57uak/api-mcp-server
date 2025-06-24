// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";
import { cleanObject } from "../utils/objectUtils.js";
import { createJsonResponse } from "../utils/responseUtils.js";

export const getSaleProductScheduleTool = {
  name: "getSaleProductSchedule",
  description:
    "판매상품일정을 판매상품코드로 조회합니다. 조회결과는 다음과 같습니다. " +
    "schdInfoList => schdMainInfoList[] => 반복된 schdDay (1일차,2일차,3일차,...) => 반복된 값을 분석해서 최소값과 최대값을 확인한다. " +
    "schdInfoList => schdMainInfoList[] => 일별 주요여행일정정보 리스트 " +
    "schdInfoList => schdMainInfoList[] => 일별 호텔정보 리스트 " +
    "pkgAirSeqList => 항공정보",
  inputSchema: { saleProdCd: z.string().min(1) },
  async handler({ saleProdCd }) {
    const functionName = "getSaleProductScheduleTool.handler";
    logger.info(
      `Executing ${functionName} with params: ${JSON.stringify({ saleProdCd })}`
    );
    try {
      console.log(
        `Executing getSaleProductSchedule tool for saleProdCd: ${saleProdCd}`
      );
      const schedules = await packageService.getSchedules(saleProdCd);
      // schedules 내 모든 문자열에서 html 태그 제거
      const cleanedSchedules = cleanObject(schedules);
      const responseData = {
        saleProdCd: saleProdCd,
        schedules: cleanedSchedules,
        retrievedAt: new Date().toISOString(),
      };
      return createJsonResponse(functionName, responseData, logger);
    } catch (error) {
      logger.error(`Error in ${functionName}: ${error.message}`, {
        error: error.stack,
      });
      console.error(
        // Original console.error
        `Error in getSaleProductSchedule tool: ${error.message}`,
        error
      );
      throw error;
    }
  },
};
