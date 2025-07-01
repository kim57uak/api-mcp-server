# MCP Server for Node.js 🚀

![Node.js](https://img.shields.io/badge/Node.js-18.x+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A Node.js server implementing the Model Context Protocol (MCP) for managing travel product information, including sales schedules, package details, common codes, and more. This project, initially "mcp_server_for_nodejs", provides a robust backend for MCP-based interactions related to HanaTour's product offerings.

## ✨ Key Features

- **Comprehensive MCP Toolset**: Supports a wide range of MCP functionalities, including:
    - **Travel Product Schedule Management**: Retrieve travel schedules (itineraries) using `saleProdCd` (`getSaleProductSchedule`). (Note: Schedule update functionality (`updateSaleProductSchedule`) may be for reference only.)
    - **Product Information Retrieval**:
        - Search for sales product listings based on multiple criteria (dates, region code, product name, attribute code, etc.) (`retrieveSaleProductInformation`).
        - Fetch detailed information for individual package products by `saleProductCode` (`getPackageProductInfo`).
        - Retrieve optional tour information for package products (`getPackageProductOptionalTourInformation`).
        - Get important information like terms, precautions, and travel alerts for package products (`getPackageProductRulesAndTravelAlerts`).
    - **Common Code Queries**:
        - Query basic common codes based on user input (`getBasicCommonCodeByQuery`).
        - Query detailed common codes based on user input or basic codes (`getDetailCommonCodeByQuery`).
        - Retrieve lists of region, country, and continent codes (`retrieveAreaCode`).
        - Retrieve lists of classification ('01'), promotion ('02'), and theme ('03') codes for package products (`retrievePackageProductClassificationCode`, `retrievePackageProductPromotionCode`, `retrievePackageProductThemeCode`).
    - **Detailed Information Retrieval by Sales Product Code & Departure Date (API Group 3.1)**:
        - Basic product information (`retrieveProductBasicInformationBySaleProductCode`)
        - Product air inventory information (`retrieveProductAirInventoryInformationBySaleProductCode`)
        - Product fare information (`retrieveProductFareInformationBySaleProductCode`)
        - Basic tab information for product detail pages (`retrieveProductTabBasicInformationBySaleProductCode`)
        - Airline and flight information (`retrieveAirLineInformationBySaleProductCode`)
        - Hotel and local schedule information (`retrieveHotelScheduleInformationBySaleProductCode`)
        - Sending terms and conditions (`retrieveSendingTermAndConditionsBySaleProductCode`)
        - Optional tour details (`retrieveOptionalTourBySaleProductCode`)
        - Expense details (`retrieveExpenseInformationBySaleProductCode`)
        - Full itinerary details (`retrieveItineraryInformationBySaleProductCode`)
        - Remarks and notes (`retrieveRemarksInformationBySaleProductCode`)
    - **Additional Product Information**:
        - Retrieve product brand codes (`retrieveBrandCodeBySaleProductCode` - API Group 3.2).
        - Find sales products using the same flight information (`retrieveSameAirInformationBySaleProductCode` - API Group 3.3).
- **Configurable Service Layer**: Leverages `serviceConfig.js` for managing API endpoints and parameters, allowing for easy customization and extension.
- **Structured Logging**: Utilizes Winston to provide detailed and organized logs for monitoring and debugging.
- **SOLID Design Principles**: Developed with a focus on maintainability and scalability.

## ⚙️ About Model Context Protocol (MCP)

The **Model Context Protocol (MCP)** SDK (`@modelcontextprotocol/sdk`) is a foundational component of this server. It provides the framework and utilities for defining and managing the tools that this server exposes.

You do not need to install the MCP SDK separately. It is listed as a project dependency in the **`package.json`** file and will be automatically installed when you run:

```bash
npm install
```

## 🚀 Getting Started

To get started with setting up and running the server, please refer to the **[Installation Guide](INSTALL.md)**.

## 📄 Developer Documentation

For detailed information on development, contribution guidelines, and project architecture, please consult the **[Developer Manual](DEVELOPER_MANUAL.md)**.
