import { Falsy } from '@material-lite/react-cdk';
import { MlRippleCore } from '../Ripple';

export namespace DisableRipple {
  export type Prop = boolean | Falsy;

  export interface Props {
    disableRipple?: Prop
  }

  export interface Method {
    disableRipple: typeof disableRipple;
  }

  export interface Member {
    readonly rippleCore: MlRippleCore;
  }

  // export type PrivateNames = '';
}

export function disableRipple(this: DisableRipple.Member, isDisabled?: DisableRipple.Prop, prevIsDisabled?: DisableRipple.Prop): true | void {
  if (isDisabled !== prevIsDisabled) {
    if (this.rippleCore) {
      isDisabled
        ? this.rippleCore.teardown()
        : this.rippleCore.setup()
    }

    return true;
  }
}
