// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { scheduleService } from "../services/scheduleService.js";

export const getSaleProductScheduleTool = {
  name: "getSaleProductSchedule",
  description: "Get sales product schedules by saleProdCd",
  inputSchema: { saleProdCd: z.string().min(1) },
  async handler({ saleProdCd }) {
    try {
      console.log(`Executing getSaleProductSchedule tool for saleProdCd: ${saleProdCd}`);
      const schedules = await scheduleService.getSchedules(saleProdCd);
      const responseData = {
        saleProdCd: saleProdCd,
        schedules: schedules,
        retrievedAt: new Date().toISOString(),
      };
      return {
        content: [{ type: "json", json: responseData }],
      };
    } catch (error) {
      console.error(`Error in getSaleProductSchedule tool: ${error.message}`, error);
      return {
        content: [{
          type: "json", // Or type: "error" if MCP SDK supports/prefers it
          json: {
            error: "Failed to get schedule",
            details: error.message,
          }
        }],
      };
    }
  },
};
