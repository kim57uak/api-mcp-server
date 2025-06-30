import { getSaleProductScheduleTool } from "./getSaleProductSchedule.js";
import { getDetailCommonCodeByQueryTool } from "./getDetailCommonCodeByQuery.js";
import { getBasicCommonCodeByQueryTool } from "./getBasicCommonCodeByQuery.js";
import { retrieveSaleProductInformationTool } from "./retrieveSaleProductInformation.js";
import { retrieveAreaCodeTool } from "./retrieveAreaCode.js";
import { getPackageProductInfoTool } from "./getPackageProductInfo.js";
import { getPackageProductOptionalTourInfomationTool } from "./getPackageProductOptionalTourInfomation.js";
import { getPackageProductRulesAndTravelAlertsTool } from "./getPackageProductRulesAndTravelAlerts.js";
import { retrievePackageProductClassificationCodeTool } from "./retrievePackageProductClassificationCodeTool.js";
import { retrievePackageProductPromotionCodeTool } from "./retrievePackageProductPromotionCodeTool.js";
import { retrievePackageProductThemeCodeTool } from "./retrievePackageProductThemeCodeTool.js";

// API Group 3.1 Tools
import { retrieveProductBasicInfomationBySaleProductCodeTool } from "./retrieveProductBasicInfomationBySaleProductCode.js";
import { retrieveProductAirInventoryInformationBySaleProductCodeTool } from "./retrieveProductAirInventoryInformationBySaleProductCode.js";
import { retrieveProductFareInfomationBySaleProductCodeTool } from "./retrieveProductFareInfomationBySaleProductCode.js";
import { retrieveProductTabBasicInfomationBySaleProductCodeTool } from "./retrieveProductTabBasicInfomationBySaleProductCode.js";
import { retrieveAirLineInformationBySaleProductCodeTool } from "./retrieveAirLineInformationBySaleProductCode.js";
import { retrieveHotelScheduleInformationBySaleProductCodeTool } from "./retrieveHotelScheduleInformationBySaleProductCode.js";
import { retrieveSendingTermAndConditionsBySaleProductCodeTool } from "./retrieveSendingTermAndConditionsBySaleProductCode.js";
import { retrieveOptionalTourBySaleProductCodeTool } from "./retrieveOptionalTourBySaleProductCode.js";
import { retrieveExpenseInformationBySaleProductCodeTool } from "./retrieveExpenseInformationBySaleProductCode.js";
import { retrieveInineraryInformationBySaleProductCodeTool } from "./retrieveInineraryInformationBySaleProductCode.js";
import { retrieveRemarksInformationBySaleProductCodeTool } from "./retrieveRemarksInformationBySaleProductCode.js";

// API Group 3.2 Tool
import { retrieveBrandCodeBySaleProductCodeTool } from "./retrieveBrandCodeBySaleProductCode.js";

// API Group 3.3 Tool
import { retrieveSameAirInfomationBySaleProductCodeTool } from "./retrieveSameAirInfomationBySaleProductCode.js";


