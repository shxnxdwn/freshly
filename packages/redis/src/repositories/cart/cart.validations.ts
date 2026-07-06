export const isValidProductId = (value: number): boolean => Number.isInteger(value) && value > 0;
export const isValidQuantity = (value: number): boolean => Number.isInteger(value) && value > 0;
