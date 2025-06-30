# 📄 MCP Sale Product Server - Developer Manual

## Table of Contents
- [📄 MCP Sale Product Server - Developer Manual](#-mcp-sale-product-server---developer-manual)
  - [Table of Contents](#table-of-contents)
  - [1. 📖 Project Overview](#1--project-overview)
  - [2. 🧱 Project Structure](#2--project-structure)
    - [🔑 Key Components:](#-key-components)
  - [3. 🔧 MCP Tool Implementation](#3--mcp-tool-implementation)
    - [3.1. 🛠️ `getSaleProductSchedule` Tool (`src/tools/getSaleProductSchedule.js`)](#31-️-getsaleproductschedule-tool-srctoolsgetsaleproductschedulejs)
    - [3.2. 🛠️ `updateSaleProductSchedule` Tool (`src/tools/updateSaleProductSchedule.js`)](#32-️-updatesaleproductschedule-tool-srctoolsupdatesaleproductschedulejs)
    - [3.3. 🛠️ `getDetailCommonCodeByQuery` Tool (`src/tools/getDetailCommonCodeByQuery.js`)](#33-️-getdetailcommoncodebyquery-tool-srctoolsgetdetailcommoncodebyqueryjs)
    - [3.4. 🛠️ `getBasicCommonCodeByQuery` Tool](#34-️-getbasiccommoncodebyquery-tool)
    - [3.5. 🛠️ `retrieveSaleProductInformation` Tool](#35-️-retrievesaleproductinformation-tool)
    - [3.6. 🛠️ `getPackageProductInfo` Tool (`src/tools/getPackageProductInfo.js`)](#36-️-getpackageproductinfo-tool-srctoolsgetpackageproductinfojs)
    - [3.7. 🛠️ `getPackageProductOptionalTourInfomation` Tool (`src/tools/getPackageProductOptionalTourInfomation.js`)](#37-️-getpackageproductoptionaltourinfomation-tool-srctoolsgetpackageproductoptionaltourinfomationjs)
    - [3.8. 🛠️ `getPackageProductRulesAndTravelAlerts` Tool (`src/tools/getPackageProductRulesAndTravelAlerts.js`)](#38-️-getpackageproductrulesandtravelalerts-tool-srctoolsgetpackageproductrulesandtravelalertsjs)
    - [3.9. 🛠️ `retrieveAreaCode` Tool (`src/tools/retrieveAreaCode.js`)](#39-️-retrieveareacode-tool-srctoolsretrieveareacodejs)
    - [3.10. 🛠️ `retrievePackageProductClassificationCode` Tool (`src/tools/retrievePackageProductClassificationCodeTool.js`)](#310-️-retrievepackageproductclassificationcode-tool-srctoolsretrievepackageproductclassificationcodetooljs)
    - [3.11. 🛠️ `retrievePackageProductPromotionCode` Tool (`src/tools/retrievePackageProductPromotionCodeTool.js`)](#311-️-retrievepackageproductpromotioncode-tool-srctoolsretrievepackageproductpromotioncodetooljs)
    - [3.12. 🛠️ `retrievePackageProductThemeCode` Tool (`src/tools/retrievePackageProductThemeCodeTool.js`)](#312-️-retrievepackageproductthemecode-tool-srctoolsretrievepackageproductthemecodetooljs)
  - [4. ⚙️ Configuration Management](#4-️-configuration-management)
  - [5. 💪 SOLID Principles Application](#5--solid-principles-application)
  - [6. ✨ Adding a New MCP Tool](#6--adding-a-new-mcp-tool)
  - [7. 🚀 Running and Testing](#7--running-and-testing)
  - [8. 💡 Troubleshooting Common Issues](#8--troubleshooting-common-issues)
    - [8.1. Agent Initialization Error](#81-agent-initialization-error)
  - [9. 🌱 Future Enhancements](#9--future-enhancements)

This document provides a detailed overview of the **MCP Sale Product Server's** architecture, components, and development guidelines.

## 1. 📖 Project Overview

The **MCP Sale Product Server** is a **Node.js** application built using the **Model Context Protocol (MCP) SDK**. It exposes tools to manage sales product schedules. The server is designed with **SOLID principles** in mind to ensure maintainability and scalability.

The server is built using the **Model Context Protocol (MCP) SDK** (`@modelcontextprotocol/sdk`). This SDK is a core dependency of the project, managed via the `package.json` file and installed as part of the standard `npm install` process. It provides the necessary tools and interfaces for creating and managing MCP-compliant services and tools.

## 2. 🧱 Project Structure

The project follows a modular structure:

```text
mcp-server/
├── logs/              # Log files (gitignored)
├── node_modules/      # Project dependencies (managed by npm)
├── src/               # Source code
│   ├── config/        # Configuration files
│   │   └── serviceConfig.js # Service-specific configurations
│   ├── server.js      # Main server initialization and connection logic
│   ├── tools/         # MCP tool definitions
│   │   ├── getSaleProductSchedule.js
│   │   ├── updateSaleProductSchedule.js
│   │   └── index.js   # Exports all tools
│   ├── services/      # Business logic modules
│   │   └── packageService.js
│   ├── transports/    # Transport layer configurations
│   │   └── stdioTransport.js
│   ├── utils/         # Utility functions
│   │   └── logger.cjs    # Logging utility (Note: .cjs extension)
├── .gitignore         # Specifies intentionally untracked files that Git should ignore
├── DEVELOPER_MANUAL.md # This file
├── INSTALL.md         # Installation guide for users
├── package.json       # Project metadata and dependencies
└── package-lock.json  # Records exact versions of dependencies
```

### 🔑 Key Components:

*   📄 **`src/server.js`**:
    *   Initializes the **`McpServer`** instance from the **`@modelcontextprotocol/sdk`**.
    *   Imports tool definitions from **`src/tools/index.js`**.
    *   Registers each tool with the server.
    *   Creates and connects the transport layer (e.g., **`StdioServerTransport`**).
    *   Contains top-level error handling for server connection.

*   🛠️ **`src/tools/`**:
    *   Each file (e.g., **`getSaleProductSchedule.js`**) defines a specific **MCP tool**.
    *   A tool definition is an object with `name`, `description`, `inputSchema` (using **`zod`** for validation), and an `async handler` function.
    *   **Tool handlers** are responsible for:
        1.  Receiving input validated against `inputSchema`.
        2.  Calling appropriate service methods from **`src/services/`** to perform business logic.
        3.  Formatting the response for the MCP client.
        4.  Basic error handling (`try...catch`) to return structured error messages.
    *   **`src/tools/index.js`** aggregates all tool definitions and exports them as an array, which **`server.js`** consumes.

*   ⚙️ **`src/config/serviceConfig.js`**:
    *   This file centralizes configurations for services, primarily **`packageService.js`**.
    *   It exports objects like `apiUrls`, `codeMappings`, and `defaultApiParams`.
    *   `apiUrls` includes base URLs for external APIs. These can be overridden by environment variables (e.g., **`PKG_API_BASE_URL`**).
    *   `codeMappings` contains mappings used by business logic, like the `codeMapArray` for **`getDetailCommonCodeByQuery`**.
    *   `defaultApiParams` holds default parameters for API calls, like `commonCodeLang`.
    *   This approach allows for easier management of settings and environment-specific configurations without altering the service logic.

*   📦 **`src/services/`**:
    *   Contains modules responsible for business logic. For example, **`packageService.js`** handles business logic related to package schedules and common code retrieval. It now imports its API endpoints and other operational parameters from **`src/config/serviceConfig.js`**, making it more configurable. It includes functions like **`getSchedules()`**, **`updateSchedule()`**, and **`getDetailCommonCodeByQuery()`**.
    *   Services are designed to be independent of the MCP transport layer and can be reused.
    *   They perform data retrieval, updates, and any complex computations.

*   🚇 **`src/transports/`**:
    *   Modules for creating and configuring transport instances. **`stdioTransport.js`** provides a standard I/O transport. This separation allows for easier addition or modification of transport layers in the future.

*   🪵 **`src/utils/logger.cjs`**:
    *   Implements a configurable logging system using the **`winston`** library (*Note: `.cjs` extension*). It supports logging to both the console (with colors) and a rotating file (**`logs/app.log`**). Log entries include timestamps, log levels, and messages. Functions across services and tools utilize this logger.

## 3. 🔧 MCP Tool Implementation

### 3.1. 🛠️ `getSaleProductSchedule` Tool (`src/tools/getSaleProductSchedule.js`)

*   🎯 **Purpose**: Retrieves sales product schedules based on a `saleProdCd`. (*Original description: "판매상품 일정을 판매상품코드로 조회합니다."*)
*   📥 **Input Schema** (**`zod`**):
    ```javascript
    { saleProdCd: z.string().min(1) } // saleProdCd must be a non-empty string
    ```
*   🧠 **Handler Logic**:
    1.  Logs entry, parameters, results, and errors to both console and file using the central logger.
    2.  Receives `saleProdCd` as input.
    3.  Calls **`packageService.getSchedules(saleProdCd)`** to fetch schedule data.
    4.  Formats the data into the MCP content structure (type `text`).
    5.  Returns the formatted content or an error object if an exception occurs.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"saleProdCd\": \"ALLLSLSLSL\",\n  \"schedules\": [\n    { \"id\": \"schedule1\", \"time\": \"2024-07-30T10:00:00Z\", \"event\": \"Event A (from service)\" },\n    { \"id\": \"schedule2\", \"time\": \"2024-07-31T14:30:00Z\", \"event\": \"Event B (from service)\" }\n  ],\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.2. 🛠️ `updateSaleProductSchedule` Tool (`src/tools/updateSaleProductSchedule.js`)

*   🎯 **Purpose**: Updates a sales product schedule. (*Original description: "판매 상품 스케줄을 수정합니다."*)
*   📥 **Input Schema** (**`zod`**):
    ```javascript
    { name: z.string().min(1), saleProdCd: z.string().min(1) } // name and saleProdCd must be non-empty strings
    ```
*   🧠 **Handler Logic**:
    1.  Logs entry, parameters, results, and errors to both console and file using the central logger.
    2.  Receives `name` and `saleProdCd` as input.
    3.  Calls **`packageService.updateSchedule(saleProdCd, name)`** to perform the update.
    4.  Returns a JSON response indicating success or failure.
    5.  Includes an error object if an exception occurs.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"message\": \"Schedule for ALLLSLSLSL updated with name name_1. Service status: Updated via service\",\n  \"updatedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.3. 🛠️ `getDetailCommonCodeByQuery` Tool (`src/tools/getDetailCommonCodeByQuery.js`)

*   🎯 **Purpose**: Retrieves common codes (like attribute, region, country, continent, brand codes) based on a user query. (*Original description: "사용자 질의중 코드성 데이타에 적합한 속성,지역,국가,대륙,브랜드 코드를 조회합니다."*)
*   📥 **Input Schema** (**`zod`**):
    ```javascript
    { query: z.string().min(1) } // query must be a non-empty string
    ```
*   🧠 **Handler Logic**:
    1.  Logs entry, parameters, results, and errors to both console and file using the central logger.
    2.  Receives `query` as input.
    3.  Calls **`packageService.getDetailCommonCodeByQuery(query)`** to fetch common code data. The `packageService.getDetailCommonCodeByQuery(query)` method performs the following steps:
        1.  Constructs a URL using `apiUrls.commonOlsBase` (from `src/config/serviceConfig.js`) and the endpoint `/common/ols/codemgt/cbc/commoncodemgt/getComDtlCdList/v1.00`.
        2.  Makes a `POST` request to this URL. The request body includes:
            *   `comBscCd`: The input `query` string.
            *   `header`: An object containing `langCode` (from `defaultApiParams.commonCodeLang` in `src/config/serviceConfig.js`).
        3.  The response data from this API call is then returned, packaged with the original query.
    4.  Formats the data as a JSON string within the MCP content structure (type `text`).
    5.  Returns the formatted content or an error object if an exception occurs.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"code\": \"PROD_ATTR_CD\",\n  \"data\": { \"example\": [\"code1\", \"code2\"] }\n}"
      }]
    }
    ```

### 3.4. 🛠️ `getBasicCommonCodeByQuery` Tool

*   🎯 **Purpose**: Retrieves suitable basic common codes based on user queries. (*Original description: "사용자 질의에 따라 적합한 기본공통코드를 조회합니다."*)
*   📥 **Input Schema** (**`zod`**):
    ```javascript
    { query: z.string().min(1) } // query must be a non-empty string
    ```
*   🧠 **Handler Logic**:
    ```
    1. Logs the input `query`.
    2. Calls `packageService.getBasicCommonCodeByQuery(query)` to fetch basic common code data. The `packageService.getBasicCommonCodeByQuery(query)` method performs the following steps:
        1.  Constructs a URL using `apiUrls.commonOlsBase` (from `src/config/serviceConfig.js`) and the endpoint `/common/ols/codemgt/cbc/commoncodemgt/getComBscCdList/v1.00`. This endpoint is specifically for fetching basic common codes.
        2.  Makes a `POST` request to this URL. The request body includes:
            *   `comBscCd`: The input `query` string.
            *   `header`: An object containing `langCode` (from `defaultApiParams.commonCodeLang` in `src/config/serviceConfig.js`).
        3.  The response data from this API call (a list of basic common codes) is then returned, packaged with the original query.
    3. Formats the result as a JSON string within the MCP content structure (type `text`).
    4. Returns the formatted content or an error object if an exception occurs.
    ```
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"code\": \"BASIC_CODE_EXAMPLE\",\n  \"data\": { \"description\": \"Sample basic common code data\" }\n}"
      }]
    }
    ```

### 3.5. 🛠️ `retrieveSaleProductInformation` Tool (`src/tools/retrieveSaleProductInformation.js`)
*   🎯 **Purpose**:
    Retrieves information for one or more sales products.
    If you don't know the specific codes, please follow these steps to use the functions sequentially to find the appropriate product codes:

    1. Based on the user's query (e.g., "Southeast Asia region / Japan/Southeast Asia" → region information), call the `getBasicCommonCodeByQueryTool()` function. (This function is not limited to querying region information only.)
    2. From the list of results from `getBasicCommonCodeByQueryTool`, extract the code or value that best matches the user's query and call the `getDetailCommonCodeByQueryTool()` function.
    3. Using one or more codes from the `getDetailCommonCodeByQueryTool` results that best reflect the user's query, call the `retrieveSaleProductInformationTool()` function.
      - Use appropriate codes to ensure that one or more sales product information items are retrieved.

    Each function must be called sequentially, one at a time.
    Ensure you receive the result from the previous function before calling the next one.

    **Required Input Parameters:**
    - `startDate`: The start date for searching products (YYYYMMDD format).
    - `endDate`: The end date for searching products (YYYYMMDD format).

    **Optional Input Parameters:**
    - `saleProductCode`: The unique code for a specific sales product. Used when you want to look up a particular item.
    - `reservationCode`: The code associated with a specific reservation. Used to find products related to that reservation.
    - `productAttributeCode`: Code representing the attribute of the product. Select from predefined values: 'P' (Package), 'W' (Wedding), 'B' (Activity). Uses `getDetailCommonCodeByQuery` to find the matching code based on user query if needed.
    - `productAreaCode`: Code for the product's geographical area. Select from predefined values: 'AA' (Bangkok), 'C1' (China), 'HH' (Americas), 'J0' (Japan). User queries (e.g., 'Europe', 'Asia', 'France') should be resolved to these codes using `getDetailCommonCodeByQuery`.
    - `saleProductName`: Keywords from the user's query that refer to the product name.

    **Pagination Parameters (optional for retrieval):**
    - `pageSize`: The maximum number of products to display on a single page.
    - `pageNumber`: The page number of the results you want to view.
    - `totalRowCount`: The total count of products matching the search criteria.
    - `totalPageCount`: The total number of pages, calculated based on `pageSize` and `totalRowCount`.

*   📥 **Input Schema** (**`zod`**):
    The input schema defines a set of parameters for querying sales product information. The authoritative descriptions for these parameters are maintained in Korean within the source code (`src/tools/retrieveSaleProductInformation.js`) and are detailed in the table below. Key parameters include `saleProductCode`, `reservationCode`, `startDate` (required), `endDate` (required), `productAttributeCode` (enum), `productAreaCode` (enum), `saleProductName`, and pagination parameters.

    Refer to the `📊 Input Parameter Structure` table below for a detailed breakdown with Korean descriptions.

*   📊 **Input Parameter Structure**

    | Parameter               | Type   | Required? | Allowed Values                                     | Description                                                                                                                                |
    | :---------------------- | :----- | :-------- | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
    | 👑 `saleProductCode`    | string | Optional  | N/A                                                | 특정 판매 상품을 조회할 때 사용하는 고유 코드입니다.                                                                                                     |
    | 🔖 `reservationCode`    | string | Optional  | N/A                                                | 특정 예약과 관련된 상품을 조회할 때 사용하는 코드입니다.                                                                                                   |
    | 📅 `startDate`          | number | **Required** | N/A                                                | 상품 검색을 위한 시작 날짜 (YYYYMMDD 형식) 입니다. 필수 항목입니다.                                                                                           |
    | 📅 `endDate`            | number | **Required** | N/A                                                | 상품 검색을 위한 종료 날짜 (YYYYMMDD 형식) 입니다. 필수 항목입니다.                                                                                           |
    | ✨ `productAttributeCode` | enum   | Optional  | `P (패키지), W (웨딩), B (액티비티)`                 | 상품 속성 코드입니다. 허용 값: 'P' (패키지), 'W' (웨딩), 'B' (액티비티). 이 코드 중 하나를 제공해야 합니다.                                                                 |
    | 🌍 `productAreaCode`     | enum   | Optional  | `AA (방콕, 동남아), C1 (중국), HH (미주), J0 (일본)`   | 상품 지역 코드입니다. 허용 값: 'AA' (방콕, 동남아), 'C1' (중국), 'HH' (미주), 'J0' (일본). 이 코드 중 하나를 제공해야 합니다.                                                       |
    | 🏷️ `saleProductName`     | string | Optional  | N/A                                                | 사용자 질의에서 상품명을 의미하는 텍스트 키워드입니다.                                                                                                       |
    | 📄 `pageSize`           | number | Optional  | N/A                                                | 한 페이지에 표시할 상품의 최대 개수를 지정합니다.                                                                                                        |
    | 🔢 `pageNumber`         | number | Optional  | N/A                    | 조회할 결과의 페이지 번호를 지정합니다.                                                                                                              |
    | 🧮 `totalRowCount`      | number | Optional  | N/A                    | 검색 조건에 해당하는 전체 상품의 개수입니다.                                                                                                            |
    | 📖 `totalPageCount`     | number | Optional  | N/A                    | 전체 상품을 `pageSize`에 따라 나눈 총 페이지 수입니다.                                                                                                     |

*   🧠 **Handler Logic**:
    1.  Logs entry, received input arguments, results, and errors using the central logger.
    2.  Receives an `inputArguments` object containing parameters like `saleProductCode`, `reservationCode`, `startDate`, `endDate`, `productAttributeCode`, `productAreaCode`, `saleProductName`, and pagination details.
    3.  Calls `packageService.retrieveSaleProductInformation(params)` with all received parameters to fetch product data.
    4.  The service response (`saleProductList`) is then cleaned of HTML tags.
    5.  The handler constructs a `responseData` object that includes all the input parameters along with the `saleProductList` and a `retrievedAt` timestamp.
    6.  Formats this `responseData` into the MCP content structure (type `text`, JSON stringified).
    7.  Returns the formatted content or an error object if an exception occurs.

*   ✅ **Output (Success Example)**:
    This example shows a successful retrieval. The output includes the input parameters that were used for the search, along with the list of products found.
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"saleProductCode\": \"PROD789\",\n  \"reservationCode\": null,\n  \"startDate\": 20240101,\n  \"endDate\": 20241231,\n  \"productAttributeCode\": \"P\",\n  \"productAreaCode\": \"AA\",\n  \"saleProductName\": \"Bangkok Package\",\n  \"pageSize\": 10,\n  \"pageNumber\": 1,\n  \"totalRowCount\": null,\n  \"totalPageCount\": null,\n  \"saleProductList\": [\n    {\n      \"productName\": \"Amazing Bangkok Tour\",\n      \"details\": \"Explore the vibrant city of Bangkok with our exclusive package.\"\n    }\n  ],\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.6. 🛠️ `getPackageProductInfo` Tool (`src/tools/getPackageProductInfo.js`)

*   🎯 **Purpose**: Retrieves package product information using the `saleProductCode`. (Original description: "판매상품코드(saleProductCode)를 사용하여 패키지 상품 정보를 조회합니다.")
*   📥 **Input Schema** (`zod`):
    ```javascript
    {
      saleProductCode: z.string().min(1, { message: "saleProductCode is required." })
    }
    ```
*   🧠 **Handler Logic**:
    1.  Logs the execution entry and `saleProductCode`.
    2.  Calls `packageService.getPackageProductInfo({ saleProductCode })`.
    3.  The result from the service is cleaned of any HTML tags using `cleanObject` (which internally uses `stripHtml`).
    4.  Formats the cleaned result into a standard JSON response for MCP using `createJsonResponse`.
    5.  Logs successful completion or errors.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"data\": { /* cleaned package product information */ },\n  \"message\": \"Function getPackageProductInfoTool.handler executed successfully at YYYY-MM-DDTHH:mm:ss.sssZ with params: {\\\"saleProductCode\\\":\\\"YOUR_CODE\\\"}\",\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.7. 🛠️ `getPackageProductOptionalTourInfomation` Tool (`src/tools/getPackageProductOptionalTourInfomation.js`)

*   🎯 **Purpose**: Retrieves optional tour information for a package product using `saleProductCode`. (Original description: "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 선택 관광 정보를 조회합니다.")
    *Note: The filename contains a typo "Infomation" instead of "Information".*
*   📥 **Input Schema** (`zod`):
    ```javascript
    {
      saleProductCode: z.string().min(1, { message: "saleProductCode is required." })
    }
    ```
*   🧠 **Handler Logic**:
    1.  Logs the execution entry and `saleProductCode`.
    2.  Calls `packageService.getPackageProductOptionalTourInfomation({ saleProductCode })`.
    3.  The result is cleaned of HTML tags via `cleanObject`.
    4.  Formats the response using `createJsonResponse`.
    5.  Logs success or errors.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"data\": { /* cleaned optional tour information */ },\n  \"message\": \"Function getPackageProductOptionalTourInfomationTool.handler executed successfully at YYYY-MM-DDTHH:mm:ss.sssZ with params: {\\\"saleProductCode\\\":\\\"YOUR_CODE\\\"}\",\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.8. 🛠️ `getPackageProductRulesAndTravelAlerts` Tool (`src/tools/getPackageProductRulesAndTravelAlerts.js`)

*   🎯 **Purpose**: Retrieves terms, conditions, precautions, and travel alerts for a package product using `saleProductCode`. (Original description: "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 약관 및 유의사항, 여행경보 등을 조회합니다.")
*   📥 **Input Schema** (`zod`):
    ```javascript
    {
      saleProductCode: z.string().min(1, { message: "saleProductCode is required." })
    }
    ```
*   🧠 **Handler Logic**:
    1.  Logs execution entry and `saleProductCode`.
    2.  Calls `packageService.getPackageProductRulesAndTravelAlerts({ saleProductCode })`.
    3.  Cleans the result of HTML tags using `cleanObject`.
    4.  Formats the response with `createJsonResponse`.
    5.  Logs success or errors.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"data\": { /* cleaned rules and travel alerts */ },\n  \"message\": \"Function getPackageProductRulesAndTravelAlertsTool.handler executed successfully at YYYY-MM-DDTHH:mm:ss.sssZ with params: {\\\"saleProductCode\\\":\\\"YOUR_CODE\\\"}\",\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.9. 🛠️ `retrieveAreaCode` Tool (`src/tools/retrieveAreaCode.js`)

*   🎯 **Purpose**: Retrieves information about regions, countries, and continents. For example, if a user query is "Find Southeast Asia region", this tool can be used to get the relevant codes. (Original description: "지역, 국가, 대륙에 대한 정보를 조회합니다. 예시: \"동남아 지역 찾아줘\" → 이 함수를 실행하여 결과를 확인한 뒤 동남아에 해당하는 코드를 선택하세요.")
*   📥 **Input Schema** (`zod`):
    ```javascript
    z.object({}) // No parameters
    ```
*   🧠 **Handler Logic**:
    1.  Calls `packageService.retrieveAreaCode()`.
    2.  The returned `areaCodeList` is cleaned of HTML tags by `cleanObject`.
    3.  Formats the response as a JSON string including the `areaCodeList` and a `retrievedAt` timestamp.
    4.  Logs errors if any occur.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"areaCodeList\": [ /* array of area code objects */ ],\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.10. 🛠️ `retrievePackageProductClassificationCode` Tool (`src/tools/retrievePackageProductClassificationCodeTool.js`)

*   🎯 **Purpose**: Retrieves a list of product classification codes ('01') from OLS. (Original description: "OLS에서 상품 구분 코드('01') 리스트를 조회합니다. (상품구분 : 01 프로모션 : 02 테마 : 03)")
*   📥 **Input Schema** (`zod`):
    ```javascript
    z.object({}) // No input parameters
    ```
*   🧠 **Handler Logic**:
    1.  Logs execution entry.
    2.  Calls `packageService.retrievePackageProductClassificationCode()`.
    3.  Formats the result as a JSON string for the MCP content.
    4.  Logs success or errors.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* array of classification code objects or strings */ ]"
      }]
    }
    ```

### 3.11. 🛠️ `retrievePackageProductPromotionCode` Tool (`src/tools/retrievePackageProductPromotionCodeTool.js`)

*   🎯 **Purpose**: Retrieves a list of promotion codes ('02') from OLS. (Original description: "OLS에서 프로모션 코드('02') 리스트를 조회합니다. (상품구분 : 01 프로모션 : 02 테마 : 03)")
*   📥 **Input Schema** (`zod`):
    ```javascript
    z.object({}) // No input parameters
    ```
*   🧠 **Handler Logic**:
    1.  Logs execution entry.
    2.  Calls `packageService.retrievePackageProductPromotionCode()`.
    3.  Formats the result as a JSON string.
    4.  Logs success or errors.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* array of promotion code objects or strings */ ]"
      }]
    }
    ```

### 3.12. 🛠️ `retrievePackageProductThemeCode` Tool (`src/tools/retrievePackageProductThemeCodeTool.js`)

*   🎯 **Purpose**: Retrieves a list of theme codes ('03') from OLS. (Original description: "OLS에서 테마 코드('03') 리스트를 조회합니다. (상품구분 : 01 프로모션 : 02 테마 : 03)")
*   📥 **Input Schema** (`zod`):
    ```javascript
    z.object({}) // No input parameters
    ```
*   🧠 **Handler Logic**:
    1.  Logs execution entry.
    2.  Calls `packageService.retrievePackageProductThemeCode()`.
    3.  Formats the result as a JSON string.
    4.  Logs success or errors.
*   ✅ **Output (Success Example Structure)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* array of theme code objects or strings */ ]"
      }]
    }
    ```

## 4. ⚙️ Configuration Management

The application's configurations, especially for service integrations, are managed centrally.

*   **Key configuration files**:
    *   📄 **`src/config/serviceConfig.js`**: Details specific configurations for **`packageService.js`** such as API base URLs (which can be overridden by environment variables like **`PKG_API_BASE_URL`**, **`OLS_BASE_URL`**, **`COMMON_OLS_BASE_URL`**), keyword-to-code mappings (`codeMappings.codeMapArray`), and default API parameters (`defaultApiParams`). Modifying this file or setting the respective environment variables allows for changes in how services connect to external systems or apply certain business rules.
*   Environment variables can be used to override certain settings, particularly API URLs, for different deployment environments (development, staging, production).

## 5. 💪 SOLID Principles Application

The server aims to adhere to **SOLID principles**:

*   🎯 **Single Responsibility Principle (SRP)**:
    *   **`server.js`**: Manages server lifecycle and tool registration.
    *   Tool files (**`src/tools/*.js`**): Define MCP interface, input validation, and delegate to services.
    *   Service files (**`src/services/*.js`**): Encapsulate specific business logic.
    *   Transport files (**`src/transports/*.js`**): Manage transport configuration.
    *   **`src/utils/logger.cjs`**: Manages the cross-cutting concern of logging (*Note: `.cjs` extension*).
    *   **`src/config/serviceConfig.js`**: Centralizes service configurations, promoting separation of concerns.

*   🧩 **Open/Closed Principle (OCP)**:
    *   New tools can be added to **`src/tools/`** and registered in **`src/tools/index.js`** without modifying existing tool files or **`server.js`** core logic.
    *   New services can be added similarly.

*   🤝 **Liskov Substitution Principle (LSP)**:
    *   While not heavily demonstrated with inheritance yet, service interfaces (implicit in JavaScript) are intended to be substitutable if different implementations were needed (e.g., mock service vs. real database service).

*   🔗 **Interface Segregation Principle (ISP)**:
    *   The MCP tool definitions themselves act as specific interfaces for clients. Clients only need to know about the tools they use.

*   🔌 **Dependency Inversion Principle (DIP)**:
    *   Tool handlers depend on abstractions (the **`packageService`** interface) rather than concrete implementations directly. While JavaScript doesn't have explicit interfaces like TypeScript or Java, the service modules are loosely coupled.
    *   **`server.js`** depends on the **`createStdioTransport`** abstraction rather than directly instantiating **`StdioServerTransport`** from the SDK.

## 6. ✨ Adding a New MCP Tool

1️⃣ **Define the Tool Logic (Service - *Optional but Recommended*)**:
    *   If the tool involves new business logic, first add relevant functions to an existing service in **`src/services/`** or create a new service file (e.g., **`src/services/newFeatureService.js`**).
    *   Write unit tests for your service logic.

2️⃣ **Create the Tool Definition File**:
    *   Create a new JavaScript file in **`src/tools/`** (e.g., **`src/tools/myNewTool.js`**).
    *   Import **`z`** from **`zod`** for schema validation.
    *   Import any necessary services.
    *   Define and export the tool object:
        ```javascript
        import { z } from "zod";
        // import { myService } from "../services/myService.js"; // If needed

        export const myNewTool = {
          name: "myNewToolName", // Unique tool name
          description: "A brief description of what the tool does.",
          inputSchema: { // Define input parameters and their types/validation
            param1: z.string(),
            param2: z.number().optional(),
          },
          async handler({ param1, param2 }) { // Destructure validated inputs
            // import logger from '../utils/logger.cjs'; // (adjust path, e.g. ../../utils/logger.cjs for tools in subdirs)
            // logger.info(`Executing myNewToolName with ${JSON.stringify({ param1, param2 })}`);
            try {
              // Your tool logic here
              // Example: const result = await myService.process(param1, param2);
              console.log(`Executing myNewTool with param1: ${param1}, param2: ${param2}`);
              // const result = { message: `Result for ${param1}` };
              // logger.info(`myNewToolName completed successfully with result: ${JSON.stringify(result)}`);
              return {
                content: [{ type: "text", text: `Result for ${param1}` }],
              };
            } catch (error) {
              console.error(`Error in myNewTool: ${error.message}`, error);
              // logger.error(`Error in myNewToolName: ${error.message}`, { error: error.stack });
              throw error; // Or return structured error
            }
          },
        };
        ```
    *   **Integrate logging**: Import and use the logger from **`src/utils/logger.cjs`** within the `handler` to log entry, parameters, results, and errors.

3️⃣ **Register the Tool**:
    *   Open **`src/tools/index.js`**.
    *   Import your new tool.
    *   Add it to the `tools` array:
        ```javascript
        import { getSaleProductScheduleTool } from "./getSaleProductSchedule.js";
        import { updateSaleProductScheduleTool } from "./updateSaleProductSchedule.js";
        import { myNewTool } from "./myNewTool.js"; // Import new tool

        export const tools = [
          getSaleProductScheduleTool,
          updateSaleProductScheduleTool,
          myNewTool, // Add to array
        ];
        ```
    > **Note**: Remember to restart the server after adding a new tool for changes to take effect.

## 7. 🚀 Running and Testing

Refer to **`INSTALL.MD`** for instructions on running the server.

For testing tools manually (if using **`StdioTransport`** and a compatible MCP client):
1. Run the server (`node src/server.js`).
2. Send MCP requests in JSON format via `stdin`, for example:
   To call **`getSaleProductSchedule`**:
   ```json
   {
     "tool": "getSaleProductSchedule",
     "inputs": { "saleProdCd": "TEST001" }
   }
   ```
   To call **`updateSaleProductSchedule`**:
   ```json
   {
     "tool": "updateSaleProductSchedule",
     "inputs": { "name": "New Test Name", "saleProdCd": "TEST002" }
   }
   ```
   Observe the JSON output on `stdout`.

## 8. 💡 Troubleshooting Common Issues

### 8.1. Agent Initialization Error

If you encounter an error message similar to:
`Error: Agent could not be initialized. Please check LLM configuration and API keys.`

This typically indicates a problem with the setup of the Language Model (LLM) agent, which is external to this MCP server's codebase but relevant if you are integrating this server with such an agent.

**Common Causes and Solutions:**

1.  **Missing or Incorrect API Keys:**
    *   **Check:** Ensure that the API key for your LLM service (e.g., OpenAI, Gemini, Anthropic) is correctly set.
    *   **Solution:** Verify the key is valid, has not expired, and has the necessary permissions for the operations you are trying to perform.

2.  **Environment Variables Not Set or Loaded:**
    *   **Check:** API keys and other sensitive LLM configurations are often managed via environment variables (e.g., `OPENAI_API_KEY`, `GEMINI_API_KEY`). Confirm these variables are set in the environment where your agent or application is running.
    *   **Solution:**
        *   Set the environment variables directly in your shell:
            ```bash
            export YOUR_LLM_API_KEY="your_actual_api_key_here"
            ```
        *   If using a `.env` file, ensure it's correctly formatted (e.g., `YOUR_LLM_API_KEY=your_actual_api_key_here`) and that your application is configured to load it (e.g., using a library like `dotenv` in Node.js).
        *   Verify the variable names match what the LLM SDK or your agent's code expects.

3.  **LLM Service Configuration Issues:**
    *   **Check:** Review the configuration code for your LLM agent. There might be incorrect model names, endpoint URLs, or other parameters.
    *   **Solution:** Refer to the documentation of the specific LLM SDK or library you are using to ensure all configuration parameters are correct.

4.  **Network Connectivity or Service Outage:**
    *   **Check:** Ensure your server or development environment has internet access and can reach the LLM provider's API endpoints.
    *   **Solution:** Check the LLM provider's status page for any ongoing outages or maintenance. Test basic network connectivity (e.g., with `ping` or `curl` to the API domain).

5.  **SDK/Library Version Issues:**
    *   **Check:** An outdated or incompatible version of the LLM SDK or related libraries might cause initialization failures.
    *   **Solution:** Ensure you are using a compatible version of the SDK, and update it if necessary, checking for any breaking changes in the release notes.

If these steps do not resolve the issue, consult the specific documentation for the LLM agent or SDK you are using, and check for detailed error logs that might provide more context.

## 9. 🌱 Future Enhancements

*   💾 **Database Integration**: Replace mock services in **`src/services/`** with actual database interactions.
*   🧪 **Unit and Integration Tests**: Implement a comprehensive test suite.
*   📊 **Enhanced Logging**: While a robust logging system is now in place (**`Winston`**, file/console output), future enhancements could include structured logging for easier parsing by log management systems, or dynamic log level changes via configuration/API.
*   🛠️ **Refined Configuration Management**: While **`serviceConfig.js`** centralizes some configurations, further externalization (e.g., to `.env` files fully managed outside the codebase, or dedicated configuration services) could be explored for more complex applications, especially for sensitive data or more varied deployment environments.
*   ⚠️ **More Sophisticated Error Handling**: Custom error classes, more granular error codes.
*   🔧 **Correct Typo**: Rename `getPackageProductOptionalTourInfomation.js` and its references to `getPackageProductOptionalTourInformation.js`.
