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
    description:
      "사용자 질의중 코드성 데이타에 적합한 속성,지역,국가,대륙,브랜드 코드를 조회합니다.",
  },
];
