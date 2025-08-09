# 📄 MCP Sale Product Server - Developer Manual

## Table of Contents
- [📄 MCP Sale Product Server - Developer Manual](#-mcp-sale-product-server---developer-manual)
  - [Table of Contents](#table-of-contents)
  - [1. 📖 Project Overview](#1--project-overview)
  - [2. 🧱 Project Structure](#2--project-structure)
    - [🔑 Key Components](#-key-components)
  - [3. 🔧 MCP Tool Implementation](#3--mcp-tool-implementation)
    - [3.1. 🛠️ `getSaleProductSchedule` Tool](#31-️-getsaleproductschedule-tool)
    - [3.2. 🛠️ `getDetailCommonCodeByQuery` Tool](#32-️-getdetailcommoncodebyquery-tool)
    - [3.3. 🛠️ `getBasicCommonCodeByQuery` Tool](#33-️-getbasiccommoncodebyquery-tool)
    - [3.4. 🛠️ `retrieveSaleProductInformation` Tool](#34-️-retrievesaleproductinformation-tool)
    - [3.5. 🛠️ `retrieveAreaCode` Tool](#35-️-retrieveareacode-tool)
    - [3.6. 🛠️ `getPackageProductInfo` Tool](#36-️-getpackageproductinfo-tool)
    - [3.7. 🛠️ `getPackageProductOptionalTourInformation` Tool](#37-️-getpackageproductoptionaltourinformation-tool)
    - [3.8. 🛠️ `getPackageProductRulesAndTravelAlerts` Tool](#38-️-getpackageproductrulesandtravelalerts-tool)
    - [3.9. 🛠️ `retrievePackageProductClassificationCode` Tool](#39-️-retrievepackageproductclassificationcode-tool)
    - [3.10. 🛠️ `retrievePackageProductPromotionCode` Tool](#310-️-retrievepackageproductpromotioncode-tool)
    - [3.11. 🛠️ `retrievePackageProductThemeCode` Tool](#311-️-retrievepackageproductthemecode-tool)
    - [3.12. 🛠️ `retrieveProductBasicInformationBySaleProductCode` Tool](#312-️-retrieveproductbasicinformationbysaleproductcode-tool)
    - [3.13. 🛠️ `retrieveProductAirInventoryInformationBySaleProductCode` Tool](#313-️-retrieveproductairinventoryinformationbysaleproductcode-tool)
    - [3.14. 🛠️ `retrieveProductFareInformationBySaleProductCode` Tool](#314-️-retrieveproductfareinformationbysaleproductcode-tool)
    - [3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` Tool](#315-️-retrieveproducttabbasicinformationbysaleproductcode-tool)
    - [3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` Tool](#316-️-retrieveairlineinformationbysaleproductcode-tool)
    - [3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` Tool](#317-️-retrievehotelscheduleinformationbysaleproductcode-tool)
    - [3.18. 🛠️ `retrieveSendingTermAndConditionsBySaleProductCode` Tool](#318-️-retrievesendingtermandconditionsbysaleproductcode-tool)
    - [3.19. 🛠️ `retrieveOptionalTourBySaleProductCode` Tool](#319-️-retrieveoptionaltourbysaleproductcode-tool)
    - [3.20. 🛠️ `retrieveExpenseInformationBySaleProductCode` Tool](#320-️-retrieveexpenseinformationbysaleproductcode-tool)
    - [3.21. 🛠️ `retrieveItineraryInformationBySaleProductCode` Tool](#321-️-retrieveitineraryinformationbysaleproductcode-tool)
    - [3.22. 🛠️ `retrieveRemarksInformationBySaleProductCode` Tool](#322-️-retrieveremarksinformationbysaleproductcode-tool)
    - [3.23. 🛠️ `retrieveBrandCodeBySaleProductCode` Tool](#323-️-retrievebrandcodebysaleproductcode-tool)
    - [3.24. 🛠️ `retrieveSameAirInformationBySaleProductCode` Tool](#324-️-retrievesameairinformationbysaleproductcode-tool)
    - [3.25. 🛠️ `updateSaleProductSchedule` Tool (For Reference)](#325-️-updatesaleproductschedule-tool-for-reference)
  - [4. ⚙️ Configuration Management](#4-️-configuration-management)
  - [5. 💪 SOLID Principles Application](#5--solid-principles-application)
  - [6. 🔧 Response Optimization with includeFields](#6--response-optimization-with-includefields)
    - [6.1. 🎯 Purpose and Benefits](#61--purpose-and-benefits)
    - [6.2. 🛠️ Implementation Guide](#62-️-implementation-guide)
    - [6.3. 📝 Example Implementation](#63--example-implementation)
    - [6.4. 🔍 Best Practices](#64--best-practices)
  - [7. ✨ Adding a New MCP Tool](#7--adding-a-new-mcp-tool)
  - [8. 🚀 Running and Testing](#8--running-and-testing)
  - [9. 💡 Troubleshooting Common Issues](#9--troubleshooting-common-issues)
    - [9.1. Agent Initialization Error](#91-agent-initialization-error)
  - [10. 🌱 Future Enhancements](#10--future-enhancements)

This document provides a detailed overview of the **MCP Sale Product Server's** architecture, components, and development guidelines.

## 1. 📖 Project Overview

The **MCP Sale Product Server** is a **Node.js** application built using the **Model Context Protocol (MCP) SDK**. It exposes a variety of tools to manage and retrieve travel product information, including sales schedules, package details, common codes, and more. The server is designed with **SOLID principles** in mind to ensure maintainability and scalability.

The server is built using the **Model Context Protocol (MCP) SDK** (`@modelcontextprotocol/sdk`). This SDK is a core dependency of the project, managed via the `package.json` file and installed as part of the standard `npm install` process. It provides the necessary tools and interfaces for creating and managing MCP-compliant services and tools.

## 2. 🧱 Project Structure

The project follows a modular structure:

```text
mcp-server/
├── logs/                     # Log files (gitignored)
├── node_modules/             # Project dependencies (managed by npm)
├── src/                      # Source code
│   ├── config/               # Configuration files
│   │   └── serviceConfig.js  # Service-specific configurations (API URLs, etc.)
│   ├── server.js             # Main server initialization and connection logic
│   ├── services/             # Business logic modules
│   │   ├── packageService.js # Core business logic
│   │   └── helpers/          # Service helper modules
│   │       ├── packageProductSpecificCodeHelpers.js
│   │       └── packageServiceHelpers.js
│   ├── tools/                # MCP tool definitions
│   │   ├── getSaleProductSchedule.js
│   │   ├── retrieveSaleProductInformation.js
│   │   └── index.js          # Aggregates and exports all tools
│   ├── transports/           # Transport layer configurations
│   │   └── stdioTransport.js
│   ├── utils/                # Utility functions
│   │   ├── apiUtils.js       # API call utility
│   │   ├── logger.cjs        # Logging utility (Note: .cjs extension)
│   │   ├── objectUtils.js    # Object cleaning utility (HTML tag removal, etc.)
│   │   ├── responseUtils.js  # Standard JSON response creation utility
│   │   └── stripHtml.js      # HTML tag removal utility
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── DEVELOPER_MANUAL.ko.md    # Developer Manual (Korean)
├── DEVELOPER_MANUAL.md       # This Developer Manual (English)
├── INSTALL.ko.md             # Installation Guide (Korean)
├── INSTALL.md                # Installation Guide (English)
├── README.ko.md              # Project Overview (Korean)
├── README.md                 # Project Overview (English)
├── package.json              # Project metadata and dependencies
└── package-lock.json         # Records exact versions of dependencies
```

### 🔑 Key Components

*   📄 **`src/server.js`**:
    *   Initializes the `McpServer` instance from the `@modelcontextprotocol/sdk`.
    *   Imports all tool definitions from `src/tools/index.js` and registers them with the server.
    *   Creates and connects the Standard I/O (StdIO) transport layer using `src/transports/stdioTransport.js`.
    *   Includes top-level error handling for server startup and connection.

*   🛠️ **`src/tools/`**:
    *   Each file defines a specific MCP tool (e.g., `getSaleProductSchedule.js`).
    *   Each tool definition is an object containing `name` (unique identifier), `description` (functional explanation), `inputSchema` (input validation schema using `zod`), and an `async handler` (function performing the actual logic).
    *   **Tool handlers** typically perform the following:
        1.  Receive validated input.
        2.  Call appropriate service methods from `src/services/packageService.js` to execute business logic.
        3.  Clean the results from the service using `cleanObject` from `src/utils/objectUtils.js` (removes HTML tags and unnecessary `null` values).
        4.  Format the final response for the MCP client in a standardized JSON format using `createJsonResponse` from `src/utils/responseUtils.js`.
        5.  Log and propagate errors if they occur.
    *   `src/tools/index.js` aggregates all tool definitions and can override their descriptions more specifically before providing them to `server.js`.

*   ⚙️ **`src/config/serviceConfig.js`**:
    *   Centrally manages configurations for the service layer, such as base URLs for external APIs (`apiUrls`) and default API request parameters (`defaultApiParams`).
    *   API URLs can be overridden by environment variables (e.g., `PKG_API_BASE_URL`, `OLS_QA_BASE_URL`, `COMMON_OLS_BASE_URL`), facilitating deployment across different environments (development, QA, production).

*   📦 **`src/services/packageService.js`**:
    *   Contains the core business logic of the application. It's responsible for making external API calls, processing data, and preparing the data needed by the tool handlers.
    *   Imports API endpoints and default parameters from `src/config/serviceConfig.js`.
    *   Uses the `callApi` utility from `src/utils/apiUtils.js` to make actual HTTP requests.
    *   Complex request body generation logic might be delegated to helper modules like `src/services/helpers/packageServiceHelpers.js`.
    *   Specific code retrieval logic (e.g., for product classification, promotion, theme codes) is handled via helper functions like `callPackageProductSpecificCodeService` in `src/services/helpers/packageProductSpecificCodeHelpers.js`.

*   🤝 **`src/services/helpers/`**:
    *   Contains helper functions that assist the logic in `packageService.js`.
    *   `packageProductSpecificCodeHelpers.js`: Encapsulates logic for calling specific OLS APIs, such as those for retrieving product classification, promotion, and theme codes.
    *   `packageServiceHelpers.js`: Handles tasks like generating complex request bodies for tools like `retrieveSaleProductInformation`.

*   🚇 **`src/transports/stdioTransport.js`**:
    *   Provides a factory function `createStdioTransport` for creating and configuring the `StdioServerTransport` from the `@modelcontextprotocol/sdk`.

*   🪵 **`src/utils/`**:
    *   **`apiUtils.js`**: Provides the `callApi` function using `axios` to call external APIs, including request and response logging.
    *   **`logger.cjs`**: Sets up logging using the `winston` library for both console and rotating file output. Manages log format, level, file paths, etc.
    *   **`objectUtils.js`**: Provides the `cleanObject` function to remove HTML tags from all string values within an object or array and clean up `null` or `undefined` values.
    *   **`responseUtils.js`**: Provides the `createJsonResponse` function to ensure all tool handlers return responses in a consistent JSON structure, potentially including status, data, message, and timestamp.
    *   **`stripHtml.js`**: Provides the `stripHtml` function to remove HTML tags and certain special characters from a string.

## 3. 🔧 MCP Tool Implementation

The server offers a variety of MCP tools to query and manage travel product-related information. All tools are defined in the `src/tools/` directory and registered via `src/tools/index.js`.

Each tool generally follows this structure:
1.  **Input Validation**: Validates input parameters using a `zod` schema.
2.  **Service Call**: Invokes the corresponding function in `packageService` to perform the business logic.
3.  **Result Cleaning**: Uses the `cleanObject` utility to remove HTML tags, etc., from the data received from the service.
4.  **Response Generation**: Uses the `createJsonResponse` utility to create a standardized JSON response.


### 3.1. 🛠️ `getSaleProductSchedule` Tool

*   📁 **File**: `src/tools/getSaleProductSchedule.js`
*   🎯 **Purpose**: Retrieves the travel schedule (itinerary) information for a given `saleProdCd` (sales product code). **This tool implements field filtering using `includeFields` to optimize response size and performance.**
    *   The response includes:
        *   `meetInfoBcVo`: Meeting information with filtered fields (`sndgMeetDt`, `sndgMeetTm`, `aptCd`)
        *   `schdInfoList`: Schedule information with filtered fields (`schdDay`, `strtDt`, `strDow`)
        *   `schdMainInfoList`: Main schedule details with filtered fields (`schtExprSqc`, `schdCatgNm`, `depCityCd`, `arrCityCd`, `schdDay`, `memoTitlNm`, `dtlMealDvNm`, `mealTypeNm`, `cardCntntPc`)
        *   `htlInfoList`: Hotel information with filtered fields (`schdDay`, `htlSeq`, `htlFixYn`, `htlKoNm`, `htlAplcLangNm`, `enAdrs`, `mainTel`, `faxnVal`, `hmpgUrlAdrs`, `locaDesc`)
        *   `pkgAirSeqList`: Flight information with filtered fields (`airlCd`, `airlNm`, `flgtNm`, `depHm`, `arrHm`, `arrAptCd`, `arrAptNm`, `arrAptCityNm`, `depAptCd`, `depAptNm`, `depAptCityNm`)
*   📥 **Input Schema**:
    | Parameter    | Type   | Required | Description             |
    | :----------- | :----- | :------- | :---------------------- |
    | `saleProdCd` | string | Yes      | Sales Product Code      |
*   🧠 **Handler Logic**:
    1.  Receives `saleProdCd` as input.
    2.  Calls `packageService.getSchedules(saleProdCd)`.
    3.  `packageService.getSchedules` internally makes a POST request to the `/pkg/api/common/pkgcomprod/getPkgProdItnrInfo/v1.00` endpoint at the URL defined in `apiUrls.packageApiBase`.
    4.  **Applies `includeFields` filtering** to optimize the response by including only necessary fields for each data structure.
    5.  Cleans the filtered response using `cleanObject`.
    6.  Generates the final response using `createJsonResponse`, including the cleaned schedule data, `saleProdCd`, and a `retrievedAt` timestamp.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": {
            "saleProdCd": "AAA1982001287C0",
            "schedules": {
              "meetInfoBcVo": {
                "sndgMeetDt": "20200128",
                "sndgMeetTm": "0345",
                "aptCd": "ICN"
              },
              "schdInfoList": [
                {
                  "schdDay": 1,
                  "strtDt": "20200128",
                  "strDow": "화",
                  "schdMainInfoList": [
                    {
                      "schtExprSqc": 1,
                      "schdCatgNm": "관광지",
                      "schdDay": 1
                    }
                  ]
                }
              ],
              "pkgAirSeqList": [
                {
                  "airlCd": "7C",
                  "airlNm": "제주항공",
                  "flgtNm": "2201",
                  "depHm": "0615",
                  "arrHm": "1105",
                  "arrAptCd": "BKK",
                  "arrAptNm": "수완나품 공항",
                  "arrAptCityNm": "방콕",
                  "depAptCd": "ICN",
                  "depAptNm": "인천 국제공항",
                  "depAptCityNm": "서울"
                }
              ]
            },
            "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
          },
          "message": "Function getSaleProductScheduleTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.24. 🛠️ `retrieveSameAirInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveSameAirInformationBySaleProductCode.js` (Original filename: `retrieveSameAirInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves a list of other sales products that use the same air (flight) information as a given `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveSameAirInformationBySaleProductCode({ saleProductCode, departureDay })`. (Service function name assumed to be corrected based on filename)
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodaiv/cbc/prodaivsacaivbscmgmt/retrieveSmdyAirSaleProd/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned list of sales products with same air information */ },
          "message": "Function retrieveSameAirInformationBySaleProductCodeTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.23. 🛠️ `retrieveBrandCodeBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveBrandCodeBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves product brand codes based on conditions like product attribute, creation/modification code, sales product code, and charter sale status.
*   📥 **Input Schema**:
    | Parameter                | Type   | Required | Description (Zod `describe`)                                     |
    | :----------------------- | :----- | :------- | :--------------------------------------------------------------- |
    | `productAttributeCode`   | string | Yes      | Product Attribute Code                                           |
    | `createdModifiedCode`    | string | Yes      | Creation/Modification Code                                       |
    | `saleProductCode`        | string | Yes      | Sales Product Code                                               |
    | `charterSaleYn`          | enum   | Yes      | Charter Sale Status ('Y' or 'N'), `z.enum(['Y', 'N'])`           |
*   🧠 **Handler Logic**:
    1.  Receives input parameters.
    2.  Calls `packageService.retrieveBrandCodeBySaleProductCode(params)`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsebassinfo/retrieveBrndCd/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned brand code information */ },
          "message": "Function retrieveBrandCodeBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.22. 🛠️ `retrieveRemarksInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveRemarksInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves remarks information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveRemarksInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveRmkTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned remarks information */ },
          "message": "Function retrieveRemarksInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.21. 🛠️ `retrieveItineraryInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveItineraryInformationBySaleProductCode.js` (Original filename: `retrieveInineraryInformationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves itinerary information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveItineraryInformationBySaleProductCode({ saleProductCode, departureDay })`. (Service function name assumed to be corrected based on filename)
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveItnrTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned itinerary information */ },
          "message": "Function retrieveItineraryInformationBySaleProductCodeTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.20. 🛠️ `retrieveExpenseInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveExpenseInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves expense information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveExpenseInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveExpnTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned expense information */ },
          "message": "Function retrieveExpenseInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.19. 🛠️ `retrieveOptionalTourBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveOptionalTourBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves optional tour information for a product using its `saleProductCode` and `departureDay`. (Note: This tool might be similar to or supersede `getPackageProductOptionalTourInformation`. A comparison of API endpoints and return values would be needed to clarify.)
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveOptionalTourBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveChssTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned optional tour information */ },
          "message": "Function retrieveOptionalTourBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.18. 🛠️ `retrieveSendingTermAndConditionsBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveSendingTermAndConditionsBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves sending terms and conditions information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveSendingTermAndConditionsBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSndgStplInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned sending terms and conditions information */ },
          "message": "Function retrieveSendingTermAndConditionsBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveHotelScheduleInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves hotel and local schedule information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveHotelScheduleInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHtlSchdInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned hotel and local schedule information */ },
          "message": "Function retrieveHotelScheduleInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.24. 🛠️ `retrieveSameAirInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveSameAirInformationBySaleProductCode.js` (Original filename: `retrieveSameAirInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves a list of other sales products that use the same air (flight) information as a given `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveSameAirInformationBySaleProductCode({ saleProductCode, departureDay })`. (Service function name assumed to be corrected based on filename)
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodaiv/cbc/prodaivsacaivbscmgmt/retrieveSmdyAirSaleProd/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned list of sales products with same air information */ },
          "message": "Function retrieveSameAirInformationBySaleProductCodeTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.23. 🛠️ `retrieveBrandCodeBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveBrandCodeBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves product brand codes based on conditions like product attribute, creation/modification code, sales product code, and charter sale status.
*   📥 **Input Schema**:
    | Parameter                | Type   | Required | Description (Zod `describe`)                                     |
    | :----------------------- | :----- | :------- | :--------------------------------------------------------------- |
    | `productAttributeCode`   | string | Yes      | Product Attribute Code                                           |
    | `createdModifiedCode`    | string | Yes      | Creation/Modification Code                                       |
    | `saleProductCode`        | string | Yes      | Sales Product Code                                               |
    | `charterSaleYn`          | enum   | Yes      | Charter Sale Status ('Y' or 'N'), `z.enum(['Y', 'N'])`           |
*   🧠 **Handler Logic**:
    1.  Receives input parameters.
    2.  Calls `packageService.retrieveBrandCodeBySaleProductCode(params)`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsebassinfo/retrieveBrndCd/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned brand code information */ },
          "message": "Function retrieveBrandCodeBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.22. 🛠️ `retrieveRemarksInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveRemarksInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves remarks information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveRemarksInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveRmkTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned remarks information */ },
          "message": "Function retrieveRemarksInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.21. 🛠️ `retrieveItineraryInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveItineraryInformationBySaleProductCode.js` (Original filename: `retrieveInineraryInformationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves itinerary information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveItineraryInformationBySaleProductCode({ saleProductCode, departureDay })`. (Service function name assumed to be corrected based on filename)
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveItnrTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned itinerary information */ },
          "message": "Function retrieveItineraryInformationBySaleProductCodeTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.20. 🛠️ `retrieveExpenseInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveExpenseInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves expense information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveExpenseInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveExpnTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned expense information */ },
          "message": "Function retrieveExpenseInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.19. 🛠️ `retrieveOptionalTourBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveOptionalTourBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves optional tour information for a product using its `saleProductCode` and `departureDay`. (Note: This tool might be similar to or supersede `getPackageProductOptionalTourInformation`. A comparison of API endpoints and return values would be needed to clarify.)
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveOptionalTourBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveChssTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned optional tour information */ },
          "message": "Function retrieveOptionalTourBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.18. 🛠️ `retrieveSendingTermAndConditionsBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveSendingTermAndConditionsBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves sending terms and conditions information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveSendingTermAndConditionsBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSndgStplInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned sending terms and conditions information */ },
          "message": "Function retrieveSendingTermAndConditionsBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveHotelScheduleInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves hotel and local schedule information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveHotelScheduleInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHtlSchdInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned hotel and local schedule information */ },
          "message": "Function retrieveHotelScheduleInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveAirLineInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves airline and flight information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveAirLineInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHgrsInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned airline information */ },
          "message": "Function retrieveAirLineInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveProductTabBasicInformationBySaleProductCode.js` (Original filename: `retrieveProductTabBasicInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves basic tab information for a product detail page using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductTabBasicInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product tab basic information */ },
          "message": "Function retrieveProductTabBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveAirLineInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves airline and flight information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveAirLineInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHgrsInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned airline information */ },
          "message": "Function retrieveAirLineInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveProductTabBasicInformationBySaleProductCode.js` (Original filename: `retrieveProductTabBasicInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves basic tab information for a product detail page using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductTabBasicInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product tab basic information */ },
          "message": "Function retrieveProductTabBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveHotelScheduleInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves hotel and local schedule information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveHotelScheduleInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHtlSchdInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned hotel and local schedule information */ },
          "message": "Function retrieveHotelScheduleInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveAirLineInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves airline and flight information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveAirLineInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHgrsInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned airline information */ },
          "message": "Function retrieveAirLineInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.24. 🛠️ `retrieveSameAirInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveSameAirInformationBySaleProductCode.js` (Original filename: `retrieveSameAirInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves a list of other sales products that use the same air (flight) information as a given `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveSameAirInformationBySaleProductCode({ saleProductCode, departureDay })`. (Service function name assumed to be corrected based on filename)
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodaiv/cbc/prodaivsacaivbscmgmt/retrieveSmdyAirSaleProd/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned list of sales products with same air information */ },
          "message": "Function retrieveSameAirInformationBySaleProductCodeTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.23. 🛠️ `retrieveBrandCodeBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveBrandCodeBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves product brand codes based on conditions like product attribute, creation/modification code, sales product code, and charter sale status.
*   📥 **Input Schema**:
    | Parameter                | Type   | Required | Description (Zod `describe`)                                     |
    | :----------------------- | :----- | :------- | :--------------------------------------------------------------- |
    | `productAttributeCode`   | string | Yes      | Product Attribute Code                                           |
    | `createdModifiedCode`    | string | Yes      | Creation/Modification Code                                       |
    | `saleProductCode`        | string | Yes      | Sales Product Code                                               |
    | `charterSaleYn`          | enum   | Yes      | Charter Sale Status ('Y' or 'N'), `z.enum(['Y', 'N'])`           |
*   🧠 **Handler Logic**:
    1.  Receives input parameters.
    2.  Calls `packageService.retrieveBrandCodeBySaleProductCode(params)`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsebassinfo/retrieveBrndCd/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned brand code information */ },
          "message": "Function retrieveBrandCodeBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.22. 🛠️ `retrieveRemarksInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveRemarksInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves remarks information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveRemarksInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveRmkTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned remarks information */ },
          "message": "Function retrieveRemarksInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.21. 🛠️ `retrieveItineraryInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveItineraryInformationBySaleProductCode.js` (Original filename: `retrieveInineraryInformationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves itinerary information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveItineraryInformationBySaleProductCode({ saleProductCode, departureDay })`. (Service function name assumed to be corrected based on filename)
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveItnrTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned itinerary information */ },
          "message": "Function retrieveItineraryInformationBySaleProductCodeTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.20. 🛠️ `retrieveExpenseInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveExpenseInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves expense information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveExpenseInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveExpnTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned expense information */ },
          "message": "Function retrieveExpenseInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.19. 🛠️ `retrieveOptionalTourBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveOptionalTourBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves optional tour information for a product using its `saleProductCode` and `departureDay`. (Note: This tool might be similar to or supersede `getPackageProductOptionalTourInformation`. A comparison of API endpoints and return values would be needed to clarify.)
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveOptionalTourBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveChssTabInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned optional tour information */ },
          "message": "Function retrieveOptionalTourBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.18. 🛠️ `retrieveSendingTermAndConditionsBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveSendingTermAndConditionsBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves sending terms and conditions information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveSendingTermAndConditionsBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSndgStplInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned sending terms and conditions information */ },
          "message": "Function retrieveSendingTermAndConditionsBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.17. 🛠️ `retrieveHotelScheduleInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveHotelScheduleInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves hotel and local schedule information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveHotelScheduleInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHtlSchdInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned hotel and local schedule information */ },
          "message": "Function retrieveHotelScheduleInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveAirLineInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves airline and flight information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveAirLineInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveHgrsInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned airline information */ },
          "message": "Function retrieveAirLineInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveProductTabBasicInformationBySaleProductCode.js` (Original filename: `retrieveProductTabBasicInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves basic tab information for a product detail page using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductTabBasicInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product tab basic information */ },
          "message": "Function retrieveProductTabBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.14. 🛠️ `retrieveProductFareInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveProductFareInformationBySaleProductCode.js` (Original filename: `retrieveProductFareInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves fare information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductFareInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdFareTpgInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product fare information */ },
          "message": "Function retrieveProductFareInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.15. 🛠️ `retrieveProductTabBasicInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveProductTabBasicInformationBySaleProductCode.js` (Original filename: `retrieveProductTabBasicInfomationBySaleProductCode.js`)
*   🎯 **Purpose**: Retrieves basic tab information for a product detail page using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductTabBasicInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product tab basic information */ },
          "message": "Function retrieveProductTabBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.16. 🛠️ `retrieveAirLineInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveAirLineInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves airline and flight information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductTabBasicInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveTpgBscInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product tab basic information */ },
          "message": "Function retrieveProductTabBasicInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.13. 🛠️ `retrieveProductAirInventoryInformationBySaleProductCode` Tool

*   📁 **File**: `src/tools/retrieveProductAirInventoryInformationBySaleProductCode.js`
*   🎯 **Purpose**: Retrieves air inventory information for a product using its `saleProductCode` and `departureDay`.
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `describe`)                         |
    | :---------------- | :----- | :------- | :----------------------------------------------------- |
    | `saleProductCode` | string | Yes      | Sales Product Code                                     |
    | `departureDay`    | string | Yes      | Departure Date (YYYYMMDD format), `z.string().regex(/^\d{8}$/)` |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` and `departureDay` as input.
    2.  Calls `packageService.retrieveProductAirInventoryInformationBySaleProductCode({ saleProductCode, departureDay })`.
    3.  The service function makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveProdAivInfo/v1.00` endpoint at `apiUrls.olsQaBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned product air inventory information */ },
          "message": "Function retrieveProductAirInventoryInformationBySaleProductCodeTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.25. 🛠️ `updateSaleProductSchedule` Tool (For Reference)

*   📁 **File**: `src/tools/updateSaleProductSchedule.js`
*   🎯 **Purpose**: Updates a sales product schedule. (*Note: This functionality might not be actively used or may be handled differently in the current system. For reference only.*)
*   📥 **Input Schema**:
    | Parameter    | Type   | Required | Description                     |
    | :----------- | :----- | :------- | :------------------------------ |
    | `name`       | string | Yes      | Name of the schedule to update. |
    | `saleProdCd` | string | Yes      | Sales Product Code to update.   |
*   🧠 **Handler Logic**:
    1.  Receives `name` and `saleProdCd` as input.
    2.  Calls `packageService.updateSchedule(saleProdCd, name)` to perform the update. (The corresponding API might not be active in the production environment.)
    3.  Generates a JSON response indicating success or failure based on the service response. (This tool constructs its response directly, not using `createJsonResponse`.)
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"message\": \"Schedule for ALLLSLSLSL updated with name new_schedule_name. Service status: Updated via service\",\n  \"updatedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.3. 🛠️ `getBasicCommonCodeByQuery` Tool

*   📁 **File**: `src/tools/getBasicCommonCodeByQuery.js`
*   🎯 **Purpose**: Retrieves a list of basic and general common codes based on a user query. This can be used to obtain initial code names or codes for querying with the `getDetailCommonCodeByQuery` tool.
    *   (Description from `src/tools/index.js` - translated: "This tool finds and queries 'less specific' basic and general common codes based on the user's request. Input: `query` (string, required): The user's query text. This text, after removing spaces, is used to search for codes corresponding to broad or basic classifications in the common code database. Example queries: 1) If the user asks for 'list of basic codes related to land costs', the query '지상비' (land costs) is passed to the tool. 2) If the user asks for 'find basic travel type codes', the query '여행타입' (travel type) is passed.")
*   📥 **Input Schema**:
    | Parameter | Type   | Required | Description                        |
    | :-------- | :----- | :------- | :--------------------------------- |
    | `query`   | string | Yes      | The code name or query to search for. |
*   🧠 **Handler Logic**:
    1.  Receives `query` as input.
    2.  Calls `packageService.getBasicCommonCodeByQuery(query)`.
    3.  `packageService.getBasicCommonCodeByQuery` internally makes a POST request to the `/common/ols/codemgt/cbc/commoncodemgt/getComBscCdList/v1.00` endpoint at the URL defined in `apiUrls.commonOlsBase`. The request body includes `comBscCd` (input `query`), `comBscCdNm` (input `query`), and a `header` (including language code).
    4.  Cleans the service response (an object containing the original `query` and the API response data) using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": {
            "query": "TravelType", // Input query value
            "data": { /* Basic list of codes received from API */ }
          },
          "message": "Function getBasicCommonCodeByQueryTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.4. 🛠️ `retrieveSaleProductInformation` Tool

*   📁 **File**: `src/tools/retrieveSaleProductInformation.js`
*   🎯 **Purpose**: Retrieves information for one or more sales products (travel packages) based on various search criteria. If specific codes (like area or attribute codes) are unknown, it's recommended to first use `getBasicCommonCodeByQuery` and `getDetailCommonCodeByQuery` to find appropriate codes.
    *   (Description from `src/tools/index.js` - translated: "This refers to travel products. It's used to query one or more sales product information items by inputting various search conditions. If you don't know the code values, please call the functions sequentially as described below to help find the appropriate product codes. Required input parameters: `startDate` (start date/departure date), `endDate` (end date/arrival date), `productAreaCd` (region code). Optional input parameters: `saleProductCode`, `reservationCode`, `productAttributeCode`, `saleProductName`. Pagination parameters can also be input.")
*   🔀 **Recommended Execution Flow**:
    1.  If information like region or product attributes needs to be codified from a user query, first call `getBasicCommonCodeByQuery` to get a broad list of codes.
    2.  Select the most suitable value from the `getBasicCommonCodeByQuery` results and call `getDetailCommonCodeByQuery` to obtain a more specific code.
    3.  Use the obtained codes along with other criteria (dates, product name, etc.) to call this `retrieveSaleProductInformation` tool.
*   📥 **Input Schema**:
    | Parameter                | Type   | Required | Description (derived from Zod `describe` in source)                                                                                                |
    | :----------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `saleProductCode`      | string | No       | Unique code to retrieve a specific sales product.                                                                                                  |
    | `reservationCode`      | string | No       | Code associated with a specific reservation to find related products.                                                                              |
    | `startDate`              | number | **Yes**  | Start date for product search (YYYYMMDD format). Mandatory.                                                                                        |
    | `endDate`                | number | **Yes**  | End date for product search (YYYYMMDD format). Mandatory.                                                                                          |
    | `productAttributeCode`   | string | No       | Single-character product attribute code (e.g., 'P' for Package, 'W' for Wedding, 'B' for Activity). Can be found using `getDetailCommonCodeByQuery`. |
    | `productAreaCode`        | string | No       | Two-character region code (e.g., 'AA' for Bangkok/Southeast Asia, 'C1' for China). Can be found using `getDetailCommonCodeByQuery`. Default 'A0' (Southeast Asia) might be used if unspecified. |
    | `saleProductName`        | string | No       | Text keyword from user query representing the product name.                                                                                        |
    | `brandCode`              | string | No       | Text keyword from user query representing the brand code.                                                                                          |
    | `pageSize`               | number | No       | Maximum number of products to display per page (default: 100).                                                                                     |
    | `pageNumber`             | number | No       | Page number of the results to retrieve (default: 1).                                                                                               |
    | `totalRowCount`          | number | No       | Total count of products matching the criteria (usually part of the response, not input).                                                           |
    | `totalPageCount`         | number | No       | Total number of pages based on `pageSize` (usually part of the response, not input).                                                               |
*   🧠 **Handler Logic**:
    1.  Receives all input parameters.
    2.  Calls `packageService.retrieveSaleProductInformation(params)`.
    3.  `packageService.retrieveSaleProductInformation` uses `buildRetrieveSaleProductRequestBody` (from `src/services/helpers/packageServiceHelpers.js`) to construct the API request body, then makes a POST request to the `/pkg/api/ols/product/saleprodmgmt/saleprodbrws/cbc/saleprodbrwsexus/retrieveSaleProdBrwsTab/v1.00` endpoint at the URL defined in `apiUrls.olsQaBase`.
    4.  Cleans the service response (which includes `saleProductList`) using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`, including all input parameters, the cleaned `saleProductList`, and a `retrievedAt` timestamp.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
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
            "totalRowCount": null, // Will be populated based on API response
            "totalPageCount": null, // Will be populated based on API response
            "saleProductList": [
              {
                "productName": "Amazing Bangkok Tour (Cleaned)",
                "details": "Explore the vibrant city of Bangkok with our exclusive package. (Cleaned)"
              }
            ],
            "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" // Generated by the handler
          },
          "message": "Function retrieveSaleProductInformationTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" // Timestamp from createJsonResponse
        }
      }]
    }
    ```

### 3.5. 🛠️ `retrieveAreaCode` Tool

*   📁 **File**: `src/tools/retrieveAreaCode.js`
*   🎯 **Purpose**: Retrieves code information for regions, countries, and continents. **This tool implements field filtering using `includeFields` to return only essential fields (`code`, `codeNm`) for optimal performance.**
*   📥 **Input Schema**: No parameters (`z.object({})`).
*   🧠 **Handler Logic**:
    1.  Calls `packageService.retrieveAreaCode()`.
    2.  `packageService.retrieveAreaCode` internally makes a POST request to the `/pkg/api/gnis/common/cbc/compkgarea/getComPkgAreaCboListForProduct/v1.00` endpoint at the URL defined in `apiUrls.olsQaBase`.
    3.  **Applies `includeFields` filtering** to include only `code` and `codeNm` fields from the `comPkgAreaCQcVoList`.
    4.  Cleans the filtered response using `cleanObject`.
    5.  Formats the response as a JSON string including the cleaned data and a `retrievedAt` timestamp.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"areaCodeList\": {\n    \"comPkgAreaCQcVoList\": [\n      {\n        \"code\": \"A0\",\n        \"codeNm\": \"동남아\"\n      },\n      {\n        \"code\": \"C1\",\n        \"codeNm\": \"중국\"\n      }\n    ]\n  },\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.6. 🛠️ `getPackageProductInfo` Tool

*   📁 **File**: `src/tools/getPackageProductInfo.js`
*   🎯 **Purpose**: Retrieves detailed information for a package product using its `saleProductCode`. This may include basic product details, pricing, itinerary, etc.
    *   (Original description from tool file: "판매상품코드(saleProductCode)를 사용하여 패키지 상품 정보를 조회합니다." - Translates to: "Retrieves package product information using saleProductCode.")
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `message`)     |
    | :---------------- | :----- | :------- | :------------------------------ |
    | `saleProductCode` | string | Yes      | `saleProductCode` is required. |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` as input.
    2.  Calls `packageService.getPackageProductInfo({ saleProductCode })`.
    3.  `packageService.getPackageProductInfo` internally makes a POST request to the `/pkg/api/common/pkgcomprod/getPkgProdInfo2/v1.00` endpoint at the URL defined in `apiUrls.packageApiBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned package product information */ },
          "message": "Function getPackageProductInfoTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.7. 🛠️ `getPackageProductOptionalTourInformation` Tool

*   📁 **File**: `src/tools/getPackageProductOptionalTourInformation.js` (Original filename: `getPackageProductOptionalTourInfomation.js`)
*   🎯 **Purpose**: Retrieves detailed information about optional tours available for a package product, using its `saleProductCode`. This can include names, prices, and descriptions of optional tours.
    *   (Original description from tool file: "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 선택 관광 정보를 조회합니다." - Translates to: "Retrieves optional tour information for a package product using saleProductCode.")
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `message`)     |
    | :---------------- | :----- | :------- | :------------------------------ |
    | `saleProductCode` | string | Yes      | `saleProductCode` is required. |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` as input.
    2.  Calls `packageService.getPackageProductOptionalTourInformation({ saleProductCode })`. (Service function name assumed to be corrected based on filename)
    3.  `packageService.getPackageProductOptionalTourInformation` internally makes a POST request to the `/pkg/api/common/pkgcomprod/getPkgProdChcStsngInfo/v1.00` endpoint at the URL defined in `apiUrls.packageApiBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned optional tour information */ },
          "message": "Function getPackageProductOptionalTourInformationTool.handler executed successfully...", // Note: Tool name in message might still reflect old filename if not updated in source
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.8. 🛠️ `getPackageProductRulesAndTravelAlerts` Tool

*   📁 **File**: `src/tools/getPackageProductRulesAndTravelAlerts.js`
*   🎯 **Purpose**: Retrieves important information for a package product, such as terms and conditions, precautions, and travel alert levels, using its `saleProductCode`.
    *   (Original description from tool file: "판매상품코드(saleProductCode)를 사용하여 패키지 상품의 약관 및 유의사항, 여행경보 등을 조회합니다." - Translates to: "Retrieves terms, precautions, travel alerts, etc., for a package product using saleProductCode.")
*   📥 **Input Schema**:
    | Parameter         | Type   | Required | Description (Zod `message`)     |
    | :---------------- | :----- | :------- | :------------------------------ |
    | `saleProductCode` | string | Yes      | `saleProductCode` is required. |
*   🧠 **Handler Logic**:
    1.  Receives `saleProductCode` as input.
    2.  Calls `packageService.getPackageProductRulesAndTravelAlerts({ saleProductCode })`.
    3.  `packageService.getPackageProductRulesAndTravelAlerts` internally makes a POST request to the `/pkg/api/common/pkgcomprod/getPkgRefnMtr/v1.00` endpoint at the URL defined in `apiUrls.packageApiBase`.
    4.  Cleans the service response using `cleanObject`.
    5.  Generates the final response using `createJsonResponse`.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": { // JSON object stringified by createJsonResponse
          "status": "success",
          "data": { /* cleaned rules, precautions, and travel alert information */ },
          "message": "Function getPackageProductRulesAndTravelAlertsTool.handler executed successfully...",
          "retrievedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
      }]
    }
    ```

### 3.9. 🛠️ `retrieveAreaCode` Tool

*   📁 **File**: `src/tools/retrieveAreaCode.js`
*   🎯 **Purpose**: Retrieves code information for regions, countries, and continents. For example, if a user query is "Find Southeast Asia region", this tool can be used to get the relevant codes, which can then be used as the `productAreaCode` parameter in other tools (e.g., `retrieveSaleProductInformation`).
    *   (Description from `src/tools/index.js` - translated: "Retrieves information about regions, countries, and continents. Example: If the query is 'Find Southeast Asia region', execute this function, check the results, and select the code corresponding to Southeast Asia.")
*   📥 **Input Schema**: No parameters (`z.object({})`).
*   🧠 **Handler Logic**:
    1.  Calls `packageService.retrieveAreaCode()`.
    2.  `packageService.retrieveAreaCode` internally makes a POST request to the `/pkg/api/gnis/common/cbc/compkgarea/getComPkgAreaCboListForProduct/v1.00` endpoint at the URL defined in `apiUrls.olsQaBase`.
    3.  Cleans the service response (likely containing `areaCodeList`) using `cleanObject`.
    4.  Formats the response as a JSON string including the cleaned data and a `retrievedAt` timestamp. (Note: This tool directly constructs the response JSON string, not using `createJsonResponse`.)
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "{\n  \"areaCodeList\": [ /* Cleaned array of area code objects */ ],\n  \"retrievedAt\": \"YYYY-MM-DDTHH:mm:ss.sssZ\"\n}"
      }]
    }
    ```

### 3.10. 🛠️ `retrievePackageProductClassificationCode` Tool

*   📁 **File**: `src/tools/retrievePackageProductClassificationCode.js` (Original filename: `retrievePackageProductClassificationCodeTool.js`)
*   🎯 **Purpose**: Retrieves a list of product classification codes ('01') from OLS (Operation Link System). (Product Class: 01, Promotion: 02, Theme: 03)
    *   (Description from `src/tools/index.js` - translated: "Retrieves all product classification codes for package products.")
*   📥 **Input Schema**: No input parameters (`z.object({})`).
*   🧠 **Handler Logic**:
    1.  Calls `packageService.retrievePackageProductClassificationCode()`.
    2.  This service function internally calls `callPackageProductSpecificCodeService("01")` (from `src/services/helpers/packageProductSpecificCodeHelpers.js`).
    3.  `callPackageProductSpecificCodeService` makes a POST request to the `/pkg/ols/common/cbc/compkgprodstrtr/getComPkgProdStrtrCboList/v1.00` endpoint at the URL defined in `apiUrls.olsBase` (or another OLS URL based on config), with `prodSprtrDvCd: "01"`.
    4.  The service response is cleaned using `cleanObject` (within the helper function).
    5.  The tool handler then formats the (cleaned) result as a JSON string for the MCP content. (Note: This tool might directly stringify the array/object from the service rather than using `createJsonResponse`.)
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        // The actual response depends on the format from packageService.retrievePackageProductClassificationCode()
        // and callPackageProductSpecificCodeService().
        // If createJsonResponse were used directly by the tool, the structure would be different.
        // Current tool code directly stringifies the result:
        "text": "[ /* Cleaned array of classification code objects or strings */ ]"
      }]
    }
    ```

