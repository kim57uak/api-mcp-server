#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createStdioTransport } from "./transports/stdioTransport.js"; // Import createStdioTransport
import { tools } from "./tools/index.js"; // Import tools
import logger from "./utils/logger.cjs";

// Global error handlers
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

async function main() {
  logger.info("Initializing MCP Server...");
  const server = new McpServer({
    name: "MCP HNT Package Sale Product Server",
    version: "1.0.0",
  });
  logger.info("MCP Server initialized.");

  // Register tools
  logger.info("Registering tools...");
  tools.forEach((tool) => {
    server.tool(tool.name, tool.description, tool.inputSchema, tool.handler);
    logger.info(`Registered tool: ${tool.name}`);
  });
  logger.info("All tools registered.");

  const transport = createStdioTransport();
  logger.info("StdioTransport created.");

  try {
    await server.connect(transport);
    logger.info("MCP Server connected via StdioTransport. Waiting for requests...");
    // Keep the process alive so it doesn't exit prematurely
    // This promise intentionally never resolves.
    await new Promise(() => {});
  } catch (error) {
    logger.error("Failed to connect MCP Server:", error);
    process.exit(1); // Exit if connection fails
  }
}

main()
  .catch((error) => {
    // This catch is primarily for errors during the async main() execution before the final await new Promise(() => {})
    // or if main() itself is structured to throw an error that isn't caught inside.
    // With the current structure of main(), errors there should be caught and logged, leading to process.exit(1).
    // However, this remains a safeguard.
    logger.error("Critical error during server startup:", error);
    process.exit(1);
  });
