# Node.js용 MCP 서버 🚀

![Node.js](https://img.shields.io/badge/Node.js-18.x+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

판매 상품 스케줄 관리를 위한 모델 컨텍스트 프로토콜(MCP)을 구현하는 Node.js 서버입니다. 이 프로젝트는 초기에 "mcp_server_for_nodejs"로 시작되었으며, MCP 기반 상호작용을 위한 강력한 백엔드를 제공합니다.

## ✨ 주요 기능

- **MCP 도구 구현**: `getSaleProductSchedule`, `updateSaleProductSchedule`과 같은 핵심 MCP 기능을 지원합니다.
- **설정 가능한 서비스 계층**: 서비스의 쉬운 사용자 정의 및 확장을 허용합니다.
- **구조화된 로깅**: 모니터링 및 디버깅을 위한 상세하고 체계적인 로그를 제공합니다.

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
