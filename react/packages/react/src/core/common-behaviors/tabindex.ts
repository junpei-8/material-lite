import { Falsy } from '@material-lite/react-cdk';


export namespace TabIndex {
  export type Prop = number | Falsy;

  export interface Props {
    tabIndex?: Prop
  }

  export interface Method {
    updateTabIndex: typeof updateTabIndex;
  }

  export interface Member {
    _defaultTabIndex?: number;
  }

  export type PrivateNames = '_defaultTabIndex';
}


export function updateTabIndex(this: TabIndex.Member, tabIndex?: TabIndex.Prop, prevTabIndex?: TabIndex.Prop): number | void {
  if (tabIndex !== prevTabIndex) {
    return tabIndex === 0 ? 0 : tabIndex || this._defaultTabIndex || 0;
  }
}
