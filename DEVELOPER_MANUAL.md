# 📄 MCP Sale Product Server - Developer Manual

## Table of Contents
- [1. 📖 Project Overview](#1--project-overview)
- [2. 🧱 Project Structure](#2--project-structure)
  - [🔑 Key Components:](#-key-components)
- [3. 🔧 MCP Tool Implementation](#3--mcp-tool-implementation)
  - [3.1. 🛠️ `getSaleProductSchedule` Tool](#31--getsaleproductschedule-tool)
  - [3.2. 🛠️ `updateSaleProductSchedule` Tool](#32--updatesaleproductschedule-tool)
  - [3.3. 🛠️ `getCommonCodeByQuery` Tool](#33--getcommoncodebyquery-tool)
  - [3.4. 🛠️ `getBasicCommonCodeByQuery` Tool](#34--getbasiccommoncodebyquery-tool)
- [4. ⚙️ Configuration Management](#4--configuration-management)
- [5. 💪 SOLID Principles Application](#5--solid-principles-application)
- [6. ✨ Adding a New MCP Tool](#6--adding-a-new-mcp-tool)
- [7. 🚀 Running and Testing](#7--running-and-testing)
- [8. 🌱 Future Enhancements](#8--future-enhancements)

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
    *   `codeMappings` contains mappings used by business logic, like the `codeMapArray` for **`getCommonCodeByQuery`**.
    *   `defaultApiParams` holds default parameters for API calls, like `commonCodeLang`.
    *   This approach allows for easier management of settings and environment-specific configurations without altering the service logic.

*   📦 **`src/services/`**:
    *   Contains modules responsible for business logic. For example, **`packageService.js`** handles business logic related to package schedules and common code retrieval. It now imports its API endpoints and other operational parameters from **`src/config/serviceConfig.js`**, making it more configurable. It includes functions like **`getSchedules()`**, **`updateSchedule()`**, and **`getCommonCodeByQuery()`**.
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

### 3.3. 🛠️ `getCommonCodeByQuery` Tool (`src/tools/getCommonCodeByQuery.js`)

*   🎯 **Purpose**: Retrieves common codes (like attribute, region, country, continent, brand codes) based on a user query. (*Original description: "사용자 질의중 코드성 데이타에 적합한 속성,지역,국가,대륙,브랜드 코드를 조회합니다."*)
*   📥 **Input Schema** (**`zod`**):
    ```javascript
    { query: z.string().min(1) } // query must be a non-empty string
    ```
*   🧠 **Handler Logic**:
    1.  Logs entry, parameters, results, and errors to both console and file using the central logger.
    2.  Receives `query` as input.
    3.  Calls **`packageService.getCommonCodeByQuery(query)`** to fetch common code data.
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
    2. Calls `packageService.getBasicCommonCodeByQuery(query)` to fetch basic common code data.
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

## 8. 🌱 Future Enhancements

*   💾 **Database Integration**: Replace mock services in **`src/services/`** with actual database interactions.
*   🧪 **Unit and Integration Tests**: Implement a comprehensive test suite.
*   📊 **Enhanced Logging**: While a robust logging system is now in place (**`Winston`**, file/console output), future enhancements could include structured logging for easier parsing by log management systems, or dynamic log level changes via configuration/API.
*   🛠️ **Refined Configuration Management**: While **`serviceConfig.js`** centralizes some configurations, further externalization (e.g., to `.env` files fully managed outside the codebase, or dedicated configuration services) could be explored for more complex applications, especially for sensitive data or more varied deployment environments.
*   ⚠️ **More Sophisticated Error Handling**: Custom error classes, more granular error codes.
