# 📄 MCP 판매상품 서버 - 개발자 매뉴얼

## 목차
- [📄 MCP 판매상품 서버 - 개발자 매뉴얼](#-mcp-판매상품-서버---개발자-매뉴얼)
  - [목차](#목차)
  - [1. 📖 프로젝트 개요](#1--프로젝트-개요)
  - [2. 🧱 프로젝트 구조](#2--프로젝트-구조)
    - [🔑 주요 구성요소](#-주요-구성요소)
  - [3. 🔧 MCP 도구 구현](#3--mcp-도구-구현)
    - [3.1. 🛠️ `getSaleProductSchedule` 도구](#31-️-getsaleproductschedule-도구)
    - [3.2. 🛠️ `getDetailCommonCodeByQuery` 도구](#32-️-getdetailcommoncodebyquery-도구)
    - [3.3. 🛠️ `getBasicCommonCodeByQuery` 도구](#33-️-getbasiccommoncodebyquery-도구)
    - [3.4. 🛠️ `retrieveSaleProductInformation` 도구](#34-️-retrievesaleproductinformation-도구)
    - [3.5. 🛠️ `retrieveAreaCode` 도구](#35-️-retrieveareacode-도구)
  - [4. ⚙️ 설정 관리](#4-️-설정-관리)
  - [5. 💪 SOLID 원칙 적용](#5--solid-원칙-적용)
  - [6. 🔧 includeFields를 통한 응답 최적화](#6--includefields를-통한-응답-최적화)
    - [6.1. 🎯 목적과 이점](#61--목적과-이점)
    - [6.2. 🛠️ 구현 가이드](#62-️-구현-가이드)
    - [6.3. 📝 구현 예제](#63--구현-예제)
    - [6.4. 🔍 모범 사례](#64--모범-사례)
  - [7. ✨ 새로운 MCP 도구 추가](#7--새로운-mcp-도구-추가)
  - [8. 🚀 실행 및 테스트](#8--실행-및-테스트)
  - [9. 💡 일반적인 문제 해결](#9--일반적인-문제-해결)
    - [9.1. 에이전트 초기화 오류](#91-에이전트-초기화-오류)
  - [10. 🌱 향후 개선사항](#10--향후-개선사항)

이 문서는 **MCP 판매상품 서버**의 아키텍처, 구성요소 및 개발 가이드라인에 대한 상세한 개요를 제공합니다.

## 1. 📖 프로젝트 개요

**MCP 판매상품 서버**는 **Model Context Protocol (MCP) SDK**를 사용하여 구축된 **Node.js** 애플리케이션입니다. 판매 일정, 패키지 세부정보, 공통 코드 등을 포함한 여행 상품 정보를 관리하고 검색하기 위한 다양한 도구를 제공합니다. 서버는 유지보수성과 확장성을 보장하기 위해 **SOLID 원칙**을 염두에 두고 설계되었습니다.

서버는 **Model Context Protocol (MCP) SDK** (`@modelcontextprotocol/sdk`)를 사용하여 구축되었습니다. 이 SDK는 프로젝트의 핵심 종속성으로, `package.json` 파일을 통해 관리되며 표준 `npm install` 프로세스의 일부로 설치됩니다. MCP 호환 서비스 및 도구를 생성하고 관리하는 데 필요한 도구와 인터페이스를 제공합니다.

## 2. 🧱 프로젝트 구조

프로젝트는 모듈식 구조를 따릅니다:

```text
mcp-server/
├── logs/                     # 로그 파일 (gitignored)
├── node_modules/             # 프로젝트 종속성 (npm으로 관리)
├── src/                      # 소스 코드
│   ├── config/               # 설정 파일
│   │   └── serviceConfig.js  # 서비스별 설정 (API URL 등)
│   ├── server.js             # 메인 서버 초기화 및 연결 로직
│   ├── services/             # 비즈니스 로직 모듈
│   │   ├── packageService.js # 핵심 비즈니스 로직
│   │   └── helpers/          # 서비스 헬퍼 모듈
│   │       ├── packageProductSpecificCodeHelpers.js
│   │       └── packageServiceHelpers.js
│   ├── tools/                # MCP 도구 정의
│   │   ├── getSaleProductSchedule.js
│   │   ├── retrieveSaleProductInformation.js
│   │   └── index.js          # 모든 도구를 집계하고 내보냄
│   ├── transports/           # 전송 계층 설정
│   │   └── stdioTransport.js
│   ├── utils/                # 유틸리티 함수
│   │   ├── apiUtils.js       # API 호출 유틸리티
│   │   ├── logger.cjs        # 로깅 유틸리티 (.cjs 확장자 주의)
│   │   ├── objectUtils.js    # 객체 정리 유틸리티 (HTML 태그 제거 등)
│   │   ├── responseUtils.js  # 표준 JSON 응답 생성 유틸리티
│   │   └── stripHtml.js      # HTML 태그 제거 유틸리티
├── .gitignore                # Git이 무시해야 할 의도적으로 추적되지 않는 파일 지정
├── DEVELOPER_MANUAL.ko.md    # 개발자 매뉴얼 (한국어)
├── DEVELOPER_MANUAL.md       # 개발자 매뉴얼 (영어)
├── INSTALL.ko.md             # 설치 가이드 (한국어)
├── INSTALL.md                # 설치 가이드 (영어)
├── README.ko.md              # 프로젝트 개요 (한국어)
├── README.md                 # 프로젝트 개요 (영어)
├── package.json              # 프로젝트 메타데이터 및 종속성
└── package-lock.json         # 종속성의 정확한 버전 기록
```

### 🔑 주요 구성요소

*   📄 **`src/server.js`**:
    *   `@modelcontextprotocol/sdk`에서 `McpServer` 인스턴스를 초기화합니다.
    *   `src/tools/index.js`에서 모든 도구 정의를 가져와 서버에 등록합니다.
    *   `src/transports/stdioTransport.js`를 사용하여 Standard I/O (StdIO) 전송 계층을 생성하고 연결합니다.
    *   서버 시작 및 연결을 위한 최상위 오류 처리를 포함합니다.

*   🛠️ **`src/tools/`**:
    *   각 파일은 특정 MCP 도구를 정의합니다 (예: `getSaleProductSchedule.js`).
    *   각 도구 정의는 `name` (고유 식별자), `description` (기능 설명), `inputSchema` (`zod`를 사용한 입력 검증 스키마), `async handler` (실제 로직을 수행하는 함수)를 포함하는 객체입니다.
    *   **도구 핸들러**는 일반적으로 다음을 수행합니다:
        1.  검증된 입력을 받습니다.
        2.  `src/services/packageService.js`에서 적절한 서비스 메서드를 호출하여 비즈니스 로직을 실행합니다.
        3.  `src/utils/objectUtils.js`의 `cleanObject`를 사용하여 서비스 결과를 정리합니다 (HTML 태그 및 불필요한 `null` 값 제거).
        4.  `src/utils/responseUtils.js`의 `createJsonResponse`를 사용하여 MCP 클라이언트를 위한 표준화된 JSON 형식으로 최종 응답을 포맷합니다.
        5.  오류가 발생하면 로그를 남기고 전파합니다.
    *   `src/tools/index.js`는 모든 도구 정의를 집계하고 `server.js`에 제공하기 전에 설명을 더 구체적으로 재정의할 수 있습니다.

*   ⚙️ **`src/config/serviceConfig.js`**:
    *   외부 API의 기본 URL (`apiUrls`) 및 기본 API 요청 매개변수 (`defaultApiParams`)와 같은 서비스 계층의 설정을 중앙에서 관리합니다.
    *   API URL은 환경 변수 (예: `PKG_API_BASE_URL`, `OLS_QA_BASE_URL`, `COMMON_OLS_BASE_URL`)로 재정의할 수 있어 다양한 환경 (개발, QA, 프로덕션)에서의 배포를 용이하게 합니다.

*   📦 **`src/services/packageService.js`**:
    *   애플리케이션의 핵심 비즈니스 로직을 포함합니다. 외부 API 호출, 데이터 처리, 도구 핸들러에 필요한 데이터 준비를 담당합니다.
    *   `src/config/serviceConfig.js`에서 API 엔드포인트와 기본 매개변수를 가져옵니다.
    *   `src/utils/apiUtils.js`의 `callApi` 유틸리티를 사용하여 실제 HTTP 요청을 수행합니다.
    *   복잡한 요청 본문 생성 로직은 `src/services/helpers/packageServiceHelpers.js`와 같은 헬퍼 모듈에 위임될 수 있습니다.
    *   특정 코드 검색 로직 (예: 상품 분류, 프로모션, 테마 코드)은 `src/services/helpers/packageProductSpecificCodeHelpers.js`의 `callPackageProductSpecificCodeService`와 같은 헬퍼 함수를 통해 처리됩니다.

## 3. 🔧 MCP 도구 구현

서버는 여행 상품 관련 정보를 쿼리하고 관리하기 위한 다양한 MCP 도구를 제공합니다. 모든 도구는 `src/tools/` 디렉토리에 정의되고 `src/tools/index.js`를 통해 등록됩니다.

각 도구는 일반적으로 다음 구조를 따릅니다:
1.  **입력 검증**: `zod` 스키마를 사용하여 입력 매개변수를 검증합니다.
2.  **서비스 호출**: `packageService`에서 해당 함수를 호출하여 비즈니스 로직을 수행합니다.
3.  **결과 정리**: `cleanObject` 유틸리티를 사용하여 서비스에서 받은 데이터에서 HTML 태그 등을 제거합니다.
4.  **응답 생성**: `createJsonResponse` 유틸리티를 사용하여 표준화된 JSON 응답을 생성합니다.

### 3.1. 🛠️ `getSaleProductSchedule` 도구

*   📁 **파일**: `src/tools/getSaleProductSchedule.js`
*   🎯 **목적**: 주어진 `saleProdCd` (판매상품코드)에 대한 여행 일정(여정) 정보를 검색합니다. **이 도구는 응답 크기와 성능을 최적화하기 위해 `includeFields`를 사용한 필드 필터링을 구현합니다.**
    *   응답에는 다음이 포함됩니다:
        *   `meetInfoBcVo`: 필터링된 필드가 있는 미팅 정보 (`sndgMeetDt`, `sndgMeetTm`, `aptCd`)
        *   `schdInfoList`: 필터링된 필드가 있는 일정 정보 (`schdDay`, `strtDt`, `strDow`)
        *   `schdMainInfoList`: 필터링된 필드가 있는 주요 일정 세부정보
        *   `htlInfoList`: 필터링된 필드가 있는 호텔 정보
        *   `pkgAirSeqList`: 필터링된 필드가 있는 항공편 정보
*   📥 **입력 스키마**:
    | 매개변수     | 타입   | 필수 | 설명             |
    | :----------- | :----- | :--- | :--------------- |
    | `saleProdCd` | string | 예   | 판매상품코드     |

### 3.2. 🛠️ `getDetailCommonCodeByQuery` 도구

*   📁 **파일**: `src/tools/getDetailCommonCodeByQuery.js`
*   🎯 **목적**: 사용자가 요청한 공통 코드 중 기초적이고 일반적이며 좀 더 명확한 값을 선택한 후 그 값으로 함수를 조회하는 역할을 합니다.
*   📥 **입력 스키마**:
    | 매개변수 | 타입   | 필수 | 설명                    |
    | :------- | :----- | :--- | :---------------------- |
    | `query`  | string | 예   | 검색할 코드명 또는 쿼리 |

### 3.3. 🛠️ `getBasicCommonCodeByQuery` 도구

*   📁 **파일**: `src/tools/getBasicCommonCodeByQuery.js`
*   🎯 **목적**: 사용자가 요청한 공통 코드 중 "기초적이고 일반적이며 좀 더 명확하지 않은" 값을 찾아 조회하는 역할을 합니다.
*   📥 **입력 스키마**:
    | 매개변수 | 타입   | 필수 | 설명                    |
    | :------- | :----- | :--- | :---------------------- |
    | `query`  | string | 예   | 검색할 코드명 또는 쿼리 |

### 3.4. 🛠️ `retrieveSaleProductInformation` 도구

*   📁 **파일**: `src/tools/retrieveSaleProductInformation.js`
*   🎯 **목적**: 다양한 검색 조건을 입력하여 1건 이상의 판매상품정보를 조회합니다. 코드값을 알지 못하므로 단계적으로 함수를 호출해서 적절한 상품코드로 조회할 수 있도록 도와줍니다.
*   📥 **입력 스키마**:
    | 매개변수              | 타입   | 필수 | 설명                                    |
    | :-------------------- | :----- | :--- | :-------------------------------------- |
    | `startDate`           | string | 예   | 상품 검색을 위한 시작 날짜 (YYYYMMDD)   |
    | `endDate`             | string | 예   | 상품 검색을 위한 종료 날짜 (YYYYMMDD)   |
    | `productAreaCode`     | string | 예   | 영문과 숫자가 조합된 2자리 지역코드     |
    | `saleProductCode`     | string | 아니오 | 특정 판매 상품을 조회할 때 사용하는 고유 코드 |
    | `productAttributeCode`| string | 아니오 | 영문 1자리 상품속성코드                 |
    | `saleProductName`     | string | 아니오 | 상품명을 의미하는 텍스트 키워드         |

### 3.5. 🛠️ `retrieveAreaCode` 도구

*   📁 **파일**: `src/tools/retrieveAreaCode.js`
*   🎯 **목적**: 지역, 국가, 대륙에 대한 정보를 조회합니다. **이 도구는 최적의 성능을 위해 `includeFields`를 사용하여 필수 필드(`code`, `codeNm`)만 반환하는 필드 필터링을 구현합니다.**
*   📥 **입력 스키마**: 매개변수 없음 (`z.object({})`)

## 4. ⚙️ 설정 관리

애플리케이션의 설정, 특히 서비스 통합을 위한 설정은 주로 `src/config/serviceConfig.js`와 환경 변수를 통해 중앙에서 관리됩니다.

*   **주요 설정 파일**:
    *   📄 **`src/config/serviceConfig.js`**: 이 파일은 `packageService.js`와 확장적으로 도구들이 외부 API와 상호작용하는 방법을 정의하는 데 중요합니다. 다음을 내보냅니다:
        *   `apiUrls`: 다양한 백엔드 서비스의 기본 URL을 포함하는 객체
        *   `defaultApiParams`: API 호출을 위한 기본 매개변수를 포함하는 객체

*   **환경 변수**:
    *   위에서 언급한 바와 같이, 여러 API 기본 URL은 환경 변수를 사용하여 재정의할 수 있습니다. 이는 코드 변경 없이 애플리케이션을 다양한 배포 환경에 적응시키는 표준 관행입니다.

## 5. 💪 SOLID 원칙 적용

서버 아키텍처는 유지보수성과 확장성을 향상시키기 위해 **SOLID 원칙**을 준수하는 것을 목표로 합니다:

*   🎯 **단일 책임 원칙 (SRP)**:
    *   **`src/server.js`**: 서버 초기화, 도구 등록, 전송 계층 연결에 집중합니다.
    *   개별 도구 파일들: 각 도구 파일은 특정 MCP 인터페이스 정의와 고유한 요청 로직 처리를 담당합니다.
    *   **`src/services/packageService.js`**: 다양한 패키지 및 상품 관련 API와의 상호작용을 위한 핵심 비즈니스 로직을 캡슐화합니다.

*   🧩 **개방-폐쇄 원칙 (OCP)**:
    *   시스템은 확장에는 열려있고 수정에는 닫혀있습니다. 새로운 도구는 **`src/tools/`**에 새 파일을 생성하고 **`src/tools/index.js`**에 등록함으로써 추가할 수 있습니다.

*   🤝 **리스코프 치환 원칙 (LSP)**:
    *   JavaScript는 인터페이스를 타입 언어만큼 엄격하게 강제하지 않지만, 설계는 필요시 서비스 구성요소가 치환 가능하도록 의도합니다.

*   🔗 **인터페이스 분리 원칙 (ISP)**:
    *   각 MCP 도구 정의는 특정한 클라이언트 대면 인터페이스 역할을 합니다. 클라이언트는 사용하려는 도구에 대해서만 알면 됩니다.

*   🔌 **의존성 역전 원칙 (DIP)**:
    *   고수준 모듈(도구 핸들러)은 구체적인 저수준 구현보다는 추상화(`packageService`의 인터페이스)에 의존합니다.

## 6. 🔧 includeFields를 통한 응답 최적화

### 6.1. 🎯 목적과 이점

`includeFields` 유틸리티는 불필요한 데이터 필드를 필터링하여 API 응답을 최적화하도록 설계된 강력한 기능입니다. 이 접근 방식은 여러 주요 이점을 제공합니다:

*   **🚀 성능 향상**: 응답 페이로드 크기를 줄여 더 빠른 데이터 전송 및 처리를 가능하게 합니다
*   **💰 대역폭 최적화**: 사용하지 않는 필드를 제외하여 네트워크 사용량을 최소화합니다
*   **🔍 집중된 데이터**: 관련 정보만 반환하여 응답을 파싱하고 이해하기 쉽게 만듭니다
*   **🔒 보안 강화**: 민감하거나 내부 필드의 우발적 노출을 방지합니다
*   **🧠 메모리 효율성**: 서버와 클라이언트 애플리케이션 모두에서 메모리 소비를 줄입니다

### 6.2. 🛠️ 구현 가이드

`includeFields` 함수는 `src/utils/responseFilter.js`에 위치하며 모든 API 응답 데이터 구조에 적용할 수 있습니다.

**기본 사용 패턴:**
```javascript
import { includeFields } from '../utils/responseFilter.js';

// 단일 객체 필터링
const filteredObject = includeFields(originalObject, ['field1', 'field2', 'field3']);

// 객체 배열 필터링
const filteredArray = originalArray.map(item => 
  includeFields(item, ['field1', 'field2'])
);
```

### 6.3. 📝 구현 예제

다음은 `getSaleProductSchedule` 도구에서 `includeFields`가 구현된 방법입니다:

```javascript
// src/tools/getSaleProductSchedule.js
import { includeFields } from "../utils/responseFilter.js";

export const getSaleProductScheduleTool = {
  // ... 도구 정의
  async handler({ saleProdCd }) {
    try {
      const schedules = await packageService.getSchedules(saleProdCd);
      
      // 필터링된 응답 객체 생성
      let filteredSchedules = {};
      
      // 미팅 정보 필터링
      if (schedules?.meetInfoBcVo) {
        filteredSchedules.meetInfoBcVo = includeFields(schedules.meetInfoBcVo, 
          ['sndgMeetDt', 'sndgMeetTm', 'aptCd']);
      }
      
      // 중첩 필터링을 포함한 일정 정보 필터링
      if (schedules?.schdInfoList) {
        filteredSchedules.schdInfoList = schedules.schdInfoList.map(item => {
          const filteredItem = includeFields(item, ['schdDay', 'strtDt', 'strDow']);
          
          // 중첩된 주요 일정 정보 필터링
          if (item?.schdMainInfoList) {
            filteredItem.schdMainInfoList = item.schdMainInfoList.map(subItem => 
              includeFields(subItem, [
                'schtExprSqc', 'schdCatgNm', 'depCityCd', 'arrCityCd', 
                'schdDay', 'memoTitlNm', 'dtlMealDvNm', 'mealTypeNm', 'cardCntntPc'
              ])
            );
          }
          
          return filteredItem;
        });
      }
      
      // 정리된 필터링된 응답 반환
      const cleanedSchedules = cleanObject(filteredSchedules);
      return createJsonResponse(functionName, {
        saleProdCd,
        schedules: cleanedSchedules,
        retrievedAt: new Date().toISOString()
      }, logger);
      
    } catch (error) {
      // 오류 처리...
    }
  }
};
```

### 6.4. 🔍 모범 사례

**1. 필드 선택 전략:**
*   ✅ 클라이언트 애플리케이션에서 실제로 사용되는 필드만 포함
*   ✅ 메타데이터나 내부 필드보다 필수 비즈니스 데이터를 우선시
*   ✅ 각 API 엔드포인트의 특정 사용 사례 고려

**2. 문서화:**
*   ✅ 어떤 필드가 포함되고 왜 포함되는지 문서화
*   ✅ API 엔드포인트와 필터링된 필드 간의 명확한 매핑 유지
*   ✅ 필드 요구사항이 변경될 때 문서 업데이트

## 7. ✨ 새로운 MCP 도구 추가

서버에 새로운 MCP 도구를 추가하려면 다음 단계를 따르세요:

1️⃣ **도구 로직 정의 (서비스에서 우선적으로)**:
    *   새 도구가 새로운 비즈니스 로직을 포함하는 경우, 먼저 `src/services/packageService.js` 내에서 이 로직을 구현하거나, 상당히 다른 경우 새 서비스 파일을 생성하는 것이 좋습니다.

2️⃣ **도구 정의 파일 생성**:
    *   `src/tools/` 디렉토리에 새 JavaScript 파일을 생성합니다 (예: `src/tools/myNewTool.js`).
    *   입력 스키마 검증을 위해 `zod`에서 `z`를 가져옵니다.
    *   비즈니스 로직에 액세스하기 위해 `packageService`를 가져옵니다.
    *   필요한 유틸리티들을 가져옵니다.

3️⃣ **도구 등록**:
    *   `src/tools/index.js`를 엽니다.
    *   새 도구 정의를 가져옵니다.
    *   `tools` 배열에 도구 객체를 추가합니다.

4️⃣ **서버 재시작**:
    *   새 도구를 추가하고 등록한 후, 변경사항이 적용되려면 Node.js 서버를 재시작해야 합니다.

## 8. 🚀 실행 및 테스트

종속성 설치 및 서버 실행 방법에 대한 지침은 **`INSTALL.MD`**를 참조하세요.

도구를 수동으로 테스트하려면 (특히 호환 가능한 MCP 클라이언트와 함께 `StdioTransport`를 사용할 때):
1.  서버가 실행 중인지 확인: `node src/server.js`
2.  `stdin`을 통해 JSON 형식으로 MCP 요청을 보냅니다.
3.  `stdout`에서 JSON 출력을 관찰합니다.

## 9. 💡 일반적인 문제 해결

### 9.1. 에이전트 초기화 오류

다음과 유사한 오류 메시지가 나타나는 경우:
`Error: Agent could not be initialized. Please check LLM configuration and API keys.`

이는 일반적으로 이 MCP 서버의 코드베이스 외부에 있지만 이 서버를 그러한 에이전트와 통합하는 경우 관련이 있는 언어 모델(LLM) 에이전트 설정 문제를 나타냅니다.

**일반적인 원인 및 해결책:**

1.  **API 키 누락 또는 잘못됨**:
    *   **확인**: LLM 서비스(예: OpenAI, Gemini, Anthropic)의 API 키가 올바르게 설정되었는지 확인합니다.
    *   **해결책**: 키가 유효하고 만료되지 않았으며 수행하려는 작업에 필요한 권한이 있는지 확인합니다.

2.  **환경 변수가 설정되지 않았거나 로드되지 않음**:
    *   **확인**: API 키 및 기타 민감한 LLM 설정은 종종 환경 변수를 통해 관리됩니다.
    *   **해결책**: 환경 변수를 직접 설정하거나 `.env` 파일을 사용합니다.

## 10. 🌱 향후 개선사항

*   💾 **데이터베이스 통합**: 일부 서비스 함수들을 실제 데이터베이스나 확인된 라이브 API와 상호작용하도록 향상시킬 수 있습니다.
*   🧪 **단위 및 통합 테스트**: 포괄적인 테스트 스위트 구현으로 코드 안정성과 신뢰성을 크게 향상시킬 수 있습니다.
*   📊 **고급 로깅 및 모니터링**: 기존 `Winston` 설정을 로그 관리 시스템과 통합하여 향상시킬 수 있습니다.
*   🛠️ **정교한 설정 관리**: 대규모 시스템의 경우 전용 설정 관리 도구를 고려할 수 있습니다.
*   ⚠️ **세분화된 오류 처리**: 더 구체적인 사용자 정의 오류 클래스와 상세한 오류 코드를 도입할 수 있습니다.
*   🔄 **API 버전 관리 전략**: 외부 API의 변경사항을 우아하게 처리하기 위한 버전 관리 전략을 구현할 수 있습니다.