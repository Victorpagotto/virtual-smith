interface InfoHandlerReturn {
  keys: string[];
  values: (string | number | boolean)[];
  placeHolders: string[];
}

export default function infoHandler<T>(info: T[]): InfoHandlerReturn {
  const keys: string[] = Object.keys(info);
  const values: (string | number | boolean)[] = (Object
    .values(info) as unknown) as (string | number | boolean)[];
  const placeHolders: string[] = Object.keys(info).map((_key: string) => '?');
  return { keys, values, placeHolders };
}