### 3.11. 🛠️ `retrievePackageProductPromotionCode` Tool

*   📁 **File**: `src/tools/retrievePackageProductPromotionCode.js` (Original filename: `retrievePackageProductPromotionCodeTool.js`)
*   🎯 **Purpose**: Retrieves a list of promotion codes ('02') for package products from OLS.
    *   (Description from `src/tools/index.js` - translated: "Retrieves promotion codes for package products.")
*   📥 **Input Schema**: No input parameters (`z.object({})`).
*   🧠 **Handler Logic**:
    1.  Calls `packageService.retrievePackageProductPromotionCode()`.
    2.  This internally calls `callPackageProductSpecificCodeService("02")`. The processing logic is similar to `retrievePackageProductClassificationCode`, but with `prodSprtrDvCd` as "02".
    3.  The tool handler formats the (cleaned) result as a JSON string for the MCP content.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* Cleaned array of promotion code objects or strings */ ]"
      }]
    }
    ```

### 3.12. 🛠️ `retrievePackageProductThemeCode` Tool

*   📁 **File**: `src/tools/retrievePackageProductThemeCode.js` (Original filename: `retrievePackageProductThemeCodeTool.js`)
*   🎯 **Purpose**: Retrieves a list of theme codes ('03') for package products from OLS.
    *   (Description from `src/tools/index.js` - translated: "Retrieves all theme codes for package products.")
*   📥 **Input Schema**: No input parameters (`z.object({})`).
*   🧠 **Handler Logic**:
    1.  Calls `packageService.retrievePackageProductThemeCode()`.
    2.  This internally calls `callPackageProductSpecificCodeService("03")`. The processing logic is similar to `retrievePackageProductClassificationCode`, but with `prodSprtrDvCd` as "03".
    3.  The tool handler formats the (cleaned) result as a JSON string for the MCP content.
*   ✅ **Output (Success Example)**:
    ```json
    {
      "content": [{
        "type": "text",
        "text": "[ /* Cleaned array of theme code objects or strings */ ]"
      }]
    }
    ```

## 4. ⚙️ Configuration Management

The application's configurations, particularly for service integrations, are managed centrally, primarily through `src/config/serviceConfig.js` and environment variables.

*   **Key Configuration File**:
    *   📄 **`src/config/serviceConfig.js`**: This file is crucial for defining how the `packageService.js` and, by extension, the tools interact with external APIs. It exports:
        *   `apiUrls`: An object containing base URLs for various backend services. Key URLs include:
            *   `packageApiBase`: Base URL for package-specific APIs (e.g., retrieving itineraries, optional tours). Defaults to `http://pkgapiqa.hanatour.com:8082` and can be overridden by the `PKG_API_BASE_URL` environment variable.
            *   `olsQaBase`: Base URL for OLS (Operation Link System) QA environment APIs (e.g., retrieving sale product information, area codes, product details by sale product code). Defaults to `http://pkgolsqa.hanatour.com:8081` and can be overridden by `PKG_OLS_BASE_URL` (note: `PKG_OLS_BASE_URL` seems to be a typo in the source and likely meant `OLS_QA_BASE_URL` or similar, but `PKG_OLS_BASE_URL` is what's currently in `serviceConfig.js` for this URL).
            *   `olsBase`: Base URL for OLS development environment APIs (e.g., for product structure codes like classification, promotion, theme). Defaults to `http://pkgolsdev.hanatour.com:8081` and can be overridden by `OLS_BASE_URL`.
            *   `commonOlsBase`: Base URL for common OLS APIs (e.g., for basic and detailed common codes). Defaults to `http://comolsdev.hanatour.com:8081` and can be overridden by `COMMON_OLS_BASE_URL`.
        *   `defaultApiParams`: An object containing default parameters for API calls, such as `commonCodeLang` (defaults to "ko-KR").
    *   Modifying this file or setting the corresponding environment variables allows for changes in how services connect to external systems or apply certain business rules without altering the core service or tool logic.

*   **Environment Variables**:
    *   As mentioned above, several API base URLs can be overridden using environment variables. This is standard practice for adapting the application to different deployment environments (e.g., development, QA, production) without code changes.
    *   Example environment variables: `PKG_API_BASE_URL`, `PKG_OLS_BASE_URL` (for `olsQaBase`), `OLS_BASE_URL`, `COMMON_OLS_BASE_URL`.

This centralized configuration approach enhances maintainability and flexibility.

## 5. 💪 SOLID Principles Application

The server architecture aims to adhere to **SOLID principles** to enhance maintainability and scalability:

*   🎯 **Single Responsibility Principle (SRP)**:
    *   **`src/server.js`**: Focuses on server initialization, tool registration, and transport layer connection.
    *   Individual Tool Files (e.g., **`src/tools/getSaleProductSchedule.js`**): Each tool file is responsible for defining its specific MCP interface (name, description, input schema) and handling its unique request logic, typically by delegating to the `packageService`.
    *   **`src/services/packageService.js`**: Encapsulates the core business logic for interacting with various package and product-related APIs.
    *   **`src/services/helpers/*.js`**: Helper modules within services further break down complex tasks into smaller, manageable functions (e.g., request body construction, specific API call sequences).
    *   **`src/config/serviceConfig.js`**: Centralizes external service configurations (URLs, default parameters).
    *   **`src/utils/*.js`**: Each utility module handles a distinct cross-cutting concern:
        *   `apiUtils.js`: Generic API calling.
        *   `logger.cjs`: Application-wide logging.
        *   `objectUtils.js`: Data cleaning (HTML stripping, null removal).
        *   `responseUtils.js`: Standardized JSON response formatting.
    *   **`src/transports/stdioTransport.js`**: Manages the creation of the Stdio transport layer.

*   🧩 **Open/Closed Principle (OCP)**:
    *   The system is open for extension but closed for modification. New tools can be added by creating new files in **`src/tools/`** and registering them in **`src/tools/index.js`** without altering existing, tested tool files or the core server logic in **`server.js`**.
    *   Similarly, new service functions or helper modules can be added to extend business logic capabilities without overhauling existing service code.

*   🤝 **Liskov Substitution Principle (LSP)**:
    *   While JavaScript doesn't enforce interfaces as strictly as typed languages, the design intends for service components to be substitutable if needed. For example, `packageService` could theoretically be replaced by another service implementation (e.g., a mock service for testing) as long as it adheres to the expected method signatures used by the tool handlers.

*   🔗 **Interface Segregation Principle (ISP)**:
    *   Each MCP tool definition (`name`, `description`, `inputSchema`, `handler`) acts as a specific, client-facing interface. Clients (MCP agents) only need to be aware of the tools they intend to use, rather than a single monolithic interface.

*   🔌 **Dependency Inversion Principle (DIP)**:
    *   High-level modules (tool handlers) depend on abstractions (the interface of `packageService`) rather than concrete low-level implementations directly. `packageService` itself depends on abstractions for API calls (`apiUtils.js`) and configurations (`serviceConfig.js`).
    *   `server.js` depends on the `createStdioTransport` factory function (an abstraction) rather than directly instantiating `StdioServerTransport`. This promotes loose coupling and makes it easier to introduce different transport mechanisms or service implementations in the future.

## 6. 🔧 Response Optimization with includeFields

### 6.1. 🎯 Purpose and Benefits

The `includeFields` utility is a powerful feature designed to optimize API responses by filtering out unnecessary data fields. This approach provides several key benefits:

*   **🚀 Performance Improvement**: Reduces response payload size, leading to faster data transmission and processing
*   **💰 Bandwidth Optimization**: Minimizes network usage by excluding unused fields
*   **🔍 Focused Data**: Returns only relevant information, making responses easier to parse and understand
*   **🔒 Security Enhancement**: Prevents accidental exposure of sensitive or internal fields
*   **🧠 Memory Efficiency**: Reduces memory consumption in both server and client applications

### 6.2. 🛠️ Implementation Guide

The `includeFields` function is located in `src/utils/responseFilter.js` and can be applied to any API response data structure.

**Basic Usage Pattern:**
```javascript
import { includeFields } from '../utils/responseFilter.js';

// Filter a single object
const filteredObject = includeFields(originalObject, ['field1', 'field2', 'field3']);

// Filter an array of objects
const filteredArray = originalArray.map(item => 
  includeFields(item, ['field1', 'field2'])
);
```

**Advanced Nested Filtering:**
```javascript
// Handle nested structures
if (response?.nestedList) {
  response.nestedList = response.nestedList.map(item => {
    const filteredItem = includeFields(item, ['mainField1', 'mainField2']);
    
    // Filter nested sub-arrays
    if (item?.subList) {
      filteredItem.subList = item.subList.map(subItem => 
        includeFields(subItem, ['subField1', 'subField2'])
      );
    }
    
    return filteredItem;
  });
}
```

### 6.3. 📝 Example Implementation

Here's how `includeFields` is implemented in the `getSaleProductSchedule` tool:

```javascript
// src/tools/getSaleProductSchedule.js
import { includeFields } from "../utils/responseFilter.js";

export const getSaleProductScheduleTool = {
  // ... tool definition
  async handler({ saleProdCd }) {
    try {
      const schedules = await packageService.getSchedules(saleProdCd);
      
      // Create filtered response object
      let filteredSchedules = {};
      
      // Filter meeting information
      if (schedules?.meetInfoBcVo) {
        filteredSchedules.meetInfoBcVo = includeFields(schedules.meetInfoBcVo, 
          ['sndgMeetDt', 'sndgMeetTm', 'aptCd']);
      }
      
      // Filter schedule information with nested filtering
      if (schedules?.schdInfoList) {
        filteredSchedules.schdInfoList = schedules.schdInfoList.map(item => {
          const filteredItem = includeFields(item, ['schdDay', 'strtDt', 'strDow']);
          
          // Filter nested main schedule information
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
      
      // Filter hotel information
      if (schedules?.htlInfoList) {
        filteredSchedules.htlInfoList = schedules.htlInfoList.map(item => 
          includeFields(item, [
            'schdDay', 'htlSeq', 'htlFixYn', 'htlKoNm', 'htlAplcLangNm', 
            'enAdrs', 'mainTel', 'faxnVal', 'hmpgUrlAdrs', 'locaDesc'
          ])
        );
      }
      
      // Filter flight information
      if (schedules?.pkgAirSeqList) {
        filteredSchedules.pkgAirSeqList = schedules.pkgAirSeqList.map(item => 
          includeFields(item, [
            'airlCd', 'airlNm', 'flgtNm', 'depHm', 'arrHm', 
            'arrAptCd', 'arrAptNm', 'arrAptCityNm', 
            'depAptCd', 'depAptNm', 'depAptCityNm'
          ])
        );
      }
      
      // Clean and return the filtered response
      const cleanedSchedules = cleanObject(filteredSchedules);
      return createJsonResponse(functionName, {
        saleProdCd,
        schedules: cleanedSchedules,
        retrievedAt: new Date().toISOString()
      }, logger);
      
    } catch (error) {
      // Error handling...
    }
  }
};
```

### 6.4. 🔍 Best Practices

**1. Field Selection Strategy:**
*   ✅ Include only fields that are actually used by client applications
*   ✅ Prioritize essential business data over metadata or internal fields
*   ✅ Consider the specific use case for each API endpoint

**2. Documentation:**
*   ✅ Document which fields are included and why
*   ✅ Maintain a clear mapping between API endpoints and their filtered fields
*   ✅ Update documentation when field requirements change

**3. Testing:**
*   ✅ Test filtered responses to ensure all necessary data is present
*   ✅ Verify that filtering doesn't break dependent functionality
*   ✅ Compare response sizes before and after filtering to measure improvements

**4. Maintenance:**
*   ✅ Regularly review and update field lists based on usage patterns
*   ✅ Remove fields that are no longer needed
*   ✅ Add new fields when business requirements change

**5. Error Handling:**
*   ✅ Ensure `includeFields` gracefully handles missing or null data
*   ✅ Provide fallback behavior when expected fields are not present
*   ✅ Log warnings when critical fields are missing from the source data

## 7. ✨ Adding a New MCP Tool

Follow these steps to add a new MCP tool to the server:

1️⃣ **Define Tool Logic (Preferably in a Service)**:
    *   If the new tool involves new business logic, it's best to first implement this logic within `src/services/packageService.js` or, if substantially different, create a new service file (e.g., `src/services/newFeatureService.js`).
    *   This business logic function will typically handle data fetching from external APIs (using `callApi` from `src/utils/apiUtils.js`), data processing, and any other computations.
    *   Remember to use the logger (`src/utils/logger.cjs`) within your service functions for important events and errors.

2️⃣ **Create the Tool Definition File**:
    *   Create a new JavaScript file in the `src/tools/` directory (e.g., `src/tools/myNewTool.js`).
    *   Import `z` from `zod` for input schema validation.
    *   Import the `packageService` (or your new service) to access the business logic.
    *   Import the `logger` from `../utils/logger.cjs` (adjust path if needed).
    *   Import `cleanObject` from `../utils/objectUtils.js`.
    *   Import `createJsonResponse` from `../utils/responseUtils.js`.
    *   Define and export the tool object:
        ```javascript
        import { z } from "zod";
        import { packageService } from "../services/packageService.js"; // or your specific service
        import logger from "../utils/logger.cjs";
        import { cleanObject } from "../utils/objectUtils.js";
        import { createJsonResponse } from "../utils/responseUtils.js";

        export const myNewTool = {
          name: "myNewToolName", // Unique tool name (camelCase)
          description: "A clear and concise description of what the tool does.",
          inputSchema: { // Define input parameters using zod
            param1: z.string().describe("Description for param1"),
            param2: z.number().optional().describe("Description for param2 (optional)"),
            // Add more parameters as needed
          },
          async handler(inputArguments) { // inputArguments will be validated by the MCP SDK
            const functionName = "myNewToolName.handler"; // For logging
            logger.info(`Executing ${functionName} with params: ${JSON.stringify(inputArguments)}`);

            try {
              // 1. Call the relevant service function
              // Example: const serviceResult = await packageService.processNewFeature(inputArguments);
              const serviceResult = { message: `Processed: ${inputArguments.param1}` }; // Placeholder

              // 2. Clean the result (if it contains HTML or needs null stripping)
              const cleanedResult = cleanObject(serviceResult);

              // 3. Create a standardized JSON response
              return createJsonResponse(functionName, cleanedResult, logger);

            } catch (error) {
              logger.error(`Error in ${functionName}: ${error.message}`, { error: error.stack });
              // Re-throw the error or return a structured error response if preferred by MCP client
              // For consistency with other tools, re-throwing is common.
              // The MCP SDK will catch this and format an error response.
              throw error;
            }
          },
        };
        ```
    *   **Input Schema Best Practices**: Use `z.describe()` for each parameter in your `inputSchema` to provide clear explanations for users of the tool (e.g., LLM agents).
    *   **Handler Logic**: The handler should ideally be lean, focusing on:
        *   Calling the appropriate service function.
        *   Cleaning the data from the service using `cleanObject`.
        *   Formatting the final response using `createJsonResponse`.
        *   Comprehensive error logging.

3️⃣ **Register the Tool**:
    *   Open `src/tools/index.js`.
    *   Import your new tool definition (e.g., `import { myNewTool } from "./myNewTool.js";`).
    *   Add your tool object to the `tools` array. You can also provide or override the tool's primary `description` here if desired (as seen with existing tools in `index.js`):
        ```javascript
        // ... other imports
        import { myNewTool } from "./myNewTool.js"; // Import new tool

        export const tools = [
          // ... other tools
          {
            ...myNewTool, // Spread the imported tool object
            // Optionally override or set a more specific description here for the index
            // description: "A more specific description for the tool listing if needed."
          },
        ];
        ```
    *   Ensure the `description` provided in `index.js` (if overridden) or in the tool file itself is clear and accurately reflects the tool's purpose and key inputs/outputs, as this is what LLM agents will primarily see.

4️⃣ **Restart the Server**:
    *   After adding a new tool and registering it, you must restart the Node.js server for the changes to take effect.

## 7. 🚀 Running and Testing

Refer to **`INSTALL.MD`** for instructions on how to install dependencies and run the server.

To test tools manually (especially when using the `StdioTransport` with a compatible MCP client):
1.  Ensure the server is running: `node src/server.js`.
2.  Send MCP requests in JSON format via `stdin`. For example:
    *   To call `getSaleProductSchedule`:
        ```json
        {
          "tool": "getSaleProductSchedule",
          "inputs": { "saleProdCd": "TEST001" }
        }
        ```
    *   To call `retrieveSaleProductInformation` (example with more parameters):
        ```json
        {
          "tool": "retrieveSaleProductInformation",
          "inputs": {
            "startDate": 20240101,
            "endDate": 20241231,
            "productAreaCode": "AA",
            "saleProductName": "여행",
            "pageSize": 5
          }
        }
        ```
3.  Observe the JSON output on `stdout`. This output will be structured by the `createJsonResponse` utility for most tools.

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

*   💾 **Database Integration**: Some service functions (especially related to `updateSaleProductSchedule`) might be using placeholder logic or pointing to inactive APIs. These could be enhanced to interact with actual databases or confirmed live APIs as per operational requirements.
*   🧪 **Unit and Integration Tests**: While not explicitly detailed in the current source, implementing a comprehensive test suite (unit tests for service logic, integration tests for tool handlers) would significantly improve code stability and reliability.
*   📊 **Advanced Logging and Monitoring**: The existing `Winston` setup is good. Future enhancements could include integration with log management systems (e.g., ELK Stack, Splunk), distributed tracing, and Application Performance Monitoring (APM) tools for better operational insights.
*   🛠️ **Sophisticated Configuration Management**: For larger-scale systems, consider dedicated configuration management tools (e.g., HashiCorp Vault, Consul) for managing sensitive data and dynamic configuration updates, beyond the current `serviceConfig.js` and environment variables.
*   ⚠️ **Granular Error Handling**: Introduce more specific custom error classes and detailed error codes for different business logic failures, making it easier to trace and debug issues.
*   🔄 **API Versioning Strategy**: For external APIs consumed by `packageService`, consider implementing a strategy for versioning to gracefully handle changes in those external dependencies.
*   💡 **Documentation Automation**: Explore tools that can generate API documentation directly from source code comments (e.g., JSDoc, TSDoc for Zod schemas) or tool definitions to ensure documentation stays synchronized with the codebase and reduce manual update efforts (e.g., Swagger/OpenAPI integration).
*   🔧 **Typo Corrections (Completed)**: Filename typos like `getPackageProductOptionalTourInfomation.js` and others identified have been corrected in the codebase and reflected in this manual during the update process. (This item can be removed or marked as done).
