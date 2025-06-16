// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { scheduleService } from "../services/scheduleService.js";

export const getSaleProductScheduleTool = {
  name: "getSaleProductSchedule",
  description: "Get sales product schedules by saleProdCd",
  inputSchema: { saleProdCd: z.string().min(1) },
  async handler({ saleProdCd }) {
    try {
      console.log(
        `Executing getSaleProductSchedule tool for saleProdCd: ${saleProdCd}`
      );
      const schedules = await scheduleService.getSchedules(saleProdCd);
      const responseData = {
        saleProdCd: saleProdCd,
        schedules: schedules,
        retrievedAt: new Date().toISOString(),
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(responseData, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error(
        `Error in getSaleProductSchedule tool: ${error.message}`,
        error
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: "Failed to get schedule",
                details: error.message,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  },
};
