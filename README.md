# MCP Server for Node.js 🚀

![Node.js](https://img.shields.io/badge/Node.js-18.x+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A Node.js server implementing the Model Context Protocol (MCP) for managing travel product information, including sales schedules, package details, common codes, and more. This project, initially "mcp_server_for_nodejs", provides a robust backend for MCP-based interactions related to HanaTour's product offerings.

## ✨ Key Features

- **Comprehensive MCP Toolset**: Supports a wide range of MCP functionalities, including:
    - Retrieving and updating sales product schedules.
    - Fetching detailed package product information, optional tours, rules, and travel alerts.
    - Querying various common codes (basic, detail, area, classification, promotion, theme codes).
    - Searching for sales products based on multiple criteria.
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
