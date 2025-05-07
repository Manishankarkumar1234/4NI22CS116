/**
 * Sort array by a specific key
 */
const sortByKey = (array, key, descending = false) => {
    return [...array].sort((a, b) => {
      if (descending) {
        return b[key] - a[key];
      }
      return a[key] - b[key];
    });
  };
  
  /**
   * Group array items by a specific key
   */
  const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      const keyValue = item[key];
      result[keyValue] = result[keyValue] || [];
      result[keyValue].push(item);
      return result;
    }, {});
  };
  
  module.exports = {
    sortByKey,
    groupBy
  };