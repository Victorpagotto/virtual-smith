export interface InfoHandlerReturn {
  [key: string]: unknown;
  keys: string;
  values: string[];
  placeHolders: string;
}

export function camelize(str: string): string {
  const charSet: string[] = str.split('');
  const newStrSet: string[] = [];
  charSet.forEach((char: string, i: number): void => {
    if (char !== '_') newStrSet.push(char[i - 1] === '_' ? char.toUpperCase() : char);
  });
  return newStrSet.join('');
}

export function camelizeObj<G>(obj: Record<string, unknown>): G {
  const entries: [string, unknown][] = Object.entries(obj);
  const newObj = entries.reduce<Record<string, unknown>>((acc, params): Record<string, unknown> => {
    const [key, value]: [string, unknown] = params;
    acc[camelize(key)] = value;
    return acc;
  }, {});
  return newObj as G;
}

export default function infoHandler(info: Record<string, unknown>): InfoHandlerReturn {
  const keys: string = Object.keys(info).join(', ');
  const values: string[] = Object.values(info).map((value: unknown) => `${value}`);
  const placeHolders: string = Object.keys(info).map((_key: string) => '?').join(', ');
  return { keys, values, placeHolders };
}
