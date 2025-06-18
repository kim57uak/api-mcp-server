import { getSaleProductScheduleTool } from "./getSaleProductSchedule.js";
import { getDetailCommonCodeByQueryTool } from "./getDetailCommonCodeByQuery.js";
import { getBasicCommonCodeByQueryTool } from "./getBasicCommonCodeByQuery.js";
import { retrieveSaleProductInformationTool } from "./retrieveSaleProductInformation.js";

export const tools = [
  {
    ...getSaleProductScheduleTool,
    description: `
    판매상품코드(saleProdCd)를 사용하여 해당 판매 상품의 상세 스케줄(일정표) 정보를 조회합니다.
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
    사용자의 질의에 포함된 특정 키워드를 기반으로 상세 공통 코드 리스트를 조회합니다.
    이 도구는 주로 '상품 속성 코드(prodAttrCd)'나 '지역 코드(prodAreaCd)'와 같이 구체적인 분류를 위한 코드 값을 찾아야 할 때 텍스트 질의에 사용됩니다.
    예시: '패키지 여행의 \`상품속성코드\`를 알려줘' => 패키지 파라미터가 아닌 상품속성코드 텍스트를 파라미터로 검색한후 검색결과에서 사용자 질의 내용과 일치하는 값의 코드를 찾는다.
    , '프랑스 \`지역코드\`를 조회해줘' => 프랑스 파라미터가 아닌 지역코드 텍스트를 파라미터로 검색한후 검색결과에서 사용자 질의 내용과 일치하는 값의 코드를 찾는다.
    공백제거후 조회.
    `,
  },
  {
    ...getBasicCommonCodeByQueryTool,
    description: `
    사용자의 질의에 따라 가장 기초적이고 일반적인 공통 코드 리스트를 조회합니다.
    이 도구는 보다 광범위하거나 기본 분류에 해당하는 코드 값을 찾을 때 사용됩니다.
    예시: '\`지상비\` 관련 기본 코드 목록 보여줘', '\`여행타입\` 기본 코드 찾아줘'. 공백제거후 조회
    `,
  },
  {
    ...retrieveSaleProductInformationTool,
    description: `
    이 도구는 판매 상품 일정 및 상세 정보를 조회하는 데 사용됩니다.
    다음 검색 조건들을 활용하여 상품을 필터링하고 원하는 정보를 얻을 수 있습니다.

    **필수 입력 파라미터:**
    - \`startDate\` (시작일/출발일): 상품 검색을 위한 시작 날짜 (YYYYMMDD 형식).
    - \`endDate\` (종료일/도착일): 상품 검색을 위한 종료 날짜 (YYYYMMDD 형식).
    - \`prodAreaCd\` (지역코드): 상품이 속한 지역의 코드. 사용자 질의(예: '유럽', '아시아', '프랑스')에 따라 \`getDetailCommonCodeByQuery\`을 사용하여 정확한 지역 코드를 조회하여 입력해야 합니다. 만약 코드를 찾을 수 없거나 특정 지역을 지정하지 않는 경우 'A0'을 기본값으로 사용합니다.

    **선택 입력 파라미터:**
    - \`saleProdCd\` (판매상품코드): 특정 판매 상품을 조회할 때 사용하는 고유 코드.
    - \`resCd\` (예약코드): 특정 예약과 관련된 상품을 조회할 때 사용하는 코드.
    - \`prodAttrCd\` (상품속성코드): 상품의 속성(예: '패키지', '자유여행', '골프')을 나타내는 코드. \`getDetailCommonCodeByQuery\`을 사용하여 사용자 질의에 맞는 코드값을 조회하여 입력합니다.
    - \`saleProdNm\` (상품명): 사용자 질의에서 상품명을 의미하는 텍스트 키워드.

    **페이지네이션 파라미터 (조회 시 입력 가능):**
    - \`pageSize\` (페이지당 상품 수): 한 페이지에 표시할 상품의 최대 개수를 지정합니다.
    - \`pageNumber\` (현재 페이지 번호): 조회할 결과의 페이지 번호를 지정합니다.
    - \`totalRowCount\` (총 상품 수): 검색 조건에 해당하는 전체 상품의 개수.
    - \`totalPageCount\` (총 페이지 수): 전체 상품을 \`pageSize\`에 따라 나눈 총 페이지 수.
    `,
  },
];
