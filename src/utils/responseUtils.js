export function createJsonResponse(functionName, cleanedResult, logger) {
  // 첫 번째 중복 로그 제거 (cleanedResult 전체를 로깅하는 것은 너무 길어질 수 있으므로, 어떤 종류의 데이터인지 간략히 로깅하거나 생략하는 것을 고려. 여기서는 일단 생략)
  // logger.info(
  //   `${functionName} completed successfully with result: ${JSON.stringify(
  //     cleanedResult // 이 부분이 매우 길어질 수 있음
  //   )}`
  // );

  const response = {
    content: [
      {
        type: "text",
        text: JSON.stringify(cleanedResult, null, 2),
      },
    ],
  };

  // 핸들러의 최종 반환 직전 로그 (response 객체 전체 로깅)
  logger.info(
    `${functionName} completed successfully with result: ${JSON.stringify(
      response
    )}`
  );

  return response;
}
