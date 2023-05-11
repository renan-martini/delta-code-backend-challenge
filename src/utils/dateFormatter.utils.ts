export const dateFormatter = (key: string, obj: any, arr?: any) => {
  if (arr) {
    return arr.map((item: any) => ({
      ...item,
      [`${key}`]: item[key].toISOString(),
    }));
  }
  return { ...obj, [`${key}`]: obj[key].toISOString() };
};
