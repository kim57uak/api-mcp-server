# Node.js용 MCP 서버 🚀

![Node.js](https://img.shields.io/badge/Node.js-18.x+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

판매 스케줄, 패키지 상세 정보, 공통 코드 등 여행 상품 정보를 관리하기 위한 모델 컨텍스트 프로토콜(MCP)을 구현하는 Node.js 서버입니다. 이 프로젝트는 초기에 "mcp_server_for_nodejs"로 시작되었으며, 하나투어 상품 제공과 관련된 MCP 기반 상호작용을 위한 강력한 백엔드를 제공합니다.

## ✨ 주요 기능

- **포괄적인 MCP 도구 세트**: 다음과 같은 광범위한 MCP 기능을 지원합니다:
    - **여행 상품 스케줄 관리**: 판매 상품 코드(`saleProdCd`)를 사용하여 여행 스케줄(일정표) 조회 (`getSaleProductSchedule`). (참고: 스케줄 업데이트 기능(`updateSaleProductSchedule`)은 현재 참고용으로만 제공될 수 있습니다.)
    - **상품 정보 조회**:
        - 여러 기준(날짜, 지역 코드, 상품명, 상품 속성 코드 등)에 따른 판매 상품 목록 검색 (`retrieveSaleProductInformation`).
        - 판매 상품 코드(`saleProductCode`) 기준 개별 패키지 상품의 상세 정보 조회 (`getPackageProductInfo`).
        - 패키지 상품의 선택 관광 정보 조회 (`getPackageProductOptionalTourInformation`).
        - 패키지 상품의 약관, 유의사항, 여행 경보 등 중요 정보 조회 (`getPackageProductRulesAndTravelAlerts`).
    - **공통 코드 조회**:
        - 사용자 질의 기반 기본 공통 코드 조회 (`getBasicCommonCodeByQuery`).
        - 사용자 질의 또는 기본 코드 기반 상세 공통 코드 조회 (`getDetailCommonCodeByQuery`).
        - 지역, 국가, 대륙 코드 목록 조회 (`retrieveAreaCode`).
        - 패키지 상품의 분류(`01`), 프로모션(`02`), 테마(`03`) 코드 목록 조회 (`retrievePackageProductClassificationCode`, `retrievePackageProductPromotionCode`, `retrievePackageProductThemeCode`).
    - **판매 상품 코드 및 출발일 기준 상세 정보 조회 (API Group 3.1)**:
        - 상품 기본 정보 (`retrieveProductBasicInformationBySaleProductCode`)
        - 상품 항공 인벤토리 정보 (`retrieveProductAirInventoryInformationBySaleProductCode`)
        - 상품 요금 정보 (`retrieveProductFareInformationBySaleProductCode`)
        - 상품 상세 페이지의 기본 탭 정보 (`retrieveProductTabBasicInformationBySaleProductCode`)
        - 항공사 및 항공편 정보 (`retrieveAirLineInformationBySaleProductCode`)
        - 호텔 및 현지 일정 정보 (`retrieveHotelScheduleInformationBySaleProductCode`)
        - 샌딩 약관 정보 (`retrieveSendingTermAndConditionsBySaleProductCode`)
        - 선택 관광 정보 (`retrieveOptionalTourBySaleProductCode`)
        - 경비 정보 (`retrieveExpenseInformationBySaleProductCode`)
        - 전체 여정 정보 (`retrieveItineraryInformationBySaleProductCode`)
        - 비고 정보 (`retrieveRemarksInformationBySaleProductCode`)
    - **추가 상품 정보 조회**:
        - 상품 브랜드 코드 조회 (`retrieveBrandCodeBySaleProductCode` - API Group 3.2).
        - 동일 항공편 사용 판매 상품 목록 조회 (`retrieveSameAirInformationBySaleProductCode` - API Group 3.3).
- **설정 가능한 서비스 계층**: API 엔드포인트 및 매개변수 관리를 위해 `serviceConfig.js`를 활용하여 쉬운 사용자 정의 및 확장을 허용합니다.
- **구조화된 로깅**: Winston을 활용하여 모니터링 및 디버깅을 위한 상세하고 체계적인 로그를 제공합니다.
- **SOLID 설계 원칙**: 유지보수성과 확장성에 중점을 두고 개발되었습니다.

## ⚙️ 모델 컨텍스트 프로토콜(MCP)에 대하여

**모델 컨텍스트 프로토콜(MCP)** SDK (`@modelcontextprotocol/sdk`)는 이 서버의 핵심 구성 요소입니다. 이 서버가 노출하는 도구를 정의하고 관리하기 위한 프레임워크와 유틸리티를 제공합니다.

MCP SDK를 별도로 설치할 필요는 없습니다. **`package.json`** 파일에 프로젝트 종속성으로 나열되어 있으며, 다음 명령을 실행하면 자동으로 설치됩니다:

```bash
npm install
```

## 🚀 시작하기

서버 설정 및 실행을 시작하려면 **[설치 안내서](INSTALL.ko.md)**를 참조하십시오.

## 📄 개발자 문서

개발, 기여 가이드라인 및 프로젝트 아키텍처에 대한 자세한 정보는 **[개발자 매뉴얼](DEVELOPER_MANUAL.ko.md)**을 참조하십시오.
