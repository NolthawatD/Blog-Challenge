export const removeUndefinedValues = (
  obj: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] !== undefined && obj[key]?.contains !== "")) {
      result[key] = obj[key];
    }
  }

  return result;
};