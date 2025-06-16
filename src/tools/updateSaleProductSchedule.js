// src/tools/updateSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from '../utils/logger.cjs';

export const updateSaleProductScheduleTool = {
  name: "updateSaleProductSchedule",
  description: "Update sales product schedule",
  inputSchema: { name: z.string().min(1), saleProdCd: z.string().min(1) },
  async handler({ name, saleProdCd }) {
    const functionName = "updateSaleProductScheduleTool.handler";
    logger.info(`Executing ${functionName} with params: ${JSON.stringify({ name, saleProdCd })}`);
    try {
      console.log(
        `Executing updateSaleProductSchedule tool for name: ${name}, saleProdCd: ${saleProdCd}`
      );
      const result = await packageService.updateSchedule(saleProdCd, name);
      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: result.success ? "success" : "failure",
                message: `Schedule for ${saleProdCd} updated with name ${name}. Service status: ${result.message}`,
                updatedAt: new Date().toISOString(),
              },
              null,
              2
            ),
          },
        ],
      };
      logger.info(`${functionName} completed successfully with result: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      logger.error(`Error in ${functionName}: ${error.message}`, { error: error.stack });
      console.error( // Original console.error
        `Error in updateSaleProductSchedule tool: ${error.message}`,
        error
      );
      throw error;
    }
  },
};
