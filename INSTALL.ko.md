# MCP 판매 상품 서버 - 설치 매뉴얼

이 문서는 MCP 판매 상품 서버를 설치하고 실행하는 방법에 대한 지침을 제공합니다.

## 사전 요구 사항

*   **Node.js:** 버전 18.x 이상을 권장합니다. [https://nodejs.org/](https://nodejs.org/)에서 다운로드할 수 있습니다.
*   **npm:** Node Package Manager, 일반적으로 Node.js와 함께 제공됩니다.

## 설치 단계

1.  **리포지토리 복제:**
    프로젝트가 Git 리포지토리에 있는 경우, 로컬 시스템으로 복제합니다:
    ```bash
    git clone <리포지토리-URL>
    cd <리포지토리-디렉토리>
    ```
    소스 코드를 직접 가지고 있다면, 프로젝트의 루트 디렉토리로 이동합니다.

2.  **의존성 설치:**
    프로젝트 루트 디렉토리에서 터미널을 열고 다음 명령을 실행하여 필요한 Node.js 패키지를 설치합니다:
    ```bash
    npm install
    ```
    이 명령은 `package.json` 파일을 읽고 `node_modules` 디렉토리에 모든 필수 의존성을 다운로드합니다.

## 서버 실행

1.  **서버 시작:**
    의존성이 설치되면, 터미널(프로젝트 루트 디렉토리에서)에서 다음 명령을 사용하여 MCP 서버를 시작할 수 있습니다:
    ```bash
    node src/server.js
    ```

2.  **서버 출력:**
    서버가 성공적으로 시작되면 다음과 유사한 메시지가 표시됩니다:
    ```
    MCP Server connected via StdioTransport.
    ```
    이 메시지는 서버가 현재 실행 중이며 표준 입출력을 통해 MCP 요청을 처리할 준비가 되었음을 나타냅니다.

## 환경 설정 (선택 사항)

서버는 환경 변수를 사용하여 여러 외부 API의 기본 URL을 설정할 수 있습니다. 이는 다양한 배포 환경(개발, QA, 운영)에 맞게 서버 설정을 조정하는 데 유용합니다. 주요 설정은 `src/config/serviceConfig.js` 파일에 정의되어 있으며, 다음 환경 변수들을 통해 재정의할 수 있습니다:

*   `PKG_API_BASE_URL`: 패키지 관련 특정 API(예: 일정표, 선택 관광 조회 등)의 기본 URL을 설정합니다. (기본값: `http://pkgapiqa.hanatour.com:8082`)
*   `PKG_OLS_BASE_URL`: OLS(운영 연동 시스템) QA 환경 API(예: 판매 상품 정보, 지역 코드 조회 등)의 기본 URL을 설정합니다. (기본값: `http://pkgolsqa.hanatour.com:8081`)
*   `OLS_BASE_URL`: OLS 개발 환경 API(예: 상품 구분/프로모션/테마 코드 조회 등)의 기본 URL을 설정합니다. (기본값: `http://pkgolsdev.hanatour.com:8081`)
*   `COMMON_OLS_BASE_URL`: 공통 OLS API(예: 기본/상세 공통 코드 조회 등)의 기본 URL을 설정합니다. (기본값: `http://comolsdev.hanatour.com:8081`)

서버 실행 전 환경 변수 설정 예시 (Linux/macOS):
```bash
export PKG_API_BASE_URL=https://custom.packageapi.example.com
export PKG_OLS_BASE_URL=https://custom.olsqa.example.com
node src/server.js
```

Windows의 경우 (cmd):
```bash
set PKG_API_BASE_URL=https://custom.packageapi.example.com
set PKG_OLS_BASE_URL=https://custom.olsqa.example.com
node src/server.js
```

Windows의 경우 (PowerShell):
```powershell
$env:PKG_API_BASE_URL="https://custom.packageapi.example.com"
$env:PKG_OLS_BASE_URL="https://custom.olsqa.example.com"
node src/server.js
```
모든 설정 가능한 환경 변수와 그 기본값에 대한 자세한 내용은 `src/config/serviceConfig.js` 파일을 참조하십시오.

## 서버 중지

서버를 중지하려면, 일반적으로 서버가 실행 중인 터미널에서 `Ctrl+C`를 누르면 됩니다.
