import { CoreDynamicConfig, Falsy } from '@material-lite/react-cdk/utils';
import { MlStraightTrackerCoreConfig } from './straight-tracker-core';


export namespace StraightTrackerConfig {
  export type Prop = MlStraightTrackerCoreConfig | Falsy;

  export interface Props {
    rippleConfig?: Prop
  }

  export interface Method {
    getStraightTrackerConfig: typeof getStraightTrackerConfig;
    updateStraightTrackerConfig: typeof updateStraightTrackerConfig;
  }

  export interface Member {
    _straightTrackerConfig: CoreDynamicConfig<MlStraightTrackerCoreConfig>;
    _defaultStraightTrackerConfig?: Prop
  }

  export type PrivateNames = keyof Member;
}

export function getStraightTrackerConfig(this: StraightTrackerConfig.Member): MlStraightTrackerCoreConfig {
  return this._straightTrackerConfig._dynamic;
}

export function updateStraightTrackerConfig(
  this: StraightTrackerConfig.Member,
  config: StraightTrackerConfig.Prop,
  prevConfig?: StraightTrackerConfig.Prop
): true | void {

  if (config !== prevConfig) {
    const defaultConf = this._defaultStraightTrackerConfig;

    this._straightTrackerConfig._dynamic = defaultConf
      ? { ...defaultConf, ...(config || {}) }
      : config || {}

    return true;
  }
}
