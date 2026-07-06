export type MultiExecResult = [Error | null, unknown][] | null;

export const unwrapMultiResult = <T>(result: MultiExecResult, index = 0): T => {
  const [error, value] = result?.[index] ?? [];
  if (error) throw error;
  return value as T;
};
