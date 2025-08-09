/**
 * JSON 응답에서 특정 필드들만 포함하는 유틸리티
 * @param {any} data - 필터링할 데이터 (객체, 배열, 또는 원시값)
 * @param {string[]} fieldsToInclude - 포함할 필드명 배열
 * @returns {any} 필터링된 데이터
 */
function includeFields(data, fieldsToInclude = []) {
  if (!fieldsToInclude.length) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => includeFields(item, fieldsToInclude));
  }
  
  if (data && typeof data === 'object') {
    const filtered = {};
    for (const [key, value] of Object.entries(data)) {
      if (fieldsToInclude.includes(key)) {
        filtered[key] = value;
      }
    }
    return filtered;
  }
  
  return data;
}

export { includeFields };