import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createStdioTransport } from "./transports/stdioTransport.js"; // Import createStdioTransport
import { tools } from "./tools/index.js"; // Import tools

async function main() {
  const server = new McpServer({
    name: "MCP Sale Product Server",
    version: "1.0.0",
  });

  // Register tools
  tools.forEach(tool => {
    server.tool(tool.name, tool.description, tool.inputSchema, tool.handler);
  });

  const transport = createStdioTransport(); // Use the factory function
  try {
    await server.connect(transport);
    console.log("MCP Server connected via StdioTransport.");
  } catch (error) {
    console.error("Failed to connect MCP Server:", error);
  }
}

main();
