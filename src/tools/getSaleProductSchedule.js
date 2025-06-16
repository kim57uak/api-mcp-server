// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from '../utils/logger.cjs';

export const getSaleProductScheduleTool = {
  name: "getSaleProductSchedule",
  description: "Get sales product schedules by saleProdCd",
  inputSchema: { saleProdCd: z.string().min(1) },
  async handler({ saleProdCd }) {
    const functionName = "getSaleProductScheduleTool.handler";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ saleProdCd })}`);
    try {
      console.log(
        `Executing getSaleProductSchedule tool for saleProdCd: ${saleProdCd}`
      );
      const schedules = await packageService.getSchedules(saleProdCd);
      const responseData = {
        saleProdCd: saleProdCd,
        schedules: schedules,
        retrievedAt: new Date().toISOString(),
      };
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(responseData, null, 2),
          },
        ],
      };
      logger.info(`${functionName} completed successfully with result: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      logger.error(`Error in ${functionName}: ${error.message}`, { error: error.stack });
      console.error( // Original console.error
        `Error in getSaleProductSchedule tool: ${error.message}`,
        error
      );
      throw error;
    }
  },
};
