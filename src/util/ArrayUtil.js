module.exports = class ArrayUtil {
  static trimArray(array, maxLen = 10) {
    if (array.length > maxLen) {
      const len = array.length - maxLen;
      array = array.slice(0, maxLen);
      array.push(`${len} more...`);
    }

    return array;
  }
};