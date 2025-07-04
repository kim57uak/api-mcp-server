# 📄 MCP 판매 상품 서버 - 개발자 매뉴얼

## 목차
- [1. 📖 프로젝트 개요](#1-📖-프로젝트-개요)
- [2. 🧱 프로젝트 구조](#2-🧱-프로젝트-구조)
  - [🔑 주요 구성 요소](#🔑-주요-구성-요소)
- [3. 🔧 MCP 도구 구현](#3-🔧-mcp-도구-구현)
  - [3.1. 🛠️ `getSaleProductSchedule` 도구](#31-🛠️-getsaleproductschedule-도구)
  - [3.2. 🛠️ `getDetailCommonCodeByQuery` 도구](#32-🛠️-getdetailcommoncodebyquery-도구)
  - [3.3. 🛠️ `getBasicCommonCodeByQuery` 도구](#33-🛠️-getbasiccommoncodebyquery-도구)
  - [3.4. 🛠️ `retrieveSaleProductInformation` 도구](#34-🛠️-retrievesaleproductinformation-도구)
  - [3.5. 🛠️ `retrieveAreaCode` 도구](#35-🛠️-retrieveareacode-도구)
  - [3.6. 🛠️ `getPackageProductInfo` 도구](#36-🛠️-getpackageproductinfo-도구)
  - [3.7. 🛠️ `getPackageProductOptionalTourInformation` 도구](#37-🛠️-getpackageproductoptionaltourinformation-도구)
  - [3.8. 🛠️ `getPackageProductRulesAndTravelAlerts` 도구](#38-🛠️-getpackageproductrulesandtravelalerts-도구)
  - [3.9. 🛠️ `retrievePackageProductClassificationCode` 도구](#39-🛠️-retrievepackageproductclassificationcode-도구)
  - [3.10. 🛠️ `retrievePackageProductPromotionCode` 도구](#310-🛠️-retrievepackageproductpromotioncode-도구)
  - [3.11. 🛠️ `retrievePackageProductThemeCode` 도구](#311-🛠️-retrievepackageproductthemecode-도구)
  - [3.12. 🛠️ `retrieveProductBasicInformationBySaleProductCode` 도구](#312-🛠️-retrieveproductbasicinformationbysaleproductcode-도구)
  - [3.13. 🛠️ `retrieveProductAirInventoryInformationBySaleProductCode` 도구](#313-🛠️-retrieveproductairinventoryinformationbysaleproductcode-도구)
  - [3.14. 🛠️ `retrieveProductFareInformationBySaleProductCode` 도구](#314-🛠️-retrieveproductfareinformationbysaleproductcode-도구)
  - [3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` 도구](#315-🛠️-retrieveproducttabbasicinformationbysaleproductcode-도구)
  - [3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` 도구](#316-🛠️-retrieveairlineinformationbysaleproductcode-도구)
  - [3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` 도구](#317-🛠️-retrievehotelscheduleinformationbysaleproductcode-도구)
  - [3.18. 🛠️ `retrieveSendingTermAndConditionsBySaleProductCode` 도구](#318-🛠️-retrievesendingtermandconditionsbysaleproductcode-도구)
  - [3.19. 🛠️ `retrieveOptionalTourBySaleProductCode` 도구](#319-🛠️-retrieveoptionaltourbysaleproductcode-도구)
  - [3.20. 🛠️ `retrieveExpenseInformationBySaleProductCode` 도구](#320-🛠️-retrieveexpenseinformationbysaleproductcode-도구)
  - [3.21. 🛠️ `retrieveItineraryInformationBySaleProductCode` 도구](#321-🛠️-retrieveitineraryinformationbysaleproductcode-도구)
  - [3.22. 🛠️ `retrieveRemarksInformationBySaleProductCode` 도구](#322-🛠️-retrieveremarksinformationbysaleproductcode-도구)
  - [3.23. 🛠️ `retrieveBrandCodeBySaleProductCode` 도구](#323-🛠️-retrievebrandcodebysaleproductcode-도구)
  - [3.24. 🛠️ `retrieveSameAirInformationBySaleProductCode` 도구](#324-🛠️-retrievesameairinformationbysaleproductcode-도구)
  - [3.25. 🛠️ `updateSaleProductSchedule` 도구 (참고용)](#325-🛠️-updatesaleproductschedule-도구-참고용)
- [4. ⚙️ 설정 관리](#4-⚙️-설정-관리)
- [5. 💪 SOLID 원칙 적용](#5-💪-solid-원칙-적용)
- [6. ✨ 새로운 MCP 도구 추가](#6-✨-새로운-mcp-도구-추가)
- [7. 🚀 실행 및 테스트](#7-🚀-실행-및-테스트)
- [8. 💡 일반적인 문제 해결](#8--일반적인-문제-해결)
  - [8.1. 에이전트 초기화 오류](#81-에이전트-초기화-오류)
- [9. 🌱 향후 개선 사항](#9-🌱-향후-개선-사항)

이 문서는 **MCP 판매 상품 서버**의 아키텍처, 구성 요소 및 개발 가이드라인에 대한 자세한 개요를 제공합니다.

## 1. 📖 프로젝트 개요

**MCP 판매 상품 서버**는 **모델 컨텍스트 프로토콜(MCP) SDK**를 사용하여 구축된 **Node.js** 애플리케이션입니다. 여행 상품 정보(판매 스케줄, 패키지 상세, 공통 코드 등)를 관리하고 조회하는 다양한 도구를 노출합니다. 서버는 유지보수성과 확장성을 보장하기 위해 **SOLID 원칙**을 염두에 두고 설계되었습니다.

서버는 **모델 컨텍스트 프로토콜(MCP) SDK** (`@modelcontextprotocol/sdk`)를 사용하여 구축되었습니다. 이 SDK는 프로젝트의 핵심 종속성이며, `package.json` 파일을 통해 관리되고 표준 `npm install` 프로세스의 일부로 설치됩니다. MCP 호환 서비스 및 도구를 만들고 관리하는 데 필요한 도구와 인터페이스를 제공합니다.

## 2. 🧱 프로젝트 구조

프로젝트는 모듈식 구조를 따릅니다:

```text
mcp-server/
├── logs/                     # 로그 파일 (gitignored)
├── node_modules/             # 프로젝트 종속성 (npm으로 관리)
├── src/                      # 소스 코드
│   ├── config/               # 설정 파일
│   │   └── serviceConfig.js  # 서비스별 설정 (API URL 등)
│   ├── server.js             # 주 서버 초기화 및 연결 로직
│   ├── services/             # 비즈니스 로직 모듈
│   │   ├── packageService.js # 핵심 비즈니스 로직
│   │   └── helpers/          # 서비스 헬퍼 모듈
│   │       ├── packageProductSpecificCodeHelpers.js
│   │       └── packageServiceHelpers.js
│   ├── tools/                # MCP 도구 정의
│   │   ├── getSaleProductSchedule.js
│   │   ├── retrieveSaleProductInformation.js
│   │   └── index.js          # 모든 도구 집계 및 내보내기
│   ├── transports/           # 전송 계층 설정
│   │   └── stdioTransport.js
│   ├── utils/                # 유틸리티 함수
│   │   ├── apiUtils.js       # API 호출 유틸리티
│   │   ├── logger.cjs        # 로깅 유틸리티 (.cjs 확장자 참고)
│   │   ├── objectUtils.js    # 객체 정리 유틸리티 (HTML 태그 제거 등)
│   │   ├── responseUtils.js  # 표준 JSON 응답 생성 유틸리티
│   │   └── stripHtml.js      # HTML 태그 제거 유틸리티
├── .gitignore                # Git이 무시해야 하는 의도적으로 추적되지 않는 파일 지정
├── DEVELOPER_MANUAL.ko.md    # 이 개발자 매뉴얼 (한글)
├── DEVELOPER_MANUAL.md       # 개발자 매뉴얼 (영문)
├── INSTALL.ko.md             # 설치 안내서 (한글)
├── INSTALL.md                # 설치 안내서 (영문)
├── README.ko.md              # 프로젝트 개요 (한글)
├── README.md                 # 프로젝트 개요 (영문)
├── package.json              # 프로젝트 메타데이터 및 종속성
└── package-lock.json         # 종속성의 정확한 버전 기록
```

### 🔑 주요 구성 요소

*   📄 **`src/server.js`**:
    *   `@modelcontextprotocol/sdk`에서 `McpServer` 인스턴스를 초기화합니다.
    *   `src/tools/index.js`에서 모든 도구 정의를 가져와 서버에 등록합니다.
    *   `src/transports/stdioTransport.js`를 사용하여 표준 입출력(StdIO) 전송 계층을 생성하고 연결합니다.
    *   서버 시작 및 연결에 대한 최상위 오류 처리를 포함합니다.

*   🛠️ **`src/tools/`**:
    *   각 파일은 특정 MCP 도구를 정의합니다 (예: `getSaleProductSchedule.js`).
    *   각 도구 정의는 `name`(고유 이름), `description`(기능 설명), `inputSchema`(`zod`를 사용한 입력 유효성 검사 스키마), `async handler`(실제 로직 수행 함수)를 포함하는 객체입니다.
    *   **도구 핸들러**는 다음을 수행합니다:
        1.  유효성이 검사된 입력을 받습니다.
        2.  `src/services/packageService.js`의 적절한 서비스 메서드를 호출하여 비즈니스 로직을 수행합니다.
        3.  `src/utils/objectUtils.js`의 `cleanObject`를 사용하여 결과에서 HTML 태그 및 불필요한 `null` 값을 제거합니다.
        4.  `src/utils/responseUtils.js`의 `createJsonResponse`를 사용하여 표준화된 JSON 형식으로 MCP 클라이언트에 응답합니다.
        5.  오류 발생 시 구조화된 오류 메시지를 로깅하고 전파합니다.
    *   `src/tools/index.js`는 모든 도구 정의를 집계하고, 각 도구의 설명을 `src/tools/index.js` 내에서 더 구체적으로 오버라이드하여 `server.js`에 제공합니다.

*   ⚙️ **`src/config/serviceConfig.js`**:
    *   외부 API의 기본 URL (`apiUrls`) 및 기본 API 요청 파라미터 (`defaultApiParams`)와 같은 서비스 계층의 설정을 중앙에서 관리합니다.
    *   API URL은 환경 변수(예: `PKG_API_BASE_URL`, `OLS_QA_BASE_URL`, `COMMON_OLS_BASE_URL`)를 통해 재정의될 수 있어 다양한 환경(개발, QA, 운영)에 쉽게 배포할 수 있도록 지원합니다.

*   📦 **`src/services/packageService.js`**:
    *   애플리케이션의 핵심 비즈니스 로직을 포함합니다. 외부 API 호출, 데이터 가공 및 도구 핸들러에 필요한 데이터 준비를 담당합니다.
    *   `src/config/serviceConfig.js`에서 API 엔드포인트 및 기본 파라미터를 가져옵니다.
    *   `src/utils/apiUtils.js`의 `callApi` 유틸리티를 사용하여 실제 HTTP 요청을 보냅니다.
    *   복잡한 요청 본문 생성 로직은 `src/services/helpers/packageServiceHelpers.js`와 같은 헬퍼 모듈로 분리될 수 있습니다.
    *   특정 코드 조회 로직(예: 상품 구분, 프로모션, 테마 코드)은 `src/services/helpers/packageProductSpecificCodeHelpers.js`의 `callPackageProductSpecificCodeService` 헬퍼 함수를 통해 처리됩니다.

*   🤝 **`src/services/helpers/`**:
    *   `packageService.js`의 로직을 보조하는 헬퍼 함수들을 포함합니다.
    *   `packageProductSpecificCodeHelpers.js`: 상품 구분, 프로모션, 테마 코드 조회와 같이 특정 OLS API를 호출하는 로직을 캡슐화합니다.
    *   `packageServiceHelpers.js`: `retrieveSaleProductInformation` 도구의 복잡한 요청 본문을 생성하는 로직 등을 담당합니다.

*   🚇 **`src/transports/stdioTransport.js`**:
    *   `@modelcontextprotocol/sdk`의 `StdioServerTransport`를 생성하고 구성하기 위한 팩토리 함수 `createStdioTransport`를 제공합니다.

*   🪵 **`src/utils/`**:
    *   **`apiUtils.js`**: `axios`를 사용하여 외부 API를 호출하는 `callApi` 함수를 제공하며, 요청 및 응답 로깅을 포함합니다.
    *   **`logger.cjs`**: `winston` 라이브러리를 사용하여 콘솔 및 파일(순환 로그) 로깅을 설정합니다. 로그 형식, 수준, 파일 경로 등을 관리합니다.
    *   **`objectUtils.js`**: `cleanObject` 함수를 제공하여 객체나 배열 내의 모든 문자열 값에서 HTML 태그를 제거하고, `null` 또는 `undefined` 값을 정리합니다.
    *   **`responseUtils.js`**: `createJsonResponse` 함수를 제공하여 모든 도구 핸들러가 일관된 JSON 구조로 응답을 반환하도록 합니다. 성공/실패 상태, 데이터, 메시지, 타임스탬프 등을 포함할 수 있습니다.
    *   **`stripHtml.js`**: 문자열에서 HTML 태그와 특정 특수문자를 제거하는 `stripHtml` 함수를 제공합니다.

## 3. 🔧 MCP 도구 구현

서버는 다양한 MCP 도구를 제공하여 여행 상품 관련 정보를 조회하고 관리합니다. 모든 도구는 `src/tools/` 디렉토리에 정의되어 있으며, `src/tools/index.js`를 통해 등록됩니다.

각 도구는 일반적으로 다음 구조를 따릅니다:
1.  **입력 유효성 검사**: `zod` 스키마를 사용하여 입력 파라미터의 유효성을 검사합니다.
2.  **서비스 호출**: `packageService`의 해당 함수를 호출하여 비즈니스 로직을 수행합니다.
3.  **결과 정제**: `cleanObject` 유틸리티를 사용하여 서비스로부터 받은 결과에서 HTML 태그 등을 제거합니다.
4.  **응답 생성**: `createJsonResponse` 유틸리티를 사용하여 표준화된 JSON 형식으로 최종 응답을 생성합니다.

### 3.1. 🛠️ `getSaleProductSchedule` 도구

*   📁 **파일**: `src/tools/getSaleProductSchedule.js`
*   🎯 **목적**: `saleProdCd`(판매상품코드) 1개를 사용하여 해당 상품의 여행 스케줄(일정표) 정보를 조회합니다.
    *   조회 결과에는 다음 정보가 포함됩니다:
        *   `schdInfoList` -> `schdMainInfoList[]`: 일별 주요 여행 일정 정보 리스트.
        *   `schdInfoList` -> `schdMainInfoList[]` -> `schdDay`: 각 일차별(예: 1일차, 2일차) 상세 내용이 반복됩니다. 이 정보를 통해 여행의 총 일차(최소 및 최대 일차)를 파악할 수 있습니다.
        *   `schdInfoList` -> `schdMainInfoList[]` -> (하위 항목): 일별 호텔 정보 리스트.
        *   `pkgAirSeqList`: 상품에 포함된 항공편에 대한 상세 정보.
*   📥 **입력 스키마**:
    | 파라미터     | 타입   | 필수 | 설명             |
    | :----------- | :----- | :--- | :--------------- |
    | `saleProdCd` | string | 예   | 판매상품코드     |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProdCd`를 사용하여 `packageService.getSchedules(saleProdCd)`를 호출합니다.
    2.  `packageService.getSchedules`는 내부적으로 `apiUrls.packageApiBase`에 정의된 URL의 `/pkg/api/common/pkgcomprod/getPkgProdItnrInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과와 `saleProdCd`, `retrievedAt` 타임스탬프를 포함하여 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success", // 또는 "error"
          "data": {
            "saleProdCd": "ALLLSLSLSL",
            "schedules": { /* 정제된 스케줄 정보 객체 */ },
            "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
          },
          "message": "Function getSaleProductScheduleTool.handler executed successfully...", // 성공 또는 오류 메시지
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" // createJsonResponse 내부의 타임스탬프
        }
      }]
    }
    ```

### 3.25. 🛠️ `updateSaleProductSchedule` 도구 (참고용)

*   📁 **파일**: `src/tools/updateSaleProductSchedule.js`
*   🎯 **목적**: 판매 상품 스케줄을 업데이트합니다. (*참고: 이 기능은 현재 시스템에서 자주 사용되지 않거나, 다른 방식으로 처리될 수 있으므로 참고용으로만 확인하십시오.*)
*   📥 **입력 스키마**:
    | 파라미터       | 타입   | 필수 | 설명                                     |
    | :------------- | :----- | :--- | :--------------------------------------- |
    | `name`         | string | 예   | 업데이트할 스케줄 이름                   |
    | `saleProdCd`   | string | 예   | 업데이트 대상 판매상품코드               |
*   🧠 **핸들러 로직**:
    1.  `name`과 `saleProdCd`를 입력으로 받습니다.
    2.  `packageService.updateSchedule(saleProdCd, name)`을 호출하여 업데이트를 수행합니다. (해당 API는 현재 운영 환경에서 활성화되어 있지 않을 수 있습니다.)
    3.  서비스 응답을 바탕으로 성공 또는 실패 메시지를 포함하는 JSON 응답을 생성합니다. (이 도구는 `createJsonResponse`를 사용하지 않고 직접 응답을 구성합니다.)
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"message\": \"Schedule for ALLLSLSLSL updated with name new_schedule_name. Service status: Updated via service\",\n  \"updatedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.23. 🛠️ `retrieveBrandCodeBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveBrandCodeBySaleProductCode.js`
*   🎯 **목적**: 상품 속성, 생성/수정 구분, 판매 상품 코드, 전세기 판매 여부 등의 조건을 사용하여 상품 브랜드 코드를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터                 | 타입   | 필수 | 설명 (Zod `describe` 내용)                                  |
    | :----------------------- | :----- | :--- | :---------------------------------------------------------- |
    | `productAttributeCode`   | string | 예   | 상품속성코드                                                |
    | `createdModifiedCode`    | string | 예   | 생성수정구분코드                                            |
    | `saleProductCode`        | string | 예   | 판매상품코드                                                |
    | `charterSaleYn`          | enum   | 예   | 전세기실체판매여부 ('Y' 또는 'N'), `z.enum(['Y', 'N'])`     |
*   🧠 **핸들러 로직**:
    1.  입력 파라미터를 사용하여 `packageService.retrieveBrandCodeBySaleProductCode(params)`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsebassinfo/retrieveBrndCd/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 브랜드 코드 정보 */ },
          "message": "Function retrieveBrandCodeBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.22. 🛠️ `retrieveRemarksInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveRemarksInformationBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 비고(remarks) 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveRemarksInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveRmkTabInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 비고 정보 */ },
          "message": "Function retrieveRemarksInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.21. 🛠️ `retrieveItineraryInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveItineraryInformationBySaleProductCode.js` (원래 파일명: `retrieveInineraryInformationBySaleProductCode.js`)
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 여정 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveItineraryInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다. (서비스 함수명은 파일명 오타 수정에 맞춰 `retrieveItineraryInformationBySaleProductCode`로 가정)
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveItnrTabInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 여정 정보 */ },
          "message": "Function retrieveItineraryInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.20. 🛠️ `retrieveExpenseInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveExpenseInformationBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 경비 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveExpenseInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveExpnTabInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 경비 정보 */ },
          "message": "Function retrieveExpenseInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.19. 🛠️ `retrieveOptionalTourBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveOptionalTourBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 선택 관광 정보를 조회합니다. (참고: `getPackageProductOptionalTourInformation` 도구와 유사하거나 대체하는 기능일 수 있습니다. API 엔드포인트 및 반환값 비교 필요)
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveOptionalTourBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveChssTabInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 선택 관광 정보 */ },
          "message": "Function retrieveOptionalTourBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.18. 🛠️ `retrieveSendingTermAndConditionsBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveSendingTermAndConditionsBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 샌딩(sending) 관련 약관 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveSendingTermAndConditionsBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSndgStplInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 샌딩 약관 정보 */ },
          "message": "Function retrieveSendingTermAndConditionsBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveHotelScheduleInformationBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 호텔 및 현지 일정 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveHotelScheduleInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHtlSchdInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 호텔 및 현지 일정 정보 */ },
          "message": "Function retrieveHotelScheduleInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveAirLineInformationBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 항공사 및 항공편 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveAirLineInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHgrsInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 항공 정보 */ },
          "message": "Function retrieveAirLineInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveProductTabBasicInformationBySaleProductCode.js` (원래 파일명: `retrieveProductTabBasicInfomationBySaleProductCode.js`)
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품 상세 페이지의 기본 탭 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveProductTabBasicInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 상품 기본 탭 정보 */ },
          "message": "Function retrieveProductTabBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.14. 🛠️ `retrieveProductFareInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveProductFareInformationBySaleProductCode.js` (원래 파일명: `retrieveProductFareInfomationBySaleProductCode.js`)
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 요금 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveProductFareInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdFareTpgInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 상품 요금 정보 */ },
          "message": "Function retrieveProductFareInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.13. 🛠️ `retrieveProductAirInventoryInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveProductAirInventoryInformationBySaleProductCode.js`
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 항공 인벤토리 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveProductAirInventoryInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdAivInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 상품 항공 인벤토리 정보 */ },
          "message": "Function retrieveProductAirInventoryInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.12. 🛠️ `retrieveProductBasicInformationBySaleProductCode` 도구

*   📁 **파일**: `src/tools/retrieveProductBasicInformationBySaleProductCode.js` (원래 파일명: `retrieveProductBasicInfomationBySaleProductCode.js`)
*   🎯 **목적**: 판매상품코드(`saleProductCode`)와 출발일자(`departureDay`)를 사용하여 상품의 기본 정보를 조회합니다.
    *   `src/tools/index.js`에서의 설명: (별도 설명 없음, 도구 파일 내 설명 또는 일반적인 기능으로 유추)
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)                      |
    | :---------------- | :----- | :--- | :---------------------------------------------- |
    | `saleProductCode` | string | 예   | 판매상품코드                                    |
    | `departureDay`    | string | 예   | 출발일자 (YYYYMMDD 형식), `z.string().regex(/^\d{8}$/)` |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`와 `departureDay`를 사용하여 `packageService.retrieveProductBasicInformationBySaleProductCode({ saleProductCode, departureDay })`를 호출합니다.
    2.  `packageService`의 해당 함수는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdBscInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 상품 기본 정보 */ },
          "message": "Function retrieveProductBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.2. 🛠️ `getDetailCommonCodeByQuery` 도구

*   📁 **파일**: `src/tools/getDetailCommonCodeByQuery.js`
*   🎯 **목적**: `getBasicCommonCodeByQuery` 도구로 검색한 기초 코드 값 또는 사용자 질의를 바탕으로 더 상세한 공통 코드 목록을 조회합니다. 주로 '상품 속성 코드'나 '지역 코드'와 같이 구체적인 분류를 위한 코드 값을 찾아야 할 때 사용됩니다.
    *   `src/tools/index.js` 설명: "다음 도구는 사용자가 요청한 공통 코드 중 기초적이고 일반적이며 좀더 명확한 값을 선택후 그값으로 함수를 조회하는 역할을 합니다. 이 도구는 주로 '상품 속성 코드'나 '지역 코드'와 같이 구체적인 분류를 위한 코드 값을 찾아야 할 때 텍스트 질의에 사용됩니다. getBasicCommonCodeByQuery검색한 결과중에 질의에 가장접근한 값을 선택해서 해당 값으로 조회한다 공백제거후 조회."
*   📥 **입력 스키마**:
    | 파라미터 | 타입   | 필수 | 설명         |
    | :------- | :----- | :--- | :----------- |
    | `query`  | string | 예   | 조회할 코드명 |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `query`를 사용하여 `packageService.getDetailCommonCodeByQuery(query)`를 호출합니다.
    2.  `packageService.getDetailCommonCodeByQuery`는 내부적으로 `apiUrls.commonOlsBase`에 정의된 URL의 `/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00` 엔드포인트로 POST 요청을 보냅니다. 요청 본문에는 `comBscCd` (입력 `query`)와 `comBscCdNm` (입력 `query`), 그리고 `header` (언어 코드 포함)가 포함됩니다.
    3.  서비스 응답 결과(원본 `query`와 API 응답 데이터를 포함하는 객체)를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": {
            "query": "PROD_ATTR_CD", // 입력 query 값
            "data": { /* API로부터 받은 상세 코드 목록 */ }
          },
          "message": "Function getDetailCommonCodeByQueryTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.3. 🛠️ `getBasicCommonCodeByQuery` 도구

*   📁 **파일**: `src/tools/getBasicCommonCodeByQuery.js`
*   🎯 **목적**: 사용자 질의에 따라 가장 기초적이고 일반적인 공통 코드 목록을 조회합니다. `getDetailCommonCodeByQuery` 도구에 질의하기 위한 기초 코드명이나 코드를 얻는 데 사용될 수 있습니다.
    *   `src/tools/index.js` 설명: "다음 도구는 사용자가 요청한 공통 코드 중 "기초적이고 일반적이며 좀 더 명확하지 않은" 값을 찾아 조회하는 역할을 합니다. 입력: - query (string, 필수): 사용자의 질의 텍스트. 이 텍스트는 공백을 제거한 뒤 공통 코드 데이터베이스에서 넓은 범위 혹은 기본 분류에 해당하는 코드를 검색하는 데 사용됩니다. 예시 질의 및 호출 방법: 1) 사용자가 "지상비 관련 기본 코드 목록 보여줘" 라고 하면, query는 "지상비"로 변환되어 도구에 전달됩니다. 2) 사용자가 "여행 타입 기본 코드 찾아줘" 라고 하면, query는 "여행타입"로 변환되어 도구에 전달됩니다."
*   📥 **입력 스키마**:
    | 파라미터 | 타입   | 필수 | 설명         |
    | :------- | :----- | :--- | :----------- |
    | `query`  | string | 예   | 조회할 코드명 |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `query`를 사용하여 `packageService.getBasicCommonCodeByQuery(query)`를 호출합니다.
    2.  `packageService.getBasicCommonCodeByQuery`는 내부적으로 `apiUrls.commonOlsBase`에 정의된 URL의 `/common/ols/codemgt/cbc/commoncodemgt/getComBscCdList/v1.00` 엔드포인트로 POST 요청을 보냅니다. 요청 본문에는 `comBscCd` (입력 `query`)와 `comBscCdNm` (입력 `query`), 그리고 `header` (언어 코드 포함)가 포함됩니다.
    3.  서비스 응답 결과(원본 `query`와 API 응답 데이터를 포함하는 객체)를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": {
            "query": "여행타입", // 입력 query 값
            "data": { /* API로부터 받은 기본 코드 목록 */ }
          },
          "message": "Function getBasicCommonCodeByQueryTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.4. 🛠️ `retrieveSaleProductInformation` 도구

*   📁 **파일**: `src/tools/retrieveSaleProductInformation.js`
*   🎯 **목적**: 다양한 검색 조건을 입력하여 하나 이상의 판매 상품(여행 상품) 정보를 조회합니다. 코드값을 모르는 경우, `getBasicCommonCodeByQuery` 및 `getDetailCommonCodeByQuery` 도구를 단계적으로 호출하여 적절한 코드를 조회한 후 이 도구를 사용할 수 있습니다.
    *   `src/tools/index.js` 설명: "여기서 말하는 상품은 여행상품을 말합니다. 다양한 검색조건을 입력하여 1건 이상의 판매상품정보를 조회하려고 합니다. 하지만 코드값을 알지 못하므로 아래 순서대로 단계적으로 함수를 호출해서 적절한 상품코드로 조회할 수 있도록 도와줘. 필수 입력 파라미터: `startDate` (시작일/출발일), `endDate` (종료일/도착일), `productAreaCd` (지역코드). 선택 입력 파라미터: `saleProductCode`, `reservationCode`, `productAttributeCode`, `saleProductName`. 페이지네이션 파라미터도 입력 가능."
*   🔀 **실행 순서 가이드**:
    1.  사용자 질의에서 지역, 상품 속성 등 코드화해야 할 정보가 있다면, 먼저 `getBasicCommonCodeByQuery`를 호출하여 넓은 범위의 코드 목록을 받습니다.
    2.  `getBasicCommonCodeByQuery` 결과 중 가장 적합한 값을 선택하여 `getDetailCommonCodeByQuery`를 호출, 더 구체적인 코드 값을 얻습니다.
    3.  획득한 코드들과 기타 조건(날짜, 상품명 등)을 조합하여 이 `retrieveSaleProductInformation` 도구를 호출합니다.
*   📥 **입력 스키마**:
    | 파라미터                 | 타입   | 필수 | 설명 (Zod `describe` 내용)                                                                                                                               |
    | :----------------------- | :----- | :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `saleProductCode`      | string | 아니요 | 특정 판매 상품을 조회할 때 사용하는 고유 코드입니다.                                                                                                                     |
    | `reservationCode`      | string | 아니요 | 특정 예약과 관련된 상품을 조회할 때 사용하는 코드입니다.                                                                                                                   |
    | `startDate`              | number | **예** | 상품 검색을 위한 시작 날짜 (YYYYMMDD 형식) 입니다. 필수 항목입니다.                                                                                                        |
    | `endDate`                | number | **예** | 상품 검색을 위한 종료 날짜 (YYYYMMDD 형식) 입니다. 필수 항목입니다.                                                                                                        |
    | `productAttributeCode`   | string | 아니요 | 영문 1자리 상품속성코드입니다. (예: 'P' - 패키지, 'W' - 웨딩, 'B' - 액티비티) `getDetailCommonCodeByQuery`로 조회 가능.                                                              |
    | `productAreaCode`        | string | 아니요 | 영문과 숫자가 조합된 2자리 지역코드를 입력해야합니다. (예: 'AA' - 방콕/동남아, 'C1' - 중국) `getDetailCommonCodeByQuery`로 조회 가능. 지정하지 않으면 'A0' (동남아) 기본값 사용 가능성 있음. |
    | `saleProductName`        | string | 아니요 | 사용자 질의에서 상품명을 의미하는 텍스트 키워드입니다.                                                                                                                     |
    | `brandCode`              | string | 아니요 | 사용자 질의에서 브랜드 코드를 의미하는 텍스트 키워드입니다.                                                                                                                   |
    | `pageSize`               | number | 아니요 | 한 페이지에 표시할 상품의 최대 개수를 지정합니다. (기본값: 100)                                                                                                             |
    | `pageNumber`             | number | 아니요 | 조회할 결과의 페이지 번호를 지정합니다. (기본값: 1)                                                                                                                     |
    | `totalRowCount`          | number | 아니요 | 검색 조건에 해당하는 전체 상품의 개수입니다. (보통 응답에 포함되므로 입력은 불필요)                                                                                                |
    | `totalPageCount`         | number | 아니요 | 전체 상품을 `pageSize`에 따라 나눈 총 페이지 수입니다. (보통 응답에 포함되므로 입력은 불필요)                                                                                             |
*   🧠 **핸들러 로직**:
    1.  입력받은 모든 파라미터를 사용하여 `packageService.retrieveSaleProductInformation(params)`를 호출합니다.
    2.  `packageService.retrieveSaleProductInformation`는 `src/services/helpers/packageServiceHelpers.js`의 `buildRetrieveSaleProductRequestBody`를 사용하여 API 요청 본문을 구성한 후, `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSaleProdBrwsTab/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과(`saleProductList` 등 포함)를 `cleanObject`로 정제합니다.
    4.  정제된 결과와 모든 입력 파라미터, `retrievedAt` 타임스탬프를 포함하여 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": {
            "saleProductCode": "PROD789",
            "reservationCode": null,
            "startDate": 20240101,
            "endDate": 20241231,
            "productAttributeCode": "P",
            "productAreaCode": "AA",
            "saleProductName": "Bangkok Package",
            "pageSize": 10,
            "pageNumber": 1,
            "totalRowCount": null, // API 응답에 따라 채워짐
            "totalPageCount": null, // API 응답에 따라 채워짐
            "saleProductList": [
              {
                "productName": "Amazing Bangkok Tour (정제됨)",
                "details": "Explore the vibrant city of Bangkok with our exclusive package. (정제됨)"
              }
            ],
            "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" // 핸들러에서 생성
          },
          "message": "Function retrieveSaleProductInformationTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" // createJsonResponse 내부의 타임스탬프
        }
      }]
    }
    ```

### 3.5. 🛠️ `retrieveAreaCode` 도구

*   📁 **파일**: `src/tools/retrieveAreaCode.js`
*   🎯 **목적**: 지역, 국가, 대륙에 대한 코드 정보를 조회합니다. 예를 들어, 사용자 질의가 "동남아 지역 찾아줘"인 경우, 이 도구를 사용하여 관련 코드를 얻고, 그 코드를 다른 도구(예: `retrieveSaleProductInformation`)의 `productAreaCode` 파라미터로 사용할 수 있습니다.
    *   `src/tools/index.js` 설명: "지역,국가,대륙에 대한 정보를 조회한다. 예시 : 동남아 지역 찾아죠 => 이 함수를 실행해서 결과를 확인한후 동남아에 해당하는 코드를 선택한다."
*   📥 **입력 스키마**: 입력 파라미터 없음 (`z.object({})`)
*   🧠 **핸들러 로직**:
    1.  `packageService.retrieveAreaCode()`를 호출합니다.
    2.  `packageService.retrieveAreaCode`는 내부적으로 `apiUrls.olsQaBase`에 정의된 URL의 `/pkg/api/gnis/common/cbc/compkgarea/getComPkgAreaCboListForProduct/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과(`areaCodeList` 포함 가능성 높음)를 `cleanObject`로 정제합니다.
    4.  정제된 결과와 `retrievedAt` 타임스탬프를 포함하는 객체를 JSON 문자열로 변환하여 MCP 콘텐츠로 반환합니다. (참고: 이 도구는 `createJsonResponse`를 사용하지 않고 직접 응답을 구성합니다.)
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"areaCodeList\": [ /* 정제된 지역 코드 객체의 배열 */ ],\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.6. 🛠️ `getPackageProductInfo` 도구

*   📁 **파일**: `src/tools/getPackageProductInfo.js`
*   🎯 **목적**: `saleProductCode`(판매상품코드)를 사용하여 해당 패키지 상품의 상세 정보를 조회합니다. 이 정보에는 상품의 기본 정보, 가격, 일정 등이 포함될 수 있습니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)      |
    | :---------------- | :----- | :--- | :------------------------------ |
    | `saleProductCode` | string | 예   | 판매상품코드. 필수 항목입니다. |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`를 사용하여 `packageService.getPackageProductInfo({ saleProductCode })`를 호출합니다.
    2.  `packageService.getPackageProductInfo`는 내부적으로 `apiUrls.packageApiBase`에 정의된 URL의 `/pkg/api/common/pkgcomprod/getPkgProdInfo2/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 패키지 상품 정보 */ },
          "message": "Function getPackageProductInfoTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.7. 🛠️ `getPackageProductOptionalTourInformation` 도구

*   📁 **파일**: `src/tools/getPackageProductOptionalTourInformation.js` (원래 파일명: `getPackageProductOptionalTourInfomation.js`)
*   🎯 **목적**: `saleProductCode`(판매상품코드)를 사용하여 해당 패키지 상품의 선택 관광 상세 정보를 조회합니다. 이 정보에는 선택 관광의 이름, 가격, 상세 설명 등이 포함될 수 있습니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)      |
    | :---------------- | :----- | :--- | :------------------------------ |
    | `saleProductCode` | string | 예   | 판매상품코드. 필수 항목입니다. |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`를 사용하여 `packageService.getPackageProductOptionalTourInformation({ saleProductCode })`을 호출합니다. (서비스 함수명은 파일명 오타 수정에 맞춰 `getPackageProductOptionalTourInformation`로 가정)
    2.  `packageService.getPackageProductOptionalTourInformation`은 내부적으로 `apiUrls.packageApiBase`에 정의된 URL의 `/pkg/api/common/pkgcomprod/getPkgProdChcStsngInfo/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 선택 관광 정보 */ },
          "message": "Function getPackageProductOptionalTourInformationTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.8. 🛠️ `getPackageProductRulesAndTravelAlerts` 도구

*   📁 **파일**: `src/tools/getPackageProductRulesAndTravelAlerts.js`
*   🎯 **목적**: `saleProductCode`(판매상품코드)를 사용하여 해당 패키지 상품의 약관, 유의사항 및 여행경보 단계와 같은 중요 정보를 조회합니다.
*   📥 **입력 스키마**:
    | 파라미터          | 타입   | 필수 | 설명 (Zod `describe` 내용)      |
    | :---------------- | :----- | :--- | :------------------------------ |
    | `saleProductCode` | string | 예   | 판매상품코드. 필수 항목입니다. |
*   🧠 **핸들러 로직**:
    1.  입력으로 받은 `saleProductCode`를 사용하여 `packageService.getPackageProductRulesAndTravelAlerts({ saleProductCode })`를 호출합니다.
    2.  `packageService.getPackageProductRulesAndTravelAlerts`는 내부적으로 `apiUrls.packageApiBase`에 정의된 URL의 `/pkg/api/common/pkgcomprod/getPkgRefnMtr/v1.00` 엔드포인트로 POST 요청을 보냅니다.
    3.  서비스 응답 결과를 `cleanObject`로 정제합니다.
    4.  정제된 결과를 `createJsonResponse`로 최종 응답을 생성합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // createJsonResponse에 의해 생성된 객체가 문자열화 됨
          "status": "success",
          "data": { /* 정제된 약관, 유의사항, 여행경보 정보 */ },
          "message": "Function getPackageProductRulesAndTravelAlertsTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.9. 🛠️ `retrievePackageProductClassificationCode` 도구

*   📁 **파일**: `src/tools/retrievePackageProductClassificationCode.js` (원래 파일명: `retrievePackageProductClassificationCodeTool.js`)
*   🎯 **목적**: OLS(Operation Link System)에서 패키지 상품의 '상품 구분' 코드('01') 리스트를 조회합니다. (상품구분: 01, 프로모션: 02, 테마: 03)
    *   `src/tools/index.js` 설명: "패키지 상품의 전체 상품구분 코드를 조회합니다."
*   📥 **입력 스키마**: 입력 파라미터 없음 (`z.object({})`)
*   🧠 **핸들러 로직**:
    1.  `packageService.retrievePackageProductClassificationCode()`를 호출합니다.
    2.  `packageService.retrievePackageProductClassificationCode`는 내부적으로 `src/services/helpers/packageProductSpecificCodeHelpers.js`의 `callPackageProductSpecificCodeService("01")` 함수를 호출합니다.
    3.  `callPackageProductSpecificCodeService`는 `apiUrls.olsBase` (또는 설정에 따라 다른 OLS URL)의 `/pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00` 엔드포인트로 `prodSprtrDvCd: "01"` 파라미터를 포함하여 POST 요청을 보냅니다.
    4.  서비스 응답 결과를 `cleanObject`로 정제합니다. (헬퍼 함수 내에서 처리)
    5.  정제된 결과를 JSON 문자열로 변환하여 MCP 콘텐츠로 반환합니다. (이 도구는 `createJsonResponse`를 직접 사용하지 않고, 서비스 결과를 그대로 반환하는 구조일 수 있음 - 실제 코드 확인 필요. 문서에서는 일관성을 위해 `createJsonResponse` 사용 가정)
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        // 실제 응답은 packageService.retrievePackageProductClassificationCode() 및 callPackageProductSpecificCodeService()의 반환 형식에 따름.
        // 만약 createJsonResponse를 사용한다면 아래와 유사한 구조가 될 것임.
        // text: {
        //   "status": "success",
        //   "data": [ /* 정제된 상품 구분 코드 객체 또는 문자열의 배열 */ ],
        //   "message": "Function retrievePackageProductClassificationCodeTool.handler executed successfully...",
        //   "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        // }
        // 현재 코드(Tool 자체)에서는 직접 JSON.stringify(result) 하므로 아래와 같음:
        "text": "[ /* 정제된 상품 구분 코드 객체 또는 문자열의 배열 */ ]"
      }]
    }
    ```

### 3.10. 🛠️ `retrievePackageProductPromotionCode` 도구

*   📁 **파일**: `src/tools/retrievePackageProductPromotionCode.js` (원래 파일명: `retrievePackageProductPromotionCodeTool.js`)
*   🎯 **목적**: OLS에서 패키지 상품의 '프로모션' 코드('02') 리스트를 조회합니다.
    *   `src/tools/index.js` 설명: "패키지 상품의 프로모션 코드를 조회합니다."
*   📥 **입력 스키마**: 입력 파라미터 없음 (`z.object({})`)
*   🧠 **핸들러 로직**:
    1.  `packageService.retrievePackageProductPromotionCode()`를 호출합니다.
    2.  내부적으로 `callPackageProductSpecificCodeService("02")`를 호출하여 처리 로직은 `retrievePackageProductClassificationCode` 도구와 유사합니다. `prodSprtrDvCd`만 "02"로 변경됩니다.
    3.  결과를 JSON 문자열로 변환하여 MCP 콘텐츠로 반환합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* 정제된 프로모션 코드 객체 또는 문자열의 배열 */ ]"
      }]
    }
    ```

### 3.11. 🛠️ `retrievePackageProductThemeCode` 도구

*   📁 **파일**: `src/tools/retrievePackageProductThemeCode.js` (원래 파일명: `retrievePackageProductThemeCodeTool.js`)
*   🎯 **목적**: OLS에서 패키지 상품의 '테마' 코드('03') 리스트를 조회합니다.
    *   `src/tools/index.js` 설명: "패키지 상품의 모든 테마 코드를 조회합니다."
*   📥 **입력 스키마**: 입력 파라미터 없음 (`z.object({})`)
*   🧠 **핸들러 로직**:
    1.  `packageService.retrievePackageProductThemeCode()`를 호출합니다.
    2.  내부적으로 `callPackageProductSpecificCodeService("03")`를 호출하여 처리 로직은 `retrievePackageProductClassificationCode` 도구와 유사합니다. `prodSprtrDvCd`만 "03"으로 변경됩니다.
    3.  결과를 JSON 문자열로 변환하여 MCP 콘텐츠로 반환합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* 정제된 테마 코드 객체 또는 문자열의 배열 */ ]"
      }]
    }
    ```

애플리케이션의 설정, 특히 서비스 통합을 위한 설정은 중앙에서 관리됩니다.

*   **주요 설정 파일**:
    *   📄 **`src/config/serviceConfig.js`**: **`packageService.js`**를 위한 특정 설정(예: API 기본 URL - **`PKG_API_BASE_URL`**, **`OLS_BASE_URL`**, **`COMMON_OLS_BASE_URL`**과 같은 환경 변수로 재정의 가능), 키워드-코드 매핑(`codeMappings.codeMapArray`) 및 기본 API 매개변수(`defaultApiParams`)를 상세히 기술합니다. 이 파일을 수정하거나 해당 환경 변수를 설정하면 서비스가 외부 시스템에 연결하거나 특정 비즈니스 규칙을 적용하는 방식을 변경할 수 있습니다.
*   환경 변수를 사용하여 특정 설정, 특히 API URL을 다양한 배포 환경(개발, 스테이징, 프로덕션)에 맞게 재정의할 수 있습니다.

## 5. 💪 SOLID 원칙 적용

서버는 **SOLID 원칙**을 준수하는 것을 목표로 합니다:

*   🎯 **단일 책임 원칙 (SRP - Single Responsibility Principle)**:
    *   **`server.js`**: 서버 생명주기 및 도구 등록을 관리합니다.
    *   도구 파일 (**`src/tools/*.js`**): MCP 인터페이스 정의, 입력 유효성 검사 및 서비스 위임을 수행합니다.
    *   서비스 파일 (**`src/services/*.js`**): 특정 비즈니스 로직을 캡슐화합니다.
    *   전송 파일 (**`src/transports/*.js`**): 전송 구성을 관리합니다.
    *   **`src/utils/logger.cjs`**: 로깅이라는 횡단 관심사를 관리합니다 (*참고: `.cjs` 확장자*).
    *   **`src/config/serviceConfig.js`**: 서비스 설정을 중앙 집중화하여 관심사 분리를 증진합니다.

*   🧩 **개방/폐쇄 원칙 (OCP - Open/Closed Principle)**:
    *   기존 도구 파일이나 **`server.js`** 핵심 로직을 수정하지 않고 **`src/tools/`**에 새 도구를 추가하고 **`src/tools/index.js`**에 등록할 수 있습니다.
    *   새로운 서비스도 유사하게 추가할 수 있습니다.

*   🤝 **리스코프 치환 원칙 (LSP - Liskov Substitution Principle)**:
    *   아직 상속을 통해 많이 시연되지는 않았지만, (JavaScript에서는 암시적인) 서비스 인터페이스는 다른 구현(예: 모의 서비스 대 실제 데이터베이스 서비스)이 필요한 경우 치환 가능하도록 의도되었습니다.

*   🔗 **인터페이스 분리 원칙 (ISP - Interface Segregation Principle)**:
    *   MCP 도구 정의 자체가 클라이언트를 위한 특정 인터페이스 역할을 합니다. 클라이언트는 자신이 사용하는 도구에 대해서만 알면 됩니다.

*   🔌 **의존관계 역전 원칙 (DIP - Dependency Inversion Principle)**:
    *   도구 핸들러는 구체적인 구현이 아닌 추상화( **`packageService`** 인터페이스)에 직접 의존합니다. JavaScript에는 TypeScript나 Java와 같은 명시적인 인터페이스가 없지만 서비스 모듈은 느슨하게 결합되어 있습니다.
    *   **`server.js`**는 SDK에서 **`StdioServerTransport`**를 직접 인스턴스화하는 대신 **`createStdioTransport`** 추상화에 의존합니다.

## 6. ✨ 새로운 MCP 도구 추가

1️⃣ **도구 로직 정의 (서비스 - *선택 사항이지만 권장됨*)**:
    *   도구가 새로운 비즈니스 로직을 포함하는 경우, 먼저 **`src/services/`**의 기존 서비스에 관련 함수를 추가하거나 새 서비스 파일(예: **`src/services/newFeatureService.js`**)을 만듭니다.
    *   서비스 로직에 대한 단위 테스트를 작성합니다.

2️⃣ **도구 정의 파일 생성**:
    *   **`src/tools/`**에 새 JavaScript 파일(예: **`src/tools/myNewTool.js`**)을 만듭니다.
    *   스키마 유효성 검사를 위해 **`zod`**에서 **`z`**를 가져옵니다.
    *   필요한 서비스를 가져옵니다.
    *   도구 객체를 정의하고 내보냅니다:
        ```javascript
        import { z } from "zod";
        // import { myService } from "../services/myService.js"; // 필요한 경우

        export const myNewTool = {
          name: "myNewToolName", // 고유한 도구 이름
          description: "도구가 수행하는 작업에 대한 간략한 설명입니다.",
          inputSchema: { // 입력 매개변수 및 해당 유형/유효성 검사 정의
            param1: z.string(),
            param2: z.number().optional(),
          },
          async handler({ param1, param2 }) { // 유효성이 검사된 입력 분해 할당
            // import logger from '../utils/logger.cjs'; // (경로 조정, 예: 하위 디렉터리의 도구인 경우 ../../utils/logger.cjs)
            // logger.info(`Executing myNewToolName with ${JSON.stringify({ param1, param2 })}`);
            try {
              // 여기에 도구 로직 작성
              // 예시: const result = await myService.process(param1, param2);
              console.log(`Executing myNewTool with param1: ${param1}, param2: ${param2}`);
              // const result = { message: `Result for ${param1}` };
              // logger.info(`myNewToolName completed successfully with result: ${JSON.stringify(result)}`);
              return {
                content: [{ type: "text", text: `Result for ${param1}` }],
              };
            } catch (error) {
              console.error(`Error in myNewTool: ${error.message}`, error);
              // logger.error(`Error in myNewToolName: ${error.message}`, { error: error.stack });
              throw error; // 또는 구조화된 오류 반환
            }
          },
        };
        ```
    *   **로깅 통합**: `handler` 내에서 **`src/utils/logger.cjs`**의 로거를 가져와 사용하여 항목, 매개변수, 결과 및 오류를 기록합니다.

3️⃣ **도구 등록**:
    *   **`src/tools/index.js`**를 엽니다.
    *   새 도구를 가져옵니다.
    *   `tools` 배열에 추가합니다:
        ```javascript
        import { getSaleProductScheduleTool } from "./getSaleProductSchedule.js";
        import { updateSaleProductScheduleTool } from "./updateSaleProductSchedule.js";
        import { myNewTool } from "./myNewTool.js"; // 새 도구 가져오기

        export const tools = [
          getSaleProductScheduleTool,
          updateSaleProductScheduleTool,
          myNewTool, // 배열에 추가
        ];
        ```
    > **참고**: 변경 사항을 적용하려면 새 도구를 추가한 후 서버를 다시 시작해야 합니다.

## 7. 🚀 실행 및 테스트

서버 실행 지침은 **`INSTALL.ko.MD`**를 참조하십시오.

수동으로 도구를 테스트하는 경우 (**`StdioTransport`** 및 호환 MCP 클라이언트를 사용하는 경우):
1. 서버를 실행합니다 (`node src/server.js`).
2. `stdin`을 통해 JSON 형식으로 MCP 요청을 보냅니다. 예를 들면 다음과 같습니다:
   **`getSaleProductSchedule`** 호출:
   ```json
   {
     "tool": "getSaleProductSchedule",
     "inputs": { "saleProdCd": "TEST001" }
   }
   ```
   **`updateSaleProductSchedule`** 호출:
   ```json
   {
     "tool": "updateSaleProductSchedule",
     "inputs": { "name": "New Test Name", "saleProdCd": "TEST002" }
   }
   ```
   `stdout`에서 JSON 출력을 관찰합니다.

## 8. 💡 일반적인 문제 해결

### 8.1. 에이전트 초기화 오류

다음과 유사한 오류 메시지가 발생하는 경우:
`Error: Agent could not be initialized. Please check LLM configuration and API keys.`

이는 일반적으로 언어 모델(LLM) 에이전트 설정 문제이며, 이 MCP 서버의 코드베이스 외부에 있지만 이 서버를 해당 에이전트와 통합하는 경우 관련이 있습니다.

**일반적인 원인 및 해결 방법:**

1.  **API 키 누락 또는 부정확:**
    *   **확인:** LLM 서비스(예: OpenAI, Gemini, Anthropic)용 API 키가 올바르게 설정되었는지 확인합니다.
    *   **해결책:** 키가 유효하고 만료되지 않았으며 수행하려는 작업에 필요한 권한이 있는지 확인합니다.

2.  **환경 변수 미설정 또는 로드 실패:**
    *   **확인:** API 키 및 기타 민감한 LLM 구성은 종종 환경 변수(예: `OPENAI_API_KEY`, `GEMINI_API_KEY`)를 통해 관리됩니다. 이러한 변수가 에이전트 또는 애플리케이션이 실행되는 환경에 설정되어 있는지 확인합니다.
    *   **해결책:**
        *   쉘에서 직접 환경 변수를 설정합니다:
            ```bash
            export YOUR_LLM_API_KEY="실제_API_키_여기에_입력"
            ```
        *   `.env` 파일을 사용하는 경우, 올바르게 포맷되었는지(예: `YOUR_LLM_API_KEY=실제_API_키_여기에_입력`) 그리고 애플리케이션이 이를 로드하도록 구성되었는지(예: Node.js에서 `dotenv`와 같은 라이브러리 사용) 확인합니다.
        *   변수 이름이 LLM SDK 또는 에이전트 코드에서 예상하는 것과 일치하는지 확인합니다.

3.  **LLM 서비스 구성 문제:**
    *   **확인:** LLM 에이전트의 구성 코드를 검토합니다. 잘못된 모델 이름, 엔드포인트 URL 또는 기타 매개변수가 있을 수 있습니다.
    *   **해결책:** 사용 중인 특정 LLM SDK 또는 라이브러리의 설명서를 참조하여 모든 구성 매개변수가 올바른지 확인합니다.

4.  **네트워크 연결 또는 서비스 중단:**
    *   **확인:** 서버 또는 개발 환경이 인터넷에 액세스할 수 있고 LLM 공급자의 API 엔드포인트에 도달할 수 있는지 확인합니다.
    *   **해결책:** LLM 공급자의 상태 페이지에서 진행 중인 중단 또는 유지 관리가 있는지 확인합니다. 기본 네트워크 연결을 테스트합니다(예: API 도메인에 `ping` 또는 `curl` 사용).

5.  **SDK/라이브러리 버전 문제:**
    *   **확인:** 오래되었거나 호환되지 않는 버전의 LLM SDK 또는 관련 라이브러리로 인해 초기화 오류가 발생할 수 있습니다.
    *   **해결책:** 호환되는 버전의 SDK를 사용하고 있는지 확인하고 필요한 경우 업데이트하며 릴리스 노트에서 주요 변경 사항을 확인합니다.

이러한 단계로 문제가 해결되지 않으면 사용 중인 LLM 에이전트 또는 SDK의 특정 설명서를 참조하고 더 많은 컨텍스트를 제공할 수 있는 자세한 오류 로그를 확인하십시오.

## 9. 🌱 향후 개선 사항

*   💾 **데이터베이스 통합**: **`src/services/`**의 일부 서비스(특히 `updateSaleProductSchedule` 관련 로직)는 실제 데이터베이스 연동 대신 예시 또는 비활성 API를 사용하고 있을 수 있습니다. 이를 실제 운영 환경에 맞게 데이터베이스 상호 작용으로 대체하거나 활성화된 API로 교체하는 것을 고려할 수 있습니다.
*   🧪 **단위 및 통합 테스트**: 현재 테스트 커버리지가 명시되어 있지 않습니다. 주요 서비스 로직 및 도구 핸들러에 대한 포괄적인 단위 테스트 및 통합 테스트 스위트를 구현하여 코드 안정성을 높입니다.
*   📊 **향상된 로깅 및 모니터링**: `Winston`을 사용한 로깅 시스템은 잘 구축되어 있으나, 로그 관리 시스템(예: ELK 스택, Splunk)과의 연동, 분산 추적, 성능 모니터링(APM) 도구 도입 등을 통해 운영 효율성을 높일 수 있습니다.
*   🛠️ **정교한 설정 관리**: `serviceConfig.js`와 환경 변수를 통한 설정 관리는 유용하지만, 대규모 시스템에서는 Vault, Consul과 같은 전용 설정 관리 도구를 도입하여 민감 정보 관리 및 동적 설정 업데이트 기능을 강화할 수 있습니다.
*   ⚠️ **더 정교한 오류 처리**: 현재는 주로 `callApi` 유틸리티나 각 핸들러에서 일반적인 오류 처리를 하고 있습니다. 비즈니스 로직에 따른 구체적인 오류 코드 정의, 사용자 정의 오류 클래스 도입 등을 통해 오류 추적 및 디버깅을 용이하게 할 수 있습니다.
*   🔄 **API 버전 관리**: 외부 API 엔드포인트가 변경될 경우를 대비하여, API URL 및 요청/응답 구조에 대한 버전 관리 전략을 도입하는 것을 고려할 수 있습니다.
*   💡 **문서 자동화**: 소스 코드 주석(예: JSDoc, TSDoc)이나 `zod` 스키마에서 직접 API 문서를 생성하는 도구를 도입하여 문서와 코드 간의 일관성을 유지하고 업데이트 부담을 줄일 수 있습니다. (예: Swagger/OpenAPI 연동)
