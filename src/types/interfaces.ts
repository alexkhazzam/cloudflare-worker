export interface ListKey {
  name: string;
}

export interface ListKeys {
  [keys: string]: ListKey[];
}

export interface Namespace {
  put(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | number>;
  delete(key: string): Promise<boolean>;
  list(): ListKeys;
}

export interface KV {
  [key: string]: string | number;
}

export interface StorageKV {
  key: string;
  value: string;
}

export interface ResponsePayload {
  elapsedTime: string;
  body: KV[][] | KV[];
}

export interface QueryBody {
  namespace: string;
  conditions: FilterOption[];
}

export interface EndpointRecord {
  [key: string]: string | number;
  id: number | string;
}

export interface FilterOption {
  type: string;
  field: string;
  value: string;
}
