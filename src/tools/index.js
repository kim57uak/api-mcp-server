import { getSaleProductScheduleTool } from "./getSaleProductSchedule.js";
import { updateSaleProductScheduleTool } from "./updateSaleProductSchedule.js";
import { getCommonCodeByQueryTool } from "./getCommonCodeByQuery.js";
import { getBasicCommonCodeByQueryTool } from "./getBasicCommonCodeByQuery.js";

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
      "사용자 질의중 코드성 데이타에 적합한 속성,지역,국가,대륙,브랜드 코드를 조회합니다. " +
      "허니문,패키지,웨딩,액티비티,종교,성지순례 등을 검색할때 속성이란 키워드로 먼저 검색을 한후 검색결과에서 찾고자 하는 이름에 해당하는 코드를 리턴한다. " +
      "일본지역,일본,중국,아시아,미주지역등을 검색할때 지역코드로 검색후 검색 결과에서 찾고자하는 이름에 해당하는 코드를 리턴한다." +
      "XXX브랜드,클래식,프리미엄등 브랜드를 검색할때 브랜드로 검색후 검색결과에서 찾고자 하는 이름에 해당하는 코드를 리턴한다.",
  },
  {
    ...getBasicCommonCodeByQueryTool,
    description:
      "사용자 질의중 가장 기초적인,기본적 코드에 대한 리스트를 조회한다. getCommonCodeByQueryTool 에 질의 하기위한 기초 코드명 또는 코드를 조회한다." +
      "예를 들면 지상비 관련된 기본코드 목록 보여죠 라고 질의하면 지상비로 기초,기본적인 코드를 조회해야함.",
  },
];
