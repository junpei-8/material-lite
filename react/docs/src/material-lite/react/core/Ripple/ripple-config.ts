import { CoreDynamicConfig, Falsy } from '@material-lite/react-cdk/utils';
import { MlRippleCoreConfig } from '.';


export namespace RippleConfig {
  export type Prop = MlRippleCoreConfig | Falsy;

  export interface Props {
    rippleConfig?: Prop
  }

  export interface Method {
    getRippleConfig: typeof getRippleConfig;
    updateRippleConfig: typeof updateRippleConfig;
  }

  export interface Member {
    _rippleConfig: CoreDynamicConfig<MlRippleCoreConfig>;
    _defaultRippleConfig?: Prop
  }

  export type PrivateNames = keyof Member;
}

export function getRippleConfig(this: RippleConfig.Member): MlRippleCoreConfig {
  return this._rippleConfig._dynamic;
}

export function updateRippleConfig(
  this: RippleConfig.Member,
  config: RippleConfig.Prop,
  prevConfig?: RippleConfig.Prop
): true | void {

  if (config !== prevConfig) {
    const defaultConf = this._defaultRippleConfig;

    this._rippleConfig._dynamic = defaultConf
      ? { ...defaultConf, ...(config || {}) }
      : config || {}

    return true;
  }
}
