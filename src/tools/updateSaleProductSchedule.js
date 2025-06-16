// src/tools/updateSaleProductSchedule.js
import { z } from "zod";
import { scheduleService } from "../services/scheduleService.js";

export const updateSaleProductScheduleTool = {
  name: "updateSaleProductSchedule",
  description: "Update sales product schedule",
  inputSchema: { name: z.string().min(1), saleProdCd: z.string().min(1) },
  async handler({ name, saleProdCd }) {
    try {
      console.log(`Executing updateSaleProductSchedule tool for name: ${name}, saleProdCd: ${saleProdCd}`);
      const result = await scheduleService.updateSchedule(saleProdCd, name);
      return {
        content: [{
          type: "json",
          json: {
            status: result.success ? "success" : "failure",
            message: `Schedule for ${saleProdCd} updated with name ${name}. Service status: ${result.message}`,
            updatedAt: new Date().toISOString(),
          }
        }],
      };
    } catch (error) {
      console.error(`Error in updateSaleProductSchedule tool: ${error.message}`, error);
      return {
        content: [{
          type: "json", // Or type: "error"
          json: {
            error: "Failed to update schedule",
            details: error.message,
          }
        }],
      };
    }
  },
};
