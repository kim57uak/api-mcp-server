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
    The server is now running and waiting for MCP requests over standard input/output.

## Stopping the Server

To stop the server, you can typically press `Ctrl+C` in the terminal where the server is running.
