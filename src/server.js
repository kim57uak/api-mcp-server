#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createStdioTransport } from "./transports/stdioTransport.js"; // Import createStdioTransport
import { tools } from "./tools/index.js"; // Import tools
import logger from "./utils/logger.cjs";

async function main() {
  logger.info("Failed to connect MCP Server: 1");
  const server = new McpServer({
    name: "MCP HNT Package Sale Product Server",
    version: "1.0.0",
  });
  logger.info("Failed to connect MCP Server: 2");
  // Register tools
  tools.forEach((tool) => {
    server.tool(tool.name, tool.description, tool.inputSchema, tool.handler);
    logger.info(`Registered tool: ${tool.name}`);
  });
  logger.info("Failed to connect MCP Server: 3");
  const transport = createStdioTransport(); // Use the factory function
  logger.info("Failed to connect MCP Server: 4");
  try {
    await server.connect(transport);
    logger.info("MCP Server connected via StdioTransport.");
    // Keep the process alive so it doesn't exit prematurely
    await new Promise(() => {});
  } catch (error) {
    logger.error("Failed to connect MCP Server:", error);
    process.exit(1);
  }
}

main()
  .then(() => {
    logger.info("MCP Server running and waiting for requests.");
    // This promise never resolves, keeping the process alive.
    return new Promise(() => {});
  })
  .catch((error) => {
    logger.error("Failed to start MCP server:", error);
    process.exit(1);
  });
