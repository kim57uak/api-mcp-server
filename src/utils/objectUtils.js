import { stripHtml } from "./stripHtml.js";

export function cleanObject(obj) {
  if (typeof obj === "string") return stripHtml(obj);
  if (Array.isArray(obj))
    return obj.map(cleanObject).filter((v) => v !== undefined);
  if (obj && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      const cleaned = cleanObject(obj[key]);
      if (cleaned !== null && cleaned !== undefined) {
        newObj[key] = cleaned;
      }
    }
    return Object.keys(newObj).length > 0 ? newObj : undefined;
  }
  if (obj === null) return undefined;
  return obj;
}
