// lib/checkData.ts
export const checkData = (data: any, componentName: string): boolean => {
  if (data?.data?.status === 404) {
    console.error(`Error: ${componentName} - 404 Not Found. ${data.message}`);
    return false;
  }
  if (!data) {
    console.error(`Error: ${componentName} - Data is null or undefined.`);
    return false;
  }

  if (Object.keys(data).length === 0) {
    console.error(`Error: ${componentName} - Data is empty.`);
    return false;
  }

  return true;
};
