// HTML 태그, \t, \n, \r, \\ 등 특수문자를 제거하는 함수
export function stripHtml(html) {
  if (typeof html !== "string") return html;
  // HTML 태그 제거 후, \t, \n, \r, \\ 등 특수문자 제거
  return html.replace(/<[^>]*>/g, "").replace(/[\t\n\r\\]/g, "");
}
