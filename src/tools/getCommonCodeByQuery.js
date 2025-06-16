import { z } from "zod";
import { packageService } from "../services/packageService.js";

export const getCommonCodeByQueryTool = {
  name: "getCommonCodeByQuery",
  description: "사용자 질의에 따라 적합한 공통코드를 조회합니다.",
  inputSchema: { query: z.string().min(1) },
  async handler({ query }) {
    try {
      const result = await packageService.getCommonCodeByQuery(query);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ error: error.message }, null, 2),
          },
        ],
      };
    }
  },
};
