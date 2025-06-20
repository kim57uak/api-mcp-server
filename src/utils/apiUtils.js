import axios from 'axios';
import logger from './logger.cjs';

export async function callApi(functionNameForLog, httpMethod, fullUrl, requestData = null, axiosOptions = {}) {
  logger.info(`Executing API call for ${functionNameForLog} with URL: ${fullUrl}, Method: ${httpMethod}, Data: ${JSON.stringify(requestData)}`);

  try {
    let response;
    const method = httpMethod.toLowerCase();

    if (method === 'get') {
      response = await axios.get(fullUrl, { params: requestData, ...axiosOptions });
    } else if (method === 'post') {
      response = await axios.post(fullUrl, requestData, axiosOptions);
    } else if (method === 'put') {
      response = await axios.put(fullUrl, requestData, axiosOptions);
    } else if (method === 'delete') {
      response = await axios.delete(fullUrl, { data: requestData, ...axiosOptions });
    } else {
      throw new Error(`Unsupported HTTP method: ${httpMethod}`);
    }

    logger.info(`${functionNameForLog} API call completed successfully with status: ${response.status}`);
    return response.data;
  } catch (error) {
    // Axios 오류인 경우 error.response.data 등으로 더 자세한 오류 정보를 로깅할 수 있습니다.
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    logger.error(`Error in ${functionNameForLog} API call to ${fullUrl}: ${errorMessage}`, {
      status: error.response ? error.response.status : 'N/A',
      errorStack: error.stack
    });
    throw error; // 원래 오류를 다시 throw하여 호출부에서 처리할 수 있도록 함
  }
}
