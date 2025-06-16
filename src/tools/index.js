import { getSaleProductScheduleTool } from "./getSaleProductSchedule.js";
import { updateSaleProductScheduleTool } from "./updateSaleProductSchedule.js";
import { getCommonCodeByQueryTool } from "./getCommonCodeByQuery.js";

export const tools = [
  {
    ...getSaleProductScheduleTool,
    description: "판매상품 일정을 판매상품코드로 조회합니다.",
  },
  {
    ...updateSaleProductScheduleTool,
    description: "판매 상품 스케줄을 수정합니다.",
  },
  {
    ...getCommonCodeByQueryTool,
    description: "사용자 질의에 따라 적합한 공통코드를 조회합니다.",
  },
];
