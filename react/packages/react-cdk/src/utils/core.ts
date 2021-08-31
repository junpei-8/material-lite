export type CoreDynamicConfig<T extends {[key: string]: any}> = { _dynamic: T };

export type CoreConfig<T extends {[key: string]: any}> = T | CoreDynamicConfig<T>;

export function setCoreConfig(that: { [key: string]: any }, config: CoreConfig<any>, isDynamicConfig: boolean): void {
  isDynamicConfig
    ? Object.defineProperty(that, '_config', {get: () => config._dynamic || {}})
    : that._config = config;
}
