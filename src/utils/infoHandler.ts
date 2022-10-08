export interface InfoHandlerReturn {
  [key: string]: unknown;
  keys: string;
  values: string[];
  placeHolders: string;
}

export default function infoHandler(info: Record<string, unknown>): InfoHandlerReturn {
  const keys: string = Object.keys(info).join(', ');
  const values: string[] = Object.values(info).map((value: unknown) => `${value}`);
  const placeHolders: string = Object.keys(info).map((_key: string) => '?').join(', ');
  return { keys, values, placeHolders };
}