export const tools = [
  {
    ...getSaleProductScheduleTool,
    description: `
    판매상품코드(saleProdCd) 1개를 사용하여 여행스케줄(일정표) 정보를 조회합니다.
    조회 결과에는 다음 정보가 포함됩니다:
    - \`schdInfoList\` -> \`schdMainInfoList[]\`: 일별 주요 여행 일정 정보 리스트.
    - \`schdInfoList\` -> \`schdMainInfoList[]\` -> \`schdDay\`: 각 일차별(예: 1일차, 2일차) 상세 내용이 반복됩니다. 이 정보를 통해 여행의 총 일차(최소 및 최대 일차)를 파악할 수 있습니다.
    - \`schdInfoList\` -> \`schdMainInfoList[]\` -> (하위 항목): 일별 호텔 정보 리스트.
    - \`pkgAirSeqList\`: 상품에 포함된 항공편에 대한 상세 정보.
    `,
  },
  {
    ...getDetailCommonCodeByQueryTool,
    description: `
    다음 도구는 사용자가 요청한 공통 코드 중 기초적이고 일반적이며 좀더 명확한 값을 선택후 그값으로 함수를 조회하는 역할을 합니다.
    도구 이름: getDetailCommonCodeByQuery
    이 도구는 주로 '상품 속성 코드'나 '지역 코드'와 같이 구체적인 분류를 위한 코드 값을 찾아야 할 때 텍스트 질의에 사용됩니다.
    getBasicCommonCodeByQuery검색한 결과중에 질의에 가장접근한 값을 선택해서 해당 값으로 조회한다
    공백제거후 조회.
    `,
  },
  {
    ...getBasicCommonCodeByQueryTool,
    description: `
    다음 도구는 사용자가 요청한 공통 코드 중 "기초적이고 일반적이며 좀 더 명확하지 않은" 값을 찾아 조회하는 역할을 합니다.
    도구 이름: getBasicCommonCodeByQuery
    입력:
    - query (string, 필수): 사용자의 질의 텍스트. 이 텍스트는 공백을 제거한 뒤 공통 코드 데이터베이스에서 넓은 범위 혹은 기본 분류에 해당하는 코드를 검색하는 데 사용됩니다.

    예시 질의 및 호출 방법:
    1) 사용자가 "지상비 관련 기본 코드 목록 보여줘" 라고 하면,
    query는 "지상비"로 변환되어 도구에 전달됩니다.
    2) 사용자가 "여행 타입 기본 코드 찾아줘" 라고 하면,
    query는 "여행타입"로 변환되어 도구에 전달됩니다.
    `,
  },
  {
    ...retrieveSaleProductInformationTool,
    description: `
    여기서 말하는 상품은 여행상품을 말합니다.
    다양한 검색조건을 입력하여 1건 이상의 판매상품정보를 조회하려고 합니다.
    하지만 코드값을 알지 못하므로 아래 순서대로 단계적으로 함수를 호출해서 적절한 상품코드로 조회할 수 있도록 도와줘.

    **필수 입력 파라미터:**
    - \`startDate\` (시작일/출발일): 상품 검색을 위한 시작 날짜 (YYYYMMDD 형식).
    - \`endDate\` (종료일/도착일): 상품 검색을 위한 종료 날짜 (YYYYMMDD 형식).
    - \`productAreaCd\` (지역코드): 상품이 속한 지역의 코드값(예: 'A0'은 동남아 지역). 사용자 질의(예: '유럽', '아시아', '프랑스')에 따라 \`getDetailCommonCodeByQuery\`을 사용하여 정확한 지역 코드를 조회하여 입력해야 합니다. 만약 코드를 찾을 수 없거나 특정 지역을 지정하지 않는 경우 'A0'을 기본값으로 사용합니다.

    **선택 입력 파라미터:**
    - \`saleProductCode\` (판매상품코드): 특정 판매 상품을 조회할 때 사용하는 고유 코드.
    - \`reservationCode\` (예약코드): 특정 예약과 관련된 상품을 조회할 때 사용하는 코드.
    - \`productAttributeCode\` (상품속성코드): 상품의 속성(예: '패키지', '자유여행', '골프')을 나타내는 코드. \`getDetailCommonCodeByQuery\`을 사용하여 사용자 질의에 맞는 코드값을 조회하여 입력합니다.
    - \`saleProductName\` (상품명): 사용자 질의에서 상품명을 의미하는 텍스트 키워드.

    **페이지네이션 파라미터 (조회 시 입력 가능):**
    - \`pageSize\` (페이지당 상품 수): 한 페이지에 표시할 상품의 최대 개수를 지정합니다.
    - \`pageNumber\` (현재 페이지 번호): 조회할 결과의 페이지 번호를 지정합니다.
    - \`totalRowCount\` (총 상품 수): 검색 조건에 해당하는 전체 상품의 개수.
    - \`totalPageCount\` (총 페이지 수): 전체 상품을 \`pageSize\`에 따라 나눈 총 페이지 수.
    `,
  },
  {
    ...retrieveAreaCodeTool,
    description: `
    지역,국가,대륙에 대한 정보를 조회한다.
    예시 : 동남아 지역 찾아죠 => 이 함수를 실행해서 결과를 확인한후 동남아에 해당하는 코드를 선택한다.
    `,
  },
  {
    ...getPackageProductInfoTool,
    description:
      "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 상세 정보를 조회합니다. 이 정보에는 상품의 기본 정보, 가격, 일정 등이 포함될 수 있습니다.",
  },
  {
    ...getPackageProductOptionalTourInfomationTool,
    description:
      "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 선택 관광 상세 정보를 조회합니다. 이 정보에는 선택 관광의 이름, 가격, 상세 설명 등이 포함될 수 있습니다.",
  },
  {
    ...getPackageProductRulesAndTravelAlertsTool,
    description:
      "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 약관, 유의사항 및 여행경보 단계와 같은 중요 정보를 조회합니다.",
  },
  {
    ...retrievePackageProductClassificationCodeTool,
    description: `패키지 상품의 전체 상품구분 코드를 조회합니다.`,
  },
  {
    ...retrievePackageProductPromotionCodeTool,
    description: `패키지 상품의 프로모션 코드를 조회합니다.`,
  },
  {
    ...retrievePackageProductThemeCodeTool,
    description: `패키지 상품의 모든 테마 코드를 조회합니다.`,
  },
  // --- API Group 3.1 Tools ---
  {
    ...retrieveProductBasicInfomationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 상품 기본 정보를 조회합니다.", // 기본 설명 사용 또는 상세화
  },
  {
    ...retrieveProductAirInventoryInformationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 상품 항공 인벤토리 정보를 조회합니다.",
  },
  {
    ...retrieveProductFareInfomationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 상품 요금 정보를 조회합니다.",
  },
  {
    ...retrieveProductTabBasicInfomationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 상품 기본 탭 정보를 조회합니다.",
  },
  {
    ...retrieveAirLineInformationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 항공 정보를 조회합니다.",
  },
  {
    ...retrieveHotelScheduleInformationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 호텔 현지 일정 정보를 조회합니다.",
  },
  {
    ...retrieveSendingTermAndConditionsBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 샌딩 약관 정보를 조회합니다.",
  },
  {
    ...retrieveOptionalTourBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 선택 관광 정보를 조회합니다.",
  },
  {
    ...retrieveExpenseInformationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 경비 정보를 조회합니다.",
  },
  {
    ...retrieveInineraryInformationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 여정 정보를 조회합니다.",
  },
  {
    ...retrieveRemarksInformationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 비고 정보를 조회합니다.",
  },
  // --- API Group 3.2 Tool ---
  {
    ...retrieveBrandCodeBySaleProductCodeTool,
    // description: "상품 브랜드 코드를 조회합니다.",
  },
  // --- API Group 3.3 Tool ---
  {
    ...retrieveSameAirInfomationBySaleProductCodeTool,
    // description: "판매상품코드와 출발일자를 사용하여 동일 항공 판매 상품 정보를 조회합니다.",
  },
];
