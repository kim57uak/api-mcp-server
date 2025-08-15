// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";
import { cleanObject } from "../utils/objectUtils.js";
import { includeFields } from "../utils/responseFilter.js";

export const retrieveAreaCodeTool = {
  name: "retrieveAreaCode",
  description: `
    지역,국가,대륙에 대한 정보를 조회합니다.
    query 파라미터가 제공되면 해당 쿼리와 일치하는 데이터만 반환하고, 없으면 전체 데이터를 반환합니다.
    예시 : 동남아 지역 찾아줘 => 이 함수를 실행해서 결과를 확인한후 동남아에 해당하는 코드를 선택한다.
  `,
  inputSchema: {
    query: z.string().optional(),
  },
  async handler({ query }) {
    try {
      logger.info(`=== retrieveAreaCode 핸들러 시작 ===`);
      logger.info(`전달받은 쿼리: "${query}" (타입: ${typeof query})`);

      const areaCodeList = await packageService.retrieveAreaCode();

      let result = areaCodeList;

      if (result && result.comPkgAreaCQcVoList) {
        // 필요한 필드만 필터링
        result.comPkgAreaCQcVoList = result.comPkgAreaCQcVoList.map((item) => ({
          code: item.code,
          codeNm: item.codeNm,
        }));

        // query가 있으면 필터링
        if (query) {
          logger.info(
            `필터링 시작 - 쿼리: "${query}", 원본 데이터 개수: ${result.comPkgAreaCQcVoList.length}`
          );

          const beforeFilter = result.comPkgAreaCQcVoList.length;
          result.comPkgAreaCQcVoList = result.comPkgAreaCQcVoList.filter(
            (item) => {
              const matches = item.codeNm && item.codeNm.includes(query);
              logger.debug(
                `필터링 체크: ${item.code} - ${item.codeNm} => ${matches ? "매치" : "불일치"}`
              );
              return matches;
            }
          );

          logger.info(
            `필터링 완료 - 결과 개수: ${result.comPkgAreaCQcVoList.length} (${beforeFilter}개에서 ${result.comPkgAreaCQcVoList.length}개로 변경)`
          );
        }
      }

      // header 제거하고 필요한 데이터만 반환
      const cleanResult = {
        comPkgAreaCQcVoList: result.comPkgAreaCQcVoList || [],
        resultNum: result.resultNum || 0
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                areaCodeList: cleanResult,
                retrievedAt: new Date().toISOString(),
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      logger.error(`Error in retrieveAreaCode: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
