# MCP Server for Node.js 🚀

![Node.js](https://img.shields.io/badge/Node.js-18.x+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A Node.js server implementing the Model Context Protocol (MCP) for managing sales product schedules. This project, initially "mcp_server_for_nodejs", provides a robust backend for MCP-based interactions.

## ✨ Key Features

- **MCP Tool Implementation**: Supports core MCP functionalities like `getSaleProductSchedule` and `updateSaleProductSchedule`.
- **Configurable Service Layer**: Allows for easy customization and extension of services.
- **Structured Logging**: Provides detailed and organized logs for monitoring and debugging.

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
