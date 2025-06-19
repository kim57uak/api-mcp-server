// src/tools/getSaleProductSchedule.js
import { z } from "zod";

// Define Enums
const ProductAttributeCodeEnum = z.enum(["P", "W", "B"]);
const ProductAreaCodeEnum = z.enum(["AA", "C1", "HH", "J0"]);

import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";

export const retrieveSaleProductInformationTool = {
  name: "retrieveSaleProductInformation",
  description: `
    Retrieves information for one or more sales products.
    If you don't know the specific codes, please follow these steps to use the functions sequentially to find the appropriate product codes:

    1. Based on the user's query (e.g., "Southeast Asia region / Japan/Southeast Asia" → region information), call the getBasicCommonCodeByQueryTool() function. (This function is not limited to querying region information only.)
    2. From the list of results from getBasicCommonCodeByQueryTool, extract the code or value that best matches the user's query and call the getDetailCommonCodeByQueryTool() function.
    3. Using one or more codes from the getDetailCommonCodeByQueryTool results that best reflect the user's query, call the retrieveSaleProductInformationTool() function.
      - Use appropriate codes to ensure that one or more sales product information items are retrieved.

    Each function must be called sequentially, one at a time.
    Ensure you receive the result from the previous function before calling the next one.

    **Required Input Parameters:**
    - \`startDate\`: The start date for searching products (YYYYMMDD format).
    - \`endDate\`: The end date for searching products (YYYYMMDD format).

    **Optional Input Parameters:**
    - \`saleProductCode\`: The unique code for a specific sales product. Used when you want to look up a particular item.
    - \`reservationCode\`: The code associated with a specific reservation. Used to find products related to that reservation.
    - \`productAttributeCode\`: Code representing the attribute of the product. Select from predefined values: 'P' (Package), 'W' (Wedding), 'B' (Activity). Uses \`getDetailCommonCodeByQuery\` to find the matching code based on user query if needed.
    - \`productAreaCode\`: Code for the product's geographical area. Select from predefined values: 'AA' (Bangkok), 'C1' (China), 'HH' (Americas), 'J0' (Japan). User queries (e.g., 'Europe', 'Asia', 'France') should be resolved to these codes using \`getDetailCommonCodeByQuery\`.
    - \`saleProductName\`: Keywords from the user's query that refer to the product name.

    **Pagination Parameters (optional for retrieval):**
    - \`pageSize\`: The maximum number of products to display on a single page.
    - \`pageNumber\`: The page number of the results you want to view.
    - \`totalRowCount\`: The total count of products matching the search criteria.
    - \`totalPageCount\`: The total number of pages, calculated based on \`pageSize\` and \`totalRowCount\`.
    `,
  inputSchema: {
    saleProductCode: z.string().optional().describe("특정 판매 상품을 조회할 때 사용하는 고유 코드입니다."),
    reservationCode: z.string().optional().describe("특정 예약과 관련된 상품을 조회할 때 사용하는 코드입니다."),
    startDate: z.number().min(1).describe("상품 검색을 위한 시작 날짜 (YYYYMMDD 형식) 입니다. 필수 항목입니다."), // 필수값
    endDate: z.number().min(1).describe("상품 검색을 위한 종료 날짜 (YYYYMMDD 형식) 입니다. 필수 항목입니다."), // 필수값
    productAttributeCode: ProductAttributeCodeEnum.optional().describe("상품 속성 코드입니다. 허용 값: 'P' (패키지), 'W' (웨딩), 'B' (액티비티). 이 코드 중 하나를 제공해야 합니다."), // 선택값
    productAreaCode: ProductAreaCodeEnum.optional().describe("상품 지역 코드입니다. 허용 값: 'AA' (방콕, 동남아), 'C1' (중국), 'HH' (미주), 'J0' (일본). 이 코드 중 하나를 제공해야 합니다."), // 필수값
    saleProductName: z.string().optional().describe("사용자 질의에서 상품명을 의미하는 텍스트 키워드입니다."), // 선택값
    pageSize: z.number().optional().describe("한 페이지에 표시할 상품의 최대 개수를 지정합니다."),
    pageNumber: z.number().optional().describe("조회할 결과의 페이지 번호를 지정합니다."),
    totalRowCount: z.number().optional().describe("검색 조건에 해당하는 전체 상품의 개수입니다."),
    totalPageCount: z.number().optional().describe("전체 상품을 `pageSize`에 따라 나눈 총 페이지 수입니다."),
  },
  async handler(inputArguments) {
    console.log(
      "Received inputArguments by handler:",
      JSON.stringify(inputArguments, null, 2)
    );

    const {
      saleProductCode,
      reservationCode,
      startDate,
      endDate,
      productAttributeCode,
      productAreaCode,
      saleProductName,
      pageSize,
      pageNumber,
      totalRowCount,
      totalPageCount,
    } = inputArguments; //구조분해할당
    const functionName = "retrieveSaleProductInformationTool.handler";
    const params = {
      saleProductCode,
      reservationCode,
      startDate,
      endDate,
      productAttributeCode,
      productAreaCode,
      saleProductName,
      pageSize,
      pageNumber,
      totalRowCount,
      totalPageCount,
    };
    logger.info(
      `Executing ${functionName} with params: ${JSON.stringify(params)}`
    );
    try {
      console.log(
        `Executing retrieveSaleProductInformation tool with params: ${JSON.stringify(
          params
        )}`
      );
      // packageService.retrieveSaleProductInformation 함수가 객체를 파라미터로 받는다고 가정합니다.
      const saleProductList =
        await packageService.retrieveSaleProductInformation(params);

      // saleProductList 내 모든 문자열에서 html 태그 제거
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
          // 모든 값이 undefined로 제외된 경우 빈 객체 반환
          return Object.keys(newObj).length > 0 ? newObj : undefined;
        }
        if (obj === null) return undefined;
        return obj;
      }
      const cleanSaleProductList = cleanObject(saleProductList);
      const responseData = {
        // 기존 saleProdCd 외에 모든 파라미터 포함
        ...params,
        saleProductList: cleanSaleProductList,
        retrievedAt: new Date().toISOString(),
      };
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(responseData, null, 2),
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
      console.error(
        // Original console.error
        `Error in retrieveSaleProductInformation tool: ${error.message}`,
        error
      );
      throw error;
    }
  },
};
