# MCP Sale Product Server - Installation Manual

This document provides instructions on how to install and run the MCP Sale Product Server.

## Prerequisites

*   **Node.js:** Version 18.x or later is recommended. You can download it from [https://nodejs.org/](https://nodejs.org/).
*   **npm:** Node Package Manager, typically comes with Node.js.

## Installation Steps

1.  **Clone the Repository:**
    If the project is in a Git repository, clone it to your local machine:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
    If you have the source code directly, navigate to the project's root directory.

2.  **Install Dependencies:**
    Open your terminal in the project root directory and run the following command to install the necessary Node.js packages:
    ```bash
    npm install
    ```
    This command reads the `package.json` file and downloads all required dependencies into the `node_modules` directory.

## Running the Server

1.  **Start the Server:**
    Once the dependencies are installed, you can start the MCP server using the following command in your terminal (from the project root directory):
    ```bash
    node src/server.js
    ```

2.  **Server Output:**
    If the server starts successfully, you should see a message like:
    ```
    MCP Server connected via StdioTransport.
    ```
    This message indicates that the server is now running and ready to process MCP requests over standard input/output.

## Environment Configuration (Optional)

The server can be configured using environment variables to set the base URLs for various external APIs. This is useful for tailoring the server settings for different deployment environments (e.g., development, QA, production). The primary configurations are defined in `src/config/serviceConfig.js`, and the following environment variables can be used to override them:

*   `PKG_API_BASE_URL`: Sets the base URL for package-specific APIs (e.g., retrieving itineraries, optional tours). (Default: `http://pkgapiqa.hanatour.com:8082`)
*   `PKG_OLS_BASE_URL`: Sets the base URL for OLS (Operation Link System) QA environment APIs (e.g., retrieving sales product information, area codes). (Default: `http://pkgolsqa.hanatour.com:8081`)
*   `OLS_BASE_URL`: Sets the base URL for OLS development environment APIs (e.g., for product structure codes like classification, promotion, theme). (Default: `http://pkgolsdev.hanatour.com:8081`)
*   `COMMON_OLS_BASE_URL`: Sets the base URL for common OLS APIs (e.g., for basic/detailed common codes). (Default: `http://comolsdev.hanatour.com:8081`)

Example of setting environment variables before running the server:

**Linux/macOS:**
```bash
export PKG_API_BASE_URL=https://custom.packageapi.example.com
export PKG_OLS_BASE_URL=https://custom.olsqa.example.com
node src/server.js
```

**Windows (Command Prompt):**
```bash
set PKG_API_BASE_URL=https://custom.packageapi.example.com
set PKG_OLS_BASE_URL=https://custom.olsqa.example.com
node src/server.js
```

**Windows (PowerShell):**
```powershell
$env:PKG_API_BASE_URL="https://custom.packageapi.example.com"
$env:PKG_OLS_BASE_URL="https://custom.olsqa.example.com"
node src/server.js
```
Consult the `src/config/serviceConfig.js` file for more details on all configurable environment variables and their default values.

## Stopping the Server

To stop the server, you can typically press `Ctrl+C` in the terminal where the server is running.
