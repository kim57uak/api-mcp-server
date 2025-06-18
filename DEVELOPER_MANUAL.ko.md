# 📄 MCP 판매 상품 서버 - 개발자 매뉴얼

## 목차
- [1. 📖 프로젝트 개요](#1-📖-프로젝트-개요)
- [2. 🧱 프로젝트 구조](#2-🧱-프로젝트-구조)
  - [🔑 주요 구성 요소:](#🔑-주요-구성-요소)
- [3. 🔧 MCP 도구 구현](#3-🔧-mcp-도구-구현)
  - [3.1. 🛠️ `getSaleProductSchedule` 도구 (`src/tools/getSaleProductSchedule.js`)](#31-🛠️-getsaleproductschedule-도구-srctoolsgetsaleproductschedulejs)
  - [3.2. 🛠️ `updateSaleProductSchedule` 도구 (`src/tools/updateSaleProductSchedule.js`)](#32-🛠️-updatesaleproductschedule-도구-srctoolsupdatesaleproductschedulejs)
  - [3.3. 🛠️ `getDetailCommonCodeByQuery` 도구 (`src/tools/getDetailCommonCodeByQuery.js`)](#33-🛠️-getDetailCommonCodeByQuery-도구-srctoolsgetDetailCommonCodeByQueryjs)
  - [3.4. 🛠️ `getBasicCommonCodeByQuery` 도구](#34-🛠️-getbasiccommoncodebyquery-도구)
- [4. ⚙️ 설정 관리](#4-⚙️-설정-관리)
- [5. 💪 SOLID 원칙 적용](#5-💪-solid-원칙-적용)
- [6. ✨ 새로운 MCP 도구 추가](#6-✨-새로운-mcp-도구-추가)
- [7. 🚀 실행 및 테스트](#7-🚀-실행-및-테스트)
- [8. 🌱 향후 개선 사항](#8-🌱-향후-개선-사항)

이 문서는 **MCP 판매 상품 서버**의 아키텍처, 구성 요소 및 개발 가이드라인에 대한 자세한 개요를 제공합니다.

## 1. 📖 프로젝트 개요

**MCP 판매 상품 서버**는 **모델 컨텍스트 프로토콜(MCP) SDK**를 사용하여 구축된 **Node.js** 애플리케이션입니다. 판매 상품 스케줄을 관리하는 도구를 노출합니다. 서버는 유지보수성과 확장성을 보장하기 위해 **SOLID 원칙**을 염두에 두고 설계되었습니다.

서버는 **모델 컨텍스트 프로토콜(MCP) SDK** (`@modelcontextprotocol/sdk`)를 사용하여 구축되었습니다. 이 SDK는 프로젝트의 핵심 종속성이며, `package.json` 파일을 통해 관리되고 표준 `npm install` 프로세스의 일부로 설치됩니다. MCP 호환 서비스 및 도구를 만들고 관리하는 데 필요한 도구와 인터페이스를 제공합니다.

## 2. 🧱 프로젝트 구조

프로젝트는 모듈식 구조를 따릅니다:

```text
mcp-server/
├── logs/              # 로그 파일 (gitignored)
├── node_modules/      # 프로젝트 종속성 (npm으로 관리)
├── src/               # 소스 코드
│   ├── config/        # 설정 파일
│   │   └── serviceConfig.js # 서비스별 설정
│   ├── server.js      # 주 서버 초기화 및 연결 로직
│   ├── tools/         # MCP 도구 정의
│   │   ├── getSaleProductSchedule.js
│   │   ├── updateSaleProductSchedule.js
│   │   └── index.js   # 모든 도구 내보내기
│   ├── services/      # 비즈니스 로직 모듈
│   │   └── packageService.js
│   ├── transports/    # 전송 계층 설정
│   │   └── stdioTransport.js
│   ├── utils/         # 유틸리티 함수
│   │   └── logger.cjs    # 로깅 유틸리티 (.cjs 확장자 참고)
├── .gitignore         # Git이 무시해야 하는 의도적으로 추적되지 않는 파일 지정
├── DEVELOPER_MANUAL.md # 이 파일
├── INSTALL.md         # 사용자를 위한 설치 안내서
├── package.json       # 프로젝트 메타데이터 및 종속성
└── package-lock.json  # 종속성의 정확한 버전 기록
```

### 🔑 주요 구성 요소:

*   📄 **`src/server.js`**:
    *   **`@modelcontextprotocol/sdk`**에서 **`McpServer`** 인스턴스를 초기화합니다.
    *   **`src/tools/index.js`**에서 도구 정의를 가져옵니다.
    *   각 도구를 서버에 등록합니다.
    *   전송 계층(예: **`StdioServerTransport`**)을 생성하고 연결합니다.
    *   서버 연결에 대한 최상위 오류 처리를 포함합니다.

*   🛠️ **`src/tools/`**:
    *   각 파일(예: **`getSaleProductSchedule.js`**)은 특정 **MCP 도구**를 정의합니다.
    *   도구 정의는 `name`, `description`, `inputSchema`(**`zod`**를 사용한 유효성 검사) 및 `async handler` 함수를 가진 객체입니다.
    *   **도구 핸들러**는 다음을 담당합니다:
        1.  `inputSchema`에 대해 유효성이 검사된 입력을 받습니다.
        2.  비즈니스 로직을 수행하기 위해 **`src/services/`**에서 적절한 서비스 메서드를 호출합니다.
        3.  MCP 클라이언트를 위해 응답 형식을 지정합니다.
        4.  구조화된 오류 메시지를 반환하기 위한 기본 오류 처리(`try...catch`)를 수행합니다.
    *   **`src/tools/index.js`**는 모든 도구 정의를 집계하고 배열로 내보내며, **`server.js`**가 이를 사용합니다.

*   ⚙️ **`src/config/serviceConfig.js`**:
    *   이 파일은 주로 **`packageService.js`**와 같은 서비스의 설정을 중앙에서 관리합니다.
    *   `apiUrls`, `codeMappings`, `defaultApiParams`와 같은 객체를 내보냅니다.
    *   `apiUrls`는 외부 API의 기본 URL을 포함합니다. 이는 환경 변수(예: **`PKG_API_BASE_URL`**)로 재정의될 수 있습니다.
    *   `codeMappings`는 **`getDetailCommonCodeByQuery`**를 위한 `codeMapArray`와 같이 비즈니스 로직에서 사용되는 매핑을 포함합니다.
    *   `defaultApiParams`는 `commonCodeLang`과 같이 API 호출을 위한 기본 매개변수를 보유합니다.
    *   이 접근 방식은 서비스 로직을 변경하지 않고 설정 및 환경별 구성을 더 쉽게 관리할 수 있도록 합니다.

*   📦 **`src/services/`**:
    *   비즈니스 로직을 담당하는 모듈을 포함합니다. 예를 들어, **`packageService.js`**는 패키지 스케줄 및 공통 코드 검색과 관련된 비즈니스 로직을 처리합니다. 이제 API 엔드포인트 및 기타 운영 매개변수를 **`src/config/serviceConfig.js`**에서 가져오므로 더욱 설정하기 쉬워졌습니다. **`getSchedules()`**, **`updateSchedule()`**, **`getDetailCommonCodeByQuery()`**와 같은 함수를 포함합니다.
    *   서비스는 MCP 전송 계층과 독립적으로 설계되었으며 재사용될 수 있습니다.
    *   데이터 검색, 업데이트 및 복잡한 계산을 수행합니다.

*   🚇 **`src/transports/`**:
    *   전송 인스턴스를 생성하고 구성하기 위한 모듈입니다. **`stdioTransport.js`**는 표준 I/O 전송을 제공합니다. 이러한 분리는 향후 전송 계층을 더 쉽게 추가하거나 수정할 수 있도록 합니다.

*   🪵 **`src/utils/logger.cjs`**:
    *   **`winston`** 라이브러리를 사용하여 설정 가능한 로깅 시스템을 구현합니다(*참고: `.cjs` 확장자*). 콘솔(색상 포함)과 순환 파일(**`logs/app.log`**) 모두에 로깅을 지원합니다. 로그 항목에는 타임스탬프, 로그 수준 및 메시지가 포함됩니다. 서비스 및 도구 전반의 함수들이 이 로거를 활용합니다.

## 3. 🔧 MCP 도구 구현

### 3.1. 🛠️ `getSaleProductSchedule` 도구 (`src/tools/getSaleProductSchedule.js`)

*   🎯 **목적**: `saleProdCd`를 기반으로 판매 상품 스케줄을 조회합니다. (*원문 설명: "판매상품 일정을 판매상품코드로 조회합니다."*)
*   📥 **입력 스키마** (**`zod`**):
    ```javascript
    { saleProdCd: z.string().min(1) } // saleProdCd는 비어 있지 않은 문자열이어야 합니다.
    ```
*   🧠 **핸들러 로직**:
    1.  중앙 로거를 사용하여 항목, 매개변수, 결과 및 오류를 콘솔과 파일 모두에 기록합니다.
    2.  `saleProdCd`를 입력으로 받습니다.
    3.  스케줄 데이터를 가져오기 위해 **`packageService.getSchedules(saleProdCd)`**를 호출합니다.
    4.  데이터를 MCP 콘텐츠 구조(타입 `text`)로 포맷합니다.
    5.  예외 발생 시 포맷된 콘텐츠 또는 오류 객체를 반환합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"saleProdCd\": \"ALLLSLSLSL\",\n  \"schedules\": [\n    { \"id\": \"schedule1\", \"time\": \"2024-07-30T10:00:00Z\", \"event\": \"Event A (from service)\" },\n    { \"id\": \"schedule2\", \"time\": \"2024-07-31T14:30:00Z\", \"event\": \"Event B (from service)\" }\n  ],\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.2. 🛠️ `updateSaleProductSchedule` 도구 (`src/tools/updateSaleProductSchedule.js`)

*   🎯 **목적**: 판매 상품 스케줄을 업데이트합니다. (*원문 설명: "판매 상품 스케줄을 수정합니다."*)
*   📥 **입력 스키마** (**`zod`**):
    ```javascript
    { name: z.string().min(1), saleProdCd: z.string().min(1) } // name과 saleProdCd는 비어 있지 않은 문자열이어야 합니다.
    ```
*   🧠 **핸들러 로직**:
    1.  중앙 로거를 사용하여 항목, 매개변수, 결과 및 오류를 콘솔과 파일 모두에 기록합니다.
    2.  `name`과 `saleProdCd`를 입력으로 받습니다.
    3.  업데이트를 수행하기 위해 **`packageService.updateSchedule(saleProdCd, name)`**을 호출합니다.
    4.  성공 또는 실패를 나타내는 JSON 응답을 반환합니다.
    5.  예외 발생 시 오류 객체를 포함합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"message\": \"Schedule for ALLLSLSLSL updated with name name_1. Service status: Updated via service\",\n  \"updatedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.3. 🛠️ `getDetailCommonCodeByQuery` 도구 (`src/tools/getDetailCommonCodeByQuery.js`)

*   🎯 **목적**: 사용자 질의에 따라 공통 코드(예: 속성, 지역, 국가, 대륙, 브랜드 코드)를 조회합니다. (*원문 설명: "사용자 질의중 코드성 데이타에 적합한 속성,지역,국가,대륙,브랜드 코드를 조회합니다."*)
*   📥 **입력 스키마** (**`zod`**):
    ```javascript
    { query: z.string().min(1) } // query는 비어 있지 않은 문자열이어야 합니다.
    ```
*   🧠 **핸들러 로직**:
    1.  중앙 로거를 사용하여 항목, 매개변수, 결과 및 오류를 콘솔과 파일 모두에 기록합니다.
    2.  `query`를 입력으로 받습니다.
    3.  공통 코드 데이터를 가져오기 위해 **`packageService.getDetailCommonCodeByQuery(query)`**를 호출합니다. `packageService.getDetailCommonCodeByQuery(query)` 메서드는 다음 단계를 수행합니다:
        1.  `src/config/serviceConfig.js`의 `apiUrls.commonOlsBase`와 `/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00` 엔드포인트를 사용하여 URL을 구성합니다.
        2.  이 URL에 `POST` 요청을 보냅니다. 요청 본문에는 다음이 포함됩니다:
            *   `comBscCd`: 입력 `query` 문자열.
            *   `header`: `src/config/serviceConfig.js`의 `defaultApiParams.commonCodeLang`에서 가져온 `langCode`를 포함하는 객체.
        3.  이 API 호출의 응답 데이터는 원본 쿼리와 함께 패키징되어 반환됩니다.
    4.  데이터를 MCP 콘텐츠 구조(타입 `text`) 내의 JSON 문자열로 포맷합니다.
    5.  예외 발생 시 포맷된 콘텐츠 또는 오류 객체를 반환합니다.
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"code\": \"PROD_ATTR_CD\",\n  \"data\": { \"example\": [\"code1\", \"code2\"] }\n}"
      }]
    }
    ```

### 3.4. 🛠️ `getBasicCommonCodeByQuery` 도구

*   🎯 **목적**: 사용자 질의에 따라 적합한 기본 공통 코드를 조회합니다. (*원문 설명: "사용자 질의에 따라 적합한 기본공통코드를 조회합니다."*)
*   📥 **입력 스키마** (**`zod`**):
    ```javascript
    { query: z.string().min(1) } // query는 비어 있지 않은 문자열이어야 합니다.
    ```
*   🧠 **핸들러 로직**:
    ```
    1. 입력 `query`를 기록합니다.
    2. 기본 공통 코드 데이터를 가져오기 위해 `packageService.getBasicCommonCodeByQuery(query)`를 호출합니다. `packageService.getBasicCommonCodeByQuery(query)` 메서드는 다음 단계를 수행합니다:
        1.  `src/config/serviceConfig.js`의 `apiUrls.commonOlsBase`와 `/common/ols/codemgt/cbc/commoncodemgt/getComBscCdList/v1.00` 엔드포인트를 사용하여 URL을 구성합니다. 이 엔드포인트는 특히 기본 공통 코드를 가져오기 위한 것입니다.
        2.  이 URL에 `POST` 요청을 보냅니다. 요청 본문에는 다음이 포함됩니다:
            *   `comBscCd`: 입력 `query` 문자열.
            *   `header`: `src/config/serviceConfig.js`의 `defaultApiParams.commonCodeLang`에서 가져온 `langCode`를 포함하는 객체.
        3.  이 API 호출의 응답 데이터(기본 공통 코드 목록)는 원본 쿼리와 함께 패키징되어 반환됩니다.
    3. 결과를 MCP 콘텐츠 구조(타입 `text`) 내의 JSON 문자열로 포맷합니다.
    4. 예외 발생 시 포맷된 콘텐츠 또는 오류 객체를 반환합니다.
    ```
*   ✅ **출력 (성공 예시)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"code\": \"BASIC_CODE_EXAMPLE\",\n  \"data\": { \"description\": \"Sample basic common code data\" }\n}"
      }]
    }
    ```

## 4. ⚙️ 설정 관리

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

## 8. 🌱 향후 개선 사항

*   💾 **데이터베이스 통합**: **`src/services/`**의 모의 서비스를 실제 데이터베이스 상호 작용으로 대체합니다.
*   🧪 **단위 및 통합 테스트**: 포괄적인 테스트 스위트를 구현합니다.
*   📊 **향상된 로깅**: 강력한 로깅 시스템(**`Winston`**, 파일/콘솔 출력)이 현재 마련되어 있지만, 향후 개선 사항에는 로그 관리 시스템에서 더 쉽게 구문 분석할 수 있는 구조화된 로깅 또는 구성/API를 통한 동적 로그 수준 변경이 포함될 수 있습니다.
*   🛠️ **정교한 설정 관리**: **`serviceConfig.js`**가 일부 설정을 중앙 집중화하지만, 특히 민감한 데이터나 더 다양한 배포 환경을 위해 더 복잡한 애플리케이션의 경우 추가적인 외부화(예: 코드베이스 외부에서 완전히 관리되는 `.env` 파일 또는 전용 구성 서비스)를 탐색할 수 있습니다.
*   ⚠️ **더 정교한 오류 처리**: 사용자 정의 오류 클래스, 더 세분화된 오류 코드를 도입합니다.
